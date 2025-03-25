# Financial Assistant

A GenAI-based financial assistant that helps users with investment-related questions and provides real-time stock information.

## Features

-   AI-powered financial advice and education
-   Real-time stock information
-   User-friendly interface
-   Focused on Indian investors

## Setup Instructions

### Backend Setup

1. Create a virtual environment (recommended):

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Create a `.env` file in the root directory with your API keys:

```
OPENAI_API_KEY=your_openai_api_key
```

4. Run the Flask backend:

```bash
python app.py
```

The backend will run on http://localhost:5000

### Frontend Setup

1. Install Node.js dependencies:

```bash
npm install
```

2. Start the React development server:

```bash
npm start
```

The frontend will run on http://localhost:3000

## Usage

1. Open your browser and navigate to http://localhost:3000
2. Use the chat interface to ask financial questions
3. Use the stock search feature to get real-time stock information
4. The AI will provide personalized financial advice and education

## API Keys Used

-   OpenAI API for the chat functionality
-   Yahoo Finance API for stock data

## Note

This is a hackathon project focused on financial education and awareness. Always consult with professional financial advisors before making investment decisions.
