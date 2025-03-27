# PennyVise - AI-Powered Stock Analysis Platform

PennyVise is an intelligent stock analysis platform that leverages cutting-edge AI technology to provide comprehensive market insights, predictive analytics, and investment recommendations. Built for the modern investor, it combines real-time data with generative AI to deliver actionable financial intelligence.

🌐 **Live Demo:** [https://pennyvise.netlify.app](https://pennyvise.netlify.app)

![PennyVise Platform](https://https://imagekit.io/tools/asset-public-link?detail=%7B%22name%22%3A%22Screenshot%202025-03-28%20002542.png%22%2C%22type%22%3A%22image%2Fpng%22%2C%22signedurl_expire%22%3A%222028-03-26T19%3A12%3A37.264Z%22%2C%22signedUrl%22%3A%22https%3A%2F%2Fmedia-hosting.imagekit.io%2F2b9b6c1dd9e148b2%2FScreenshot%25202025-03-28%2520002542.png%3FExpires%3D1837710757%26Key-Pair-Id%3DK2ZIVPTIP2VGHC%26Signature%3D3IuOHWlDuL6RZ~gWSZafyeREs52O9ks6R3KbZyadlFDVZFwvg0Ct4fzSwcaWCifL2OItmc~h84Qgf6ZOJvZGjeyZoHRrMJYH1I4JpNanzU37wiXyfnbbYMYoMgEeKPC9wMOFfLzM~qzUWWvE68~Y65HoYrGoUpfLjNc8fdgX65R5nJMk1KSPoWP7CfDLzgJigVknWwxt~9sTM4JvgATtk~K6O6bHSJJyit9SUXUSYEYBp1mV6pLqGldGxhk-dNnEwoErlgL0LADmdnrP093PxTlLyo08qsCWh0c7c8pcnUZTwhueilFKnNvCJacd8eZtqfNZVMEi~jYGqEVWSq~jRw__%22%7D) <!-- Add a screenshot of your platform -->

## 🌟 Key Features

- **AI-Powered Stock Analysis**: Get real-time analysis of any stock with advanced AI predictions
- **Market Intelligence**: Comprehensive insights including technical and fundamental analysis
- **Smart Recommendations**: Receive AI-generated investment recommendations with confidence scores
- **Risk Assessment**: Detailed risk analysis for informed decision-making
- **Top Stocks Tracking**: Monitor top-performing stocks with real-time updates
- **Responsive Design**: Seamless experience across all devices

## 🚀 Technology Stack

### Frontend
- React.js with Vite
- Framer Motion for animations
- CSS Modules for styling
- React Router for navigation

### Backend
- Flask RESTful API
- Google Generative AI
- Yahoo Finance API integration
- Machine Learning models for predictions

### APIs & Services
- Gemini API for AI analysis
- Yahoo Finance for real-time market data
- RESTful architecture

## 📊 Features in Detail

### Stock Analysis
- Real-time stock price tracking
- Historical data analysis
- Market cap and PE ratio insights
- 52-week high/low tracking

### AI Insights
- Executive summaries
- Technical analysis
- Fundamental analysis
- Risk assessment
- Investment recommendations

### User Experience
- Intuitive interface
- Real-time updates
- Recent search history
- Mobile-responsive design

## 🛠️ Setup Instructions

### Backend Setup
```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set environment variables
# Create .env file with:
GEMINI_API_KEY=your_gemini_api_key

# Run Flask backend
python app.py
```

### Frontend Setup
```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## 📝 API Documentation

### Stock Analysis Endpoint
- `GET /api/stock?symbol={symbol}`
- Returns detailed stock information

### Prediction Endpoint
- `GET /api/predict_with_info?symbol={symbol}`
- Returns AI-powered predictions and analysis

### Top Stocks Endpoint
- `GET /api/top_stocks`
- Returns current top-performing stocks

## 🎯 Hackathon Goals

1. **Innovation**: Implementing cutting-edge AI for financial analysis
2. **Accessibility**: Making stock analysis accessible to all users
3. **Real-time Analysis**: Providing instant, accurate market insights
4. **User Experience**: Creating an intuitive, responsive interface

## 👥 Team

- **Omkar Mutyalwar** - Web Development
- **Vaishnav Mankar** - MLOps
- **Sakshi Shinde** - Team Lead
- **Pranav Chaudhari** - UI/UX Design

## 🔮 Future Enhancements

- Portfolio management features
- Advanced technical indicators
- Social sharing capabilities
- Mobile app development
- Real-time market news integration

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with 💙 by Team PennyVise for [Hackathon Name] 2024