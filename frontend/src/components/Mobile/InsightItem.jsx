import React from "react";
import "./InsightItem.css";

function InsightItem({ insight, isLast }) {
    return (
        <div
            className="insight-item"
            style={{
                borderBottom: isLast ? "none" : "1px solid #e2e8f0",
            }}
        >
            <div className="insight-bullet" aria-hidden="true" />
            <p className="insight-text">{insight.text}</p>
        </div>
    );
}

export default InsightItem;
