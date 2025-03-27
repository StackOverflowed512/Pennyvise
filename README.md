# GenAI Finance

![Project Banner](./assets/banner-placeholder.png)  // Add your banner image here

GenAI Finance is an AI-powered financial assistant designed to provide personalized financial insights, real-time stock analysis, and portfolio management tools. Built for both novice and expert investors, it leverages cutting-edge generative AI and financial APIs to deliver actionable recommendations.  
Hosted on Netlify: [Live Demo](https://your-netlify-app.netlify.app)

---

## Features

- **AI-Powered Chatbot**: Ask financial questions and get instant AI-generated responses.
- **Real-Time Stock Analysis**: Access live stock data and predictions.
- **Portfolio Management**: Optimize your investments with AI-driven insights.
- **Interactive Dashboard**: Experience an enhanced UI with updated search capabilities and real-time analytics.
- **Secure and Reliable**: State-of-the-art encryption ensures your data is safe.
- **User-Friendly Interface**: Intuitive design for seamless navigation.
- **Dynamic Visuals**: Stunning UI with integrated images and animations.

> ![Screenshot](./assets/screenshot-placeholder.png)  // Add a screenshot of your UI here

---

## Tech Stack

- **Frontend**: React, Vite, Framer Motion, Material-UI
- **Backend**: Flask, Flask-CORS, Google Generative AI, Yahoo Finance API
- **APIs**: Yahoo Finance
- **Styling**: CSS Modules, TailwindCSS
- **Deployment**: Node.js & Python, hosted on Netlify

---

## Setup Instructions

### Backend Setup

1. **Create a virtual environment**:  
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```
2. Install dependencies:  
    ```bash
    pip install -r requirements.txt
    ```
3. Set up environment variables:  
   Create a `.env` file in the chatbot directory with the following:  
    ```
    GEMINI_API_KEY=your_gemini_api_key
    ```
4. Run the Flask backend:  
    ```bash
    python app.py
    ```  
The backend will run on [http://localhost:5000](http://localhost:5000).

---

### Frontend Setup

1. Install Node.js dependencies:  
    ```bash
    npm install
    ```
2. Start the React development server:  
    ```bash
    npm start
    ```  
The frontend will run on [http://localhost:3000](http://localhost:3000).

---

## Usage

Open your browser and navigate to [http://localhost:3000](http://localhost:3000) (or view the [Live Demo](https://your-netlify-app.netlify.app)).  
- Use the chatbot to ask financial questions or explore stock predictions.  
- Enter stock symbols (e.g., AAPL, TSLA) to get real-time analysis and AI-powered insights.  
- Manage your portfolio with actionable recommendations.

---

## API Endpoints

- **Chatbot**  
  Endpoint: `/api/chat`  
  Method: `POST`  
  Description: Sends a user query to the chatbot and retrieves an AI-generated response.

- **Stock Prediction**  
  Endpoint: `/api/predict_with_info`  
  Method: `GET`  
  Description: Fetches stock predictions and insights for a given stock symbol.

---