import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Main.module.css";

const API_BASE_URL = "https://pennyvise.onrender.com"; // Ensure this is correct

const Main = () => {
    const [symbol, setSymbol] = useState("");
    const [analysisResult, setAnalysisResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState("details");
    const [recentSearches, setRecentSearches] = useState([]);
    const [showTermsPopup, setShowTermsPopup] = useState(false);
    const navigate = useNavigate();

    // Load recent searches from localStorage
    useEffect(() => {
        const savedSearches = localStorage.getItem("recentSearches");
        if (savedSearches) {
            setRecentSearches(JSON.parse(savedSearches));
        }
    }, []);

    const handleAnalyze = async () => {
        if (!symbol.trim()) {
            setError("Please enter a stock symbol.");
            return;
        }

        setLoading(true);
        setError("");
        setAnalysisResult(null);

        try {
            const [detailsResponse, predictionResponse] = await Promise.all([
                axios.get(`${API_BASE_URL}/api/stock?symbol=${symbol.trim()}`),
                axios.get(`${API_BASE_URL}/api/predict_with_info?symbol=${symbol.trim()}`),
            ]);

            // Parse the AI insights into structured data
            const insightsText = predictionResponse.data.stock_info;
            const parsedInsights = parseAIInsights(insightsText);

            const result = {
                details: detailsResponse.data.stock_details,
                prediction: predictionResponse.data,
                insights: parsedInsights,
                timestamp: new Date().toISOString(),
            };

            setAnalysisResult(result);

            // Update recent searches
            const updatedSearches = [
                {
                    symbol: symbol.trim(),
                    name: detailsResponse.data.stock_details.name,
                    timestamp: new Date().toISOString(),
                },
                ...recentSearches
                    .filter((item) => item.symbol !== symbol.trim())
                    .slice(0, 4),
            ];
            setRecentSearches(updatedSearches);
            localStorage.setItem(
                "recentSearches",
                JSON.stringify(updatedSearches)
            );
        } catch (err) {
            setError(
                err.response?.data?.error ||
                    "Failed to analyze the stock. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const parseAIInsights = (text) => {
        const sections = text.split("\n\n").filter((section) => section.trim());
        return {
            summary: sections.length > 0 ? sections[0] : "",
            fundamentalAnalysis: sections.length > 1 ? sections[1] : "",
            technicalAnalysis: sections.length > 2 ? sections[2] : "",
            riskAssessment: sections.length > 3 ? sections[3] : "",
            recommendation: sections.length > 4 ? sections[4] : "",
        };
    };

    const formatMarketCap = (value) => {
        if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
        if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
        if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
        return `$${value}`;
    };

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "short", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className={styles.container}>
            {/* Navbar */}
            <nav className={styles.navbar}>
                <div className={styles.navLeft}>
                    <span className={styles.logo}>
                        <span className={styles.logoHighlight}>AI</span>Finance
                    </span>
                </div>
                <div className={styles.navRight}>
                    <Link to="/login" className={styles.navButton}>
                        Sign In
                    </Link>
                    <Link
                        to="/signup"
                        className={`${styles.navButton} ${styles.primaryButton}`}
                    >
                        Sign Up
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <header className={styles.hero}>
                <div className={styles.heroContent}>
                    <motion.h1
                        className={styles.heroTitle}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        AI-Powered{" "}
                        <span className={styles.textGradient}>
                            Stock Intelligence
                        </span>
                    </motion.h1>
                    <motion.p
                        className={styles.heroSubtitle}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Get comprehensive analysis and predictions powered by
                        generative AI
                    </motion.p>
                </div>
                <motion.div
                    className={styles.heroIllustration}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <div className={styles.chartPlaceholder}></div>
                </motion.div>
            </header>

            {/* Main Analysis Section */}
            <main className={styles.mainContent}>
                <motion.div
                    className={styles.searchCard}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <div className={styles.searchHeader}>
                        <h2 className={styles.searchTitle}>Stock Analysis</h2>
                        <div className={styles.searchBadge}>BETA</div>
                    </div>

                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            className={styles.searchInput}
                            placeholder="Enter stock symbol (e.g., AAPL, TSLA)"
                            value={symbol}
                            onChange={(e) => setSymbol(e.target.value)}
                            onKeyPress={(e) =>
                                e.key === "Enter" && handleAnalyze()
                            }
                        />
                        <motion.button
                            className={styles.analyzeButton}
                            onClick={handleAnalyze}
                            disabled={loading}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {loading ? (
                                <span className={styles.spinner}></span>
                            ) : (
                                <>
                                    <span className={styles.buttonIcon}>
                                        📈
                                    </span>
                                    Analyze
                                </>
                            )}
                        </motion.button>
                    </div>

                    {error && (
                        <div className={styles.errorMessage}>{error}</div>
                    )}

                    {recentSearches.length > 0 && (
                        <div className={styles.recentSearches}>
                            <h4 className={styles.recentTitle}>
                                Recent Searches:
                            </h4>
                            <div className={styles.recentList}>
                                {recentSearches.map((search, index) => (
                                    <motion.button
                                        key={index}
                                        className={styles.recentItem}
                                        onClick={() => setSymbol(search.symbol)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {search.symbol} - {search.name}
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* Results Section */}
                <AnimatePresence>
                    {analysisResult && (
                        <motion.div
                            className={styles.resultsCard}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className={styles.resultsHeader}>
                                <div className={styles.stockHeader}>
                                    <h3 className={styles.stockName}>
                                        {analysisResult.details.name}
                                        <span className={styles.stockSymbol}>
                                            ({analysisResult.details.symbol})
                                        </span>
                                    </h3>
                                    <div className={styles.priceTag}>
                                        ${analysisResult.details.current_price}
                                    </div>
                                </div>
                                <div className={styles.tabControls}>
                                    <button
                                        className={`${styles.tabButton} ${
                                            activeTab === "details"
                                                ? styles.activeTab
                                                : ""
                                        }`}
                                        onClick={() => setActiveTab("details")}
                                    >
                                        Details
                                    </button>
                                    <button
                                        className={`${styles.tabButton} ${
                                            activeTab === "prediction"
                                                ? styles.activeTab
                                                : ""
                                        }`}
                                        onClick={() =>
                                            setActiveTab("prediction")
                                        }
                                    >
                                        Prediction
                                    </button>
                                    <button
                                        className={`${styles.tabButton} ${
                                            activeTab === "insights"
                                                ? styles.activeTab
                                                : ""
                                        }`}
                                        onClick={() => setActiveTab("insights")}
                                    >
                                        AI Insights
                                    </button>
                                </div>
                            </div>

                            <div className={styles.tabContent}>
                                {activeTab === "details" && (
                                    <div className={styles.detailsGrid}>
                                        <div className={styles.metricCard}>
                                            <div className={styles.metricLabel}>
                                                Market Cap
                                            </div>
                                            <div className={styles.metricValue}>
                                                {formatMarketCap(
                                                    analysisResult.details
                                                        .market_cap
                                                )}
                                            </div>
                                        </div>
                                        <div className={styles.metricCard}>
                                            <div className={styles.metricLabel}>
                                                52-Week High
                                            </div>
                                            <div className={styles.metricValue}>
                                                $
                                                {
                                                    analysisResult.details[
                                                        "52_week_high"
                                                    ]
                                                }
                                            </div>
                                        </div>
                                        <div className={styles.metricCard}>
                                            <div className={styles.metricLabel}>
                                                52-Week Low
                                            </div>
                                            <div className={styles.metricValue}>
                                                $
                                                {
                                                    analysisResult.details[
                                                        "52_week_low"
                                                    ]
                                                }
                                            </div>
                                        </div>
                                        <div className={styles.metricCard}>
                                            <div className={styles.metricLabel}>
                                                Sector
                                            </div>
                                            <div className={styles.metricValue}>
                                                {analysisResult.details.sector}
                                            </div>
                                        </div>
                                        <div className={styles.metricCard}>
                                            <div className={styles.metricLabel}>
                                                Industry
                                            </div>
                                            <div className={styles.metricValue}>
                                                {
                                                    analysisResult.details
                                                        .industry
                                                }
                                            </div>
                                        </div>
                                        <div className={styles.metricCard}>
                                            <div className={styles.metricLabel}>
                                                PE Ratio
                                            </div>
                                            <div className={styles.metricValue}>
                                                {analysisResult.details
                                                    .pe_ratio || "N/A"}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === "prediction" && (
                                    <div className={styles.predictionContent}>
                                        <div className={styles.predictionCard}>
                                            <div
                                                className={
                                                    styles.predictionHeader
                                                }
                                            >
                                                <div
                                                    className={
                                                        styles.predictionDate
                                                    }
                                                >
                                                    {formatDate(
                                                        analysisResult
                                                            .prediction.next_day
                                                    )}
                                                </div>
                                                <div
                                                    className={
                                                        styles.predictionBadge
                                                    }
                                                >
                                                    AI Forecast
                                                </div>
                                            </div>
                                            <div
                                                className={
                                                    styles.predictionValue
                                                }
                                            >
                                                $
                                                {
                                                    analysisResult.prediction
                                                        .predicted_price
                                                }
                                            </div>
                                            <div
                                                className={
                                                    styles.predictionComparison
                                                }
                                            >
                                                <span
                                                    className={
                                                        styles.comparisonLabel
                                                    }
                                                >
                                                    {analysisResult.prediction
                                                        .predicted_price >
                                                    analysisResult.details
                                                        .current_price ? (
                                                        <span
                                                            className={
                                                                styles.positiveChange
                                                            }
                                                        >
                                                            ↑ Potential Gain
                                                        </span>
                                                    ) : (
                                                        <span
                                                            className={
                                                                styles.negativeChange
                                                            }
                                                        >
                                                            ↓ Potential Loss
                                                        </span>
                                                    )}
                                                </span>
                                                <span
                                                    className={
                                                        styles.comparisonValue
                                                    }
                                                >
                                                    {Math.abs(
                                                        analysisResult
                                                            .prediction
                                                            .predicted_price -
                                                            analysisResult
                                                                .details
                                                                .current_price
                                                    ).toFixed(2)}
                                                </span>
                                            </div>
                                            <div
                                                className={
                                                    styles.predictionConfidence
                                                }
                                            >
                                                <div
                                                    className={
                                                        styles.confidenceLabel
                                                    }
                                                >
                                                    Confidence Level:
                                                </div>
                                                <div
                                                    className={
                                                        styles.confidenceBar
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            styles.confidenceFill
                                                        }
                                                        style={{
                                                            width: `${
                                                                analysisResult
                                                                    .prediction
                                                                    .confidence ||
                                                                70
                                                            }%`,
                                                        }}
                                                    ></div>
                                                </div>
                                                <div
                                                    className={
                                                        styles.confidenceValue
                                                    }
                                                >
                                                    {analysisResult.prediction
                                                        .confidence || 70}
                                                    %
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.disclaimer}>
                                            <button
                                                className={
                                                    styles.disclaimerButton
                                                }
                                                onClick={() =>
                                                    setShowTermsPopup(true)
                                                }
                                            >
                                                ⚠️ AI Prediction Disclaimer
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {activeTab === "insights" &&
                                    analysisResult.insights && (
                                        <div
                                            className={styles.insightsContainer}
                                        >
                                            <div
                                                className={
                                                    styles.insightsHeader
                                                }
                                            >
                                                <div
                                                    className={styles.aiAvatar}
                                                >
                                                    <div
                                                        className={
                                                            styles.aiIcon
                                                        }
                                                    >
                                                        AI
                                                    </div>
                                                    <div
                                                        className={styles.aiTag}
                                                    >
                                                        AI Analyst
                                                    </div>
                                                </div>
                                                <div
                                                    className={
                                                        styles.insightsTitle
                                                    }
                                                >
                                                    Market Intelligence Report
                                                </div>
                                            </div>

                                            <div
                                                className={styles.insightsGrid}
                                            >
                                                <div
                                                    className={`${styles.insightCard} ${styles.summaryCard}`}
                                                >
                                                    <div
                                                        className={
                                                            styles.cardHeader
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                styles.cardIcon
                                                            }
                                                        >
                                                            🔍
                                                        </div>
                                                        <h4
                                                            className={
                                                                styles.cardTitle
                                                            }
                                                        >
                                                            Executive Summary
                                                        </h4>
                                                    </div>
                                                    <div
                                                        className={
                                                            styles.cardContent
                                                        }
                                                    >
                                                        {analysisResult.insights
                                                            .summary ||
                                                            "No summary available"}
                                                    </div>
                                                </div>

                                                <div
                                                    className={`${styles.insightCard} ${styles.fundamentalCard}`}
                                                >
                                                    <div
                                                        className={
                                                            styles.cardHeader
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                styles.cardIcon
                                                            }
                                                        >
                                                            📊
                                                        </div>
                                                        <h4
                                                            className={
                                                                styles.cardTitle
                                                            }
                                                        >
                                                            Fundamental Analysis
                                                        </h4>
                                                    </div>
                                                    <div
                                                        className={
                                                            styles.cardContent
                                                        }
                                                    >
                                                        {analysisResult.insights
                                                            .fundamentalAnalysis ||
                                                            "No fundamental analysis available"}
                                                    </div>
                                                </div>

                                                <div
                                                    className={`${styles.insightCard} ${styles.technicalCard}`}
                                                >
                                                    <div
                                                        className={
                                                            styles.cardHeader
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                styles.cardIcon
                                                            }
                                                        >
                                                            📉
                                                        </div>
                                                        <h4
                                                            className={
                                                                styles.cardTitle
                                                            }
                                                        >
                                                            Technical Analysis
                                                        </h4>
                                                    </div>
                                                    <div
                                                        className={
                                                            styles.cardContent
                                                        }
                                                    >
                                                        {analysisResult.insights
                                                            .technicalAnalysis ||
                                                            "No technical analysis available"}
                                                    </div>
                                                </div>

                                                <div
                                                    className={`${styles.insightCard} ${styles.riskCard}`}
                                                >
                                                    <div
                                                        className={
                                                            styles.cardHeader
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                styles.cardIcon
                                                            }
                                                        >
                                                            ⚠️
                                                        </div>
                                                        <h4
                                                            className={
                                                                styles.cardTitle
                                                            }
                                                        >
                                                            Risk Assessment
                                                        </h4>
                                                    </div>
                                                    <div
                                                        className={
                                                            styles.cardContent
                                                        }
                                                    >
                                                        {analysisResult.insights
                                                            .riskAssessment ||
                                                            "No risk assessment available"}
                                                    </div>
                                                </div>

                                                <div
                                                    className={`${styles.insightCard} ${styles.recommendationCard}`}
                                                >
                                                    <div
                                                        className={
                                                            styles.cardHeader
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                styles.cardIcon
                                                            }
                                                        >
                                                            💡
                                                        </div>
                                                        <h4
                                                            className={
                                                                styles.cardTitle
                                                            }
                                                        >
                                                            Investment
                                                            Recommendation
                                                        </h4>
                                                    </div>
                                                    <div
                                                        className={
                                                            styles.cardContent
                                                        }
                                                    >
                                                        {analysisResult.insights
                                                            .recommendation ||
                                                            "No recommendation available"}
                                                    </div>
                                                    <div
                                                        className={
                                                            styles.recommendationBadge
                                                        }
                                                    >
                                                        {analysisResult
                                                            .prediction
                                                            .predicted_price >
                                                        analysisResult.details
                                                            .current_price ? (
                                                            <span
                                                                className={
                                                                    styles.buyBadge
                                                                }
                                                            >
                                                                Buy
                                                            </span>
                                                        ) : (
                                                            <span
                                                                className={
                                                                    styles.sellBadge
                                                                }
                                                            >
                                                                Sell
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* Footer */}
            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <div className={styles.footerLogo}>AIFinance</div>
                    <div className={styles.footerLinks}>
                        <Link to="/about" className={styles.footerLink}>
                            About
                        </Link>
                        <Link to="/privacy" className={styles.footerLink}>
                            Privacy
                        </Link>
                        <Link to="/terms" className={styles.footerLink}>
                            Terms
                        </Link>
                        <Link to="/contact" className={styles.footerLink}>
                            Contact
                        </Link>
                    </div>
                    <div className={styles.footerCopyright}>
                        © {new Date().getFullYear()} AIFinance. All rights
                        reserved.
                    </div>
                </div>
            </footer>

            {/* Terms Popup */}
            <AnimatePresence>
                {showTermsPopup && (
                    <motion.div
                        className={styles.termsPopupOverlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowTermsPopup(false)}
                    >
                        <motion.div
                            className={styles.termsPopup}
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className={styles.closeButton}
                                onClick={() => setShowTermsPopup(false)}
                            >
                                &times;
                            </button>
                            <h3 className={styles.termsPopupTitle}>
                                AI Prediction Disclaimer
                            </h3>
                            <div className={styles.termsContent}>
                                <div className={styles.termsSection}>
                                    <h4>Important Notice</h4>
                                    <p>
                                        The predictions and analysis provided by
                                        GenAI Finance are generated by
                                        artificial intelligence and should not
                                        be considered as financial advice.
                                    </p>
                                    <ul>
                                        <li>
                                            All recommendations are AI-generated
                                            and may contain inaccuracies
                                        </li>
                                        <li>
                                            You should consult with a qualified
                                            financial advisor before making any
                                            investment decisions
                                        </li>
                                        <li>
                                            We cannot guarantee the accuracy or
                                            completeness of the information
                                        </li>
                                        <li>
                                            Past performance is not indicative
                                            of future results
                                        </li>
                                        <li>
                                            The AI may not account for all
                                            market conditions or recent events
                                        </li>
                                    </ul>
                                </div>

                                <div className={styles.termsSection}>
                                    <h4>Limitations</h4>
                                    <ul>
                                        <li>
                                            AI models may have inherent biases
                                            based on their training data
                                        </li>
                                        <li>
                                            Predictions are probabilistic and
                                            not definitive
                                        </li>
                                        <li>
                                            Unexpected market events can quickly
                                            make predictions obsolete
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className={styles.termsActions}>
                                <button
                                    className={styles.agreeButton}
                                    onClick={() => setShowTermsPopup(false)}
                                >
                                    I Understand
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Main;
