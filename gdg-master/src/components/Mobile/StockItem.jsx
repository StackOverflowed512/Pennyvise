import React from "react";
import "./StockItem.css";

function StockItem({ stock }) {
    return (
        <article className="stock-item">
            <div className="stock-info">
                <h3 className="stock-name">{stock.name}</h3>
                <p className="stock-price">{stock.price}</p>
            </div>
            <p
                className="stock-change"
                style={{
                    color: stock.change.includes("+") ? "#22c55e" : "#ef4444",
                }}
            >
                {stock.change}
            </p>
        </article>
    );
}

export default StockItem;
