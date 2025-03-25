import React, { useState } from "react";
import { fetchStockPrediction } from "../../api/api"; // Import the API function
import styles from "./StockDisplay.module.css";

const StockDisplay = () => {
    const [symbol, setSymbol] = useState("");
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handlePrediction = async () => {
        if (!symbol.trim()) {
            setError("Please enter a stock symbol.");
            return;
        }
        setLoading(true);
        setError("");
        try {
            const result = await fetchStockPrediction(symbol); // Use the API function
            setPrediction(result);
        } catch (err) {
            console.error("Error:", err);
            setError(
                err.response?.data?.error ||
                    "Sorry, there was an error processing your request."
            );
        }
        setLoading(false);
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Stock Prediction</h2>
            <div className={styles.inputGroup}>
                <input
                    type="text"
                    placeholder="Enter stock symbol (e.g., AAPL)"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    className={styles.input}
                />
                <button
                    onClick={handlePrediction}
                    className={styles.button}
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Predict"}
                </button>
            </div>
            {error && <p className={styles.error}>{error}</p>}
            {prediction && (
                <div className={styles.result}>
                    <h3>Prediction for {prediction.symbol}</h3>
                    <p>
                        <strong>Next Day:</strong> {prediction.next_day}
                    </p>
                    <p>
                        <strong>Predicted Price:</strong> $
                        {prediction.predicted_price}
                    </p>
                    <p>
                        <strong>Insights:</strong> {prediction.stock_info}
                    </p>
                </div>
            )}
        </div>
    );
};

export default StockDisplay;
