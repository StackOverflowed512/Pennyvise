import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Signup.module.css";

const Signup = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        agreedToTerms: false,
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showTermsPopup, setShowTermsPopup] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Full name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }

        if (!formData.agreedToTerms) {
            newErrors.agreedToTerms =
                "You must agree to the terms and conditions";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            navigate("/");
        } catch (err) {
            setErrors({ submit: "Signup failed. Please try again." });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.background}></div>

            <motion.div
                className={styles.formContainer}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className={styles.logoContainer}>
                    <img
                        src="https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2232&q=80"
                        alt="GenAI Finance Logo"
                        className={styles.logo}
                    />
                    <h1 className={styles.appName}>GenAI Finance</h1>
                </div>

                <div className={styles.form}>
                    <h2 className={styles.title}>Create Account</h2>
                    <p className={styles.subtitle}>
                        Join thousands of users managing their finances with AI
                    </p>

                    {errors.submit && (
                        <div className={styles.error}>{errors.submit}</div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="name" className={styles.label}>
                                Full Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Enter your full name"
                                className={`${styles.input} ${
                                    errors.name ? styles.errorInput : ""
                                }`}
                                value={formData.name}
                                onChange={handleChange}
                            />
                            {errors.name && (
                                <span className={styles.errorText}>
                                    {errors.name}
                                </span>
                            )}
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="email" className={styles.label}>
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className={`${styles.input} ${
                                    errors.email ? styles.errorInput : ""
                                }`}
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && (
                                <span className={styles.errorText}>
                                    {errors.email}
                                </span>
                            )}
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="password" className={styles.label}>
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Create a password (min 8 chars)"
                                className={`${styles.input} ${
                                    errors.password ? styles.errorInput : ""
                                }`}
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {errors.password && (
                                <span className={styles.errorText}>
                                    {errors.password}
                                </span>
                            )}
                        </div>

                        <div className={styles.terms}>
                            <input
                                type="checkbox"
                                id="terms"
                                name="agreedToTerms"
                                className={styles.checkbox}
                                checked={formData.agreedToTerms}
                                onChange={handleChange}
                            />
                            <label htmlFor="terms" className={styles.termsText}>
                                I agree to the{" "}
                                <button
                                    type="button"
                                    onClick={() => setShowTermsPopup(true)}
                                    className={styles.termsLink}
                                >
                                    Terms of Service
                                </button>{" "}             
                            </label>
                            {errors.agreedToTerms && (
                                <span className={styles.errorText}>
                                    {errors.agreedToTerms}
                                </span>
                            )}
                        </div>

                        <motion.button
                            type="submit"
                            className={styles.button}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className={styles.spinner}></span>
                            ) : (
                                "Create Account"
                            )}
                        </motion.button>
                    </form>
                </div>
            </motion.div>

            {/* Terms and Conditions Popup */}
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
                                Terms of Service
                            </h3>
                            <div className={styles.termsContent}>
                                <div className={styles.termsSection}>
                                    <h4>AI-Generated Content</h4>
                                    <p>
                                        The financial insights provided by GenAI
                                        Finance are generated by artificial
                                        intelligence and should not be
                                        considered as financial advice. Please
                                        note:
                                    </p>
                                    <ul>
                                        <li>
                                            All recommendations are AI-generated
                                            and may contain inaccuracies
                                        </li>
                                        <li>
                                            You should consult with a qualified
                                            financial advisor before making any
                                            decisions
                                        </li>
                                        <li>
                                            We cannot guarantee the accuracy or
                                            completeness of the information
                                        </li>
                                    </ul>
                                </div>

                                <div className={styles.termsSection}>
                                    <h4>Data Privacy</h4>
                                    <ul>
                                        <li>
                                            We collect necessary data to provide
                                            and improve our services
                                        </li>
                                        <li>
                                            Your financial data is encrypted and
                                            stored securely
                                        </li>
                                        <li>
                                            We will never sell your personal
                                            information to third parties
                                        </li>
                                    </ul>
                                </div>

                                <div className={styles.termsSection}>
                                    <h4>Account Responsibilities</h4>
                                    <ul>
                                        <li>
                                            You are responsible for maintaining
                                            the confidentiality of your account
                                        </li>
                                        <li>
                                            You must provide accurate and
                                            complete information
                                        </li>
                                        <li>
                                            You must be at least 18 years old to
                                            use our services
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className={styles.termsActions}>
                                <button
                                    className={styles.agreeButton}
                                    onClick={() => {
                                        setFormData((prev) => ({
                                            ...prev,
                                            agreedToTerms: true,
                                        }));
                                        setShowTermsPopup(false);
                                    }}
                                >
                                    I Agree
                                </button>
                                <button
                                    className={styles.cancelButton}
                                    onClick={() => setShowTermsPopup(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Signup;
