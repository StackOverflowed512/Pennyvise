import React from "react";
import "./PredictionItem.css";

function PredictionItem({ stock }) {
    // Determine background and text color based on prediction
    const getStyles = (prediction) => {
        switch (prediction) {
            case "Buy":
                return {
                    background: "#dcfce7",
                    color: "#15803d",
                };
            case "Strong Buy":
                return {
                    background: "#bbf7d0",
                    color: "#166534",
                };
            case "Hold":
            default:
                return {
                    background: "#fee2e2",
                    color: "#991b1b",
                };
        }
    };

    const styles = getStyles(stock.prediction);

    return (
        <div className="prediction-item">
            <span className="stock-symbol">{stock.name}</span>
            <span className="prediction-badge" style={styles}>
                {stock.prediction}
            </span>
        </div>
    );
}

export default PredictionItem;
