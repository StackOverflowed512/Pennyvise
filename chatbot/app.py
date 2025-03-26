from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import yfinance as yf
import os
from dotenv import load_dotenv
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
import markdown2


# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

CORS(app)  

# Configure Gemini API
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("Gemini API key not found in environment variables.")

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')  # Use 'gemini-pro' for text-based queries

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        # Get user message from the request
        data = request.json
        user_message = data.get('message', '').strip()

        if not user_message:
            return jsonify({'error': 'Please enter a question'}), 400

        # Create a prompt for Gemini
        prompt = f"""You are a helpful financial advisor focused on educating Indian investors. 
        Provide clear, simple explanations and always emphasize the importance of understanding risks.
        Keep your responses concise and practical.
        Focus on Indian market context and regulations.
        
        User question: {user_message}
        
        Please provide a helpful response:"""

        # Generate response using Gemini
        response = model.generate_content(prompt)
        # Return the plain text response without HTML conversion
        return jsonify({
            'response': response.text
        }), 200

    except Exception as e:
        print("Error:", e)
        return jsonify({
            'error': 'Sorry, there was an error processing your request. Please try again.'
        }), 500

@app.route('/api/recommendations', methods=['GET'])
def get_recommendations():
    try:
        # List of stock symbols to analyze
        stock_symbols = ["AAPL", "TSLA", "GOOGL", "MSFT", "AMZN"]

        recommendations = []

        for symbol in stock_symbols:
            # Fetch stock data using yfinance
            stock = yf.Ticker(symbol)
            hist = stock.history(period="1y")  # Get 1 year of historical data

            if hist.empty:
                continue

            # Calculate potential profit
            current_price = stock.info['currentPrice']
            low_52_week = stock.info['fiftyTwoWeekLow']
            potential_profit = current_price - low_52_week

            recommendations.append({
                "symbol": symbol,
                "name": stock.info['shortName'],
                "current_price": current_price,
                "52_week_low": low_52_week,
                "potential_profit": potential_profit,
                "reason": f"Potential profit of ${potential_profit:.2f} from the 52-week low."
            })

        # Sort recommendations by potential profit in descending order
        recommendations = sorted(recommendations, key=lambda x: x['potential_profit'], reverse=True)

        return jsonify({"recommendations": recommendations}), 200

    except Exception as e:
        print("Error:", e)
        return jsonify({
            'error': 'Sorry, there was an error processing your request. Please try again.'
        }), 500

@app.route('/api/stock', methods=['GET'])
def get_stock_details():
    try:
        # Get the stock symbol from the query parameters
        symbol = request.args.get('symbol', '').upper()

        if not symbol:
            return jsonify({'error': 'Please provide a stock symbol.'}), 400

        # Fetch stock data using yfinance
        stock = yf.Ticker(symbol)
        stock_info = stock.info

        if not stock_info:
            return jsonify({'error': f'No data found for stock symbol: {symbol}'}), 404

        # Extract relevant details
        stock_details = {
            "symbol": symbol,
            "name": stock_info.get('shortName', 'N/A'),
            "current_price": stock_info.get('currentPrice', 'N/A'),
            "52_week_high": stock_info.get('fiftyTwoWeekHigh', 'N/A'),
            "52_week_low": stock_info.get('fiftyTwoWeekLow', 'N/A'),
            "market_cap": stock_info.get('marketCap', 'N/A'),
            "sector": stock_info.get('sector', 'N/A'),
            "industry": stock_info.get('industry', 'N/A'),
        }

        return jsonify({"stock_details": stock_details}), 200

    except Exception as e:
        print("Error:", e)
        return jsonify({
            'error': 'Sorry, there was an error processing your request. Please try again.'
        }), 500

@app.route('/api/predict', methods=['GET'])
def predict_stock_price():
    try:
        # Get the stock symbol from the query parameters
        symbol = request.args.get('symbol', '').upper()

        if not symbol:
            return jsonify({'error': 'Please provide a stock symbol.'}), 400

        # Fetch historical stock data
        stock = yf.Ticker(symbol)
        hist = stock.history(period="1y")  # Get 1 year of historical data

        if hist.empty:
            return jsonify({'error': f'No data found for stock symbol: {symbol}'}), 404

        # Prepare the data for training
        hist['Date'] = hist.index
        hist['Date'] = hist['Date'].map(pd.Timestamp.toordinal)  # Convert dates to ordinal
        X = hist[['Date']]  # Features (dates)
        y = hist['Close']  # Target (closing prices)

        # Split the data into training and testing sets
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

        # Train a Linear Regression model
        model = LinearRegression()
        model.fit(X_train, y_train)

        # Evaluate the model
        y_pred = model.predict(X_test)
        mse = mean_squared_error(y_test, y_pred)

        # Predict the next day's price
        next_day = pd.Timestamp.now() + pd.Timedelta(days=1)
        next_day_ordinal = next_day.toordinal()
        predicted_price = model.predict([[next_day_ordinal]])[0]

        return jsonify({
            'symbol': symbol,
            'predicted_price': round(predicted_price, 2),
            'mse': round(mse, 2),
            'next_day': next_day.strftime('%Y-%m-%d')
        }), 200

    except Exception as e:
        print("Error:", e)
        return jsonify({
            'error': 'Sorry, there was an error processing your request. Please try again.'
        }), 500

@app.route('/api/predict_with_info', methods=['GET'])
def predict_stock_price_with_info():
    try:
        # Get the stock symbol from the query parameters
        symbol = request.args.get('symbol', '').upper()

        if not symbol:
            return jsonify({'error': 'Please provide a stock symbol.'}), 400

        # Fetch historical stock data
        stock = yf.Ticker(symbol)
        hist = stock.history(period="1y")  # Get 1 year of historical data

        if hist.empty:
            return jsonify({'error': f'No data found for stock symbol: {symbol}'}), 404

        # Prepare the data for training
        hist['Date'] = hist.index
        hist['Date'] = hist['Date'].map(pd.Timestamp.toordinal)  # Convert dates to ordinal
        X = hist[['Date']]  # Features (dates)
        y = hist['Close']  # Target (closing prices)

        # Split the data into training and testing sets
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

        # Train a Linear Regression model
        model_lr = LinearRegression()
        model_lr.fit(X_train, y_train)

        # Predict the next day's price
        next_day = pd.Timestamp.now() + pd.Timedelta(days=1)
        next_day_ordinal = next_day.toordinal()
        predicted_price = model_lr.predict([[next_day_ordinal]])[0]

        # Retrieve stock information using Gemini API
        prompt = f"Provide detailed information about the stock with symbol {symbol}."
        gemini_response = model.generate_content(prompt)
        plain_text_info = markdown2.markdown(gemini_response.text, extras=["strip"])

        return jsonify({
            'symbol': symbol,
            'predicted_price': round(predicted_price, 2),
            'next_day': next_day.strftime('%Y-%m-%d'),
            'stock_info': plain_text_info
        }), 200

    except Exception as e:
        print("Error:", e)
        return jsonify({
            'error': 'Sorry, there was an error processing your request. Please try again.'
        }), 500

# Run the Flask app
if __name__ == '__main__':
    app.run(debug = False, host = '0.0.0.0', port = 5000)