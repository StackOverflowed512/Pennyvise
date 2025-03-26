import axios from "axios";

const BASE_URL = "https://pennyvise.onrender.com/api";

/**
 * Sends a message to the chatbot API and retrieves the response.
 * @param {string} message - The user's message to the chatbot.
 * @returns {Promise<object>} - The chatbot's response.
 */
export const fetchChatbotResponse = async (message) => {
    try {
        const response = await axios.post(`${BASE_URL}/chat`, { message });
        return response.data;
    } catch (error) {
        throw (
            error.response?.data?.error ||
            "Error communicating with the chatbot."
        );
    }
};

/**
 * Fetches stock prediction data from the backend.
 * @param {string} symbol - The stock symbol (e.g., AAPL, TSLA).
 * @returns {Promise<object>} - The stock prediction data.
 */
export const fetchStockPrediction = async (symbol) => {
    try {
        const response = await axios.get(`${BASE_URL}/predict_with_info`, {
            params: { symbol },
        });
        return response.data;
    } catch (error) {
        throw (
            error.response?.data?.error ||
            "Error fetching stock prediction data."
        );
    }
};
