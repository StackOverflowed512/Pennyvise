import React from "react";
import styles from "./Mobile.module.css";

const Mobile = () => {
    const insights = [
        { text: "The market is trending upwards." },
        { text: "Consider diversifying your portfolio." },
        { text: "Tech stocks are performing well." },
    ];

    const predictions = [
        { name: "AAPL", prediction: "Buy" },
        { name: "TSLA", prediction: "Strong Buy" },
        { name: "AMZN", prediction: "Hold" },
    ];

    const stocks = [
        { name: "AAPL", price: "$150.25", change: "+1.5%" },
        { name: "TSLA", price: "$700.50", change: "-0.8%" },
        { name: "AMZN", price: "$3,200.00", change: "+0.3%" },
    ];

    return (
        <div className={styles.phoneFrame}>
            {/* Dynamic Island */}
            <div className={styles.dynamicIsland}></div>

            {/* Phone Screen */}
            <div className={styles.phoneScreen}>
                {/* Insights Section */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Insights</h2>
                    {insights.map((insight, index) => (
                        <div
                            key={index}
                            className={styles.insightItem}
                            style={{
                                borderBottom:
                                    index === insights.length - 1
                                        ? "none"
                                        : "1px solid #2a2f3e",
                            }}
                        >
                            <div className={styles.insightBullet} />
                            <p className={styles.insightText}>{insight.text}</p>
                        </div>
                    ))}
                </section>

                {/* Predictions Section */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Predictions</h2>
                    {predictions.map((stock, index) => (
                        <div
                            key={index}
                            className={styles.predictionItem}
                            style={{
                                borderBottom:
                                    index === predictions.length - 1
                                        ? "none"
                                        : "1px solid #2a2f3e",
                            }}
                        >
                            <span className={styles.stockSymbol}>
                                {stock.name}
                            </span>
                            <span
                                className={styles.predictionBadge}
                                style={{
                                    backgroundColor:
                                        stock.prediction === "Buy"
                                            ? "#dcfce7"
                                            : stock.prediction === "Strong Buy"
                                            ? "#bbf7d0"
                                            : "#fee2e2",
                                    color:
                                        stock.prediction === "Buy"
                                            ? "#15803d"
                                            : stock.prediction === "Strong Buy"
                                            ? "#166534"
                                            : "#991b1b",
                                }}
                            >
                                {stock.prediction}
                            </span>
                        </div>
                    ))}
                </section>

                {/* Stocks Section */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Stocks</h2>
                    {stocks.map((stock, index) => (
                        <div
                            key={index}
                            className={styles.stockItem}
                            style={{
                                borderBottom:
                                    index === stocks.length - 1
                                        ? "none"
                                        : "1px solid #2a2f3e",
                            }}
                        >
                            <div className={styles.stockInfo}>
                                <h3 className={styles.stockName}>
                                    {stock.name}
                                </h3>
                                <p className={styles.stockPrice}>
                                    {stock.price}
                                </p>
                            </div>
                            <p
                                className={styles.stockChange}
                                style={{
                                    color: stock.change.includes("+")
                                        ? "#22c55e"
                                        : "#ef4444",
                                }}
                            >
                                {stock.change}
                            </p>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
};

export default Mobile;
