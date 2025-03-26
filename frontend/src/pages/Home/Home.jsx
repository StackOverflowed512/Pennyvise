import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import ImageCarousel from "../../components/ImageCarousel/ImageCarousel";
import Mobile from "../../components/Mobile/Mobile";
import NewGetStartedButton from "../../components/NewGetStartedButton/NewGetStartedButton"; // new import
import NewWatchButton from "../../components/NewWatchButton/NewWatchButton";

const Home = () => {
    // Unsplash image URLs
    // In the images object at the top of Home.jsx
    const images = {
        hero: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        feature1:
            "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2111&q=80", // New image for feature 1
        feature2:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        feature3:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80",
        logo: "https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2232&q=80",
        background:
            "https://images.unsplash.com/photo-1625225230517-7426c1be750c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    };

    const heading = "Your Personal Gen-AI Finance Assistant";
    const [visibleText, setVisibleText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showMobile, setShowMobile] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const navigate = useNavigate();

    // FAQ state
    const [faqOpenIndex, setFaqOpenIndex] = useState(null);

    const toggleFaq = (index) => {
        setFaqOpenIndex(faqOpenIndex === index ? null : index);
    };

    useEffect(() => {
        if (currentIndex < heading.length) {
            const timer = setTimeout(() => {
                setVisibleText((prev) => prev + heading[currentIndex]);
                setCurrentIndex((prev) => prev + 1);
            }, 100);

            return () => clearTimeout(timer);
        } else if (currentIndex === heading.length) {
            setShowMobile(true);
            setTimeout(() => {
                setShowMobile(false);
            }, 7000);
        }
    }, [currentIndex, heading]);

    // FAQ data
    const faqData = [
        {
            question: "What is PennyVise?",
            answer: "PennyVise is an AI-powered platform that provides personalized financial insights, real-time analytics, and portfolio management tools to help you make smarter financial decisions.",
        },
        {
            question: "How does PennyVise work?",
            answer: "PennyVise uses advanced AI algorithms to analyze your financial data and provide tailored recommendations. You can set goals, track progress, and execute trades directly through the platform.",
        },
        {
            question: "Is my data secure with PennyVise?",
            answer: "Yes, we use state-of-the-art encryption and security protocols to ensure your data is safe and secure.",
        },
        {
            question: "Can I use PennyVise for free?",
            answer: "Yes, we offer a free tier with basic features. For advanced features, you can upgrade to our premium plan.",
        },
        {
            question: "How do I get started?",
            answer: "Simply sign up for an account, set your financial goals, and start receiving AI-powered insights.",
        },
    ];

    // Handle search button click
    const handleSearchClick = () => {
        navigate("/main");
    };

    return (
        <div className={styles.container}>
            {/* Background pattern */}
            <div className={styles.backgroundPattern}></div>

            {/* Floating particles */}
            <div className={styles.particles}>
                {[...Array(20)].map((_, i) => (
                    <div key={i} className={styles.particle}></div>
                ))}
            </div>

            {/* Navbar */}
            <nav className={styles.navbar}>
                <div className={styles.navLeft}>
                    <img
                        src={images.logo}
                        alt="Logo"
                        className={styles.logoImage}
                    />
                    <span className={styles.logo}>PennyVise</span>
                </div>
                <div className={styles.navRight}>
                    <button
                        className={styles.searchButton}
                        onClick={handleSearchClick}
                        aria-label="Search"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                    </button>
                    <Link to="/login" className={styles.navButton}>
                        Sign In
                    </Link>
                    <Link to="/signup" className={styles.navButton}>
                        Sign Up
                    </Link>
                    <Link to="/about" className={styles.navButton}>
                        About
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className={styles.hero}
            >
                <div
                    className={styles.heroBackground}
                    style={{ backgroundImage: `url(${images.hero})` }}
                ></div>
                <div className={styles.heroOverlay}></div>

                <div className={styles.heroContent}>
                    <motion.h1 className={styles.heroTitle}>
                        {visibleText}
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            style={{ marginLeft: "4px" }}
                        >
                            |
                        </motion.span>
                    </motion.h1>

                    <motion.p
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className={styles.heroSubtitle}
                    >
                        Make smarter financial decisions with AI-powered
                        insights and tools.
                    </motion.p>

                    <motion.div
                        className={styles.heroButtons}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                    >
                        <Link to="/signup">
                            <NewGetStartedButton />
                        </Link>
                        <Link to="/demo" className={styles.ctaButtonSecondary}>
                            <NewWatchButton />
                        </Link>
                    </motion.div>
                </div>

                {/* Mobile Screen Slide In/Out */}
                <AnimatePresence>
                    {showMobile && (
                        <motion.div
                            key="mobile"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "tween", duration: 1 }}
                            className={styles.mobileContainer}
                        >
                            <Mobile />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.section>

            {/* Image Carousel */}
            <ImageCarousel />

            {/* How It Works Section */}
            <section className={styles.howItWorks}>
                <div className={styles.sectionContainer}>
                    <h2 className={styles.sectionTitle}>How It Works</h2>
                    <p className={styles.sectionSubtitle}>
                        Get started in just 4 simple steps
                    </p>
                    <div className={styles.howItWorksSteps}>
                        {[
                            {
                                icon: "1",
                                title: "Create Account",
                                description:
                                    "Sign up in less than a minute with your email",
                                color: "#4f46e5",
                            },
                            {
                                icon: "2",
                                title: "Connect Accounts",
                                description:
                                    "Securely link your financial accounts",
                                color: "#9333ea",
                            },
                            {
                                icon: "3",
                                title: "Set Goals",
                                description: "Define your financial objectives",
                                color: "#3b82f6",
                            },
                            {
                                icon: "4",
                                title: "Get Insights",
                                description:
                                    "Receive AI-powered recommendations",
                                color: "#10b981",
                            },
                        ].map((step, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -10 }}
                                className={styles.step}
                                style={{ "--step-color": step.color }}
                            >
                                <div className={styles.stepIcon}>
                                    {step.icon}
                                </div>
                                <h3 className={styles.stepTitle}>
                                    {step.title}
                                </h3>
                                <p className={styles.stepDescription}>
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className={styles.features}>
                <div className={styles.sectionContainer}>
                    <h2 className={styles.sectionTitle}>
                        Why Choose PennyVise?
                    </h2>
                    <p className={styles.sectionSubtitle}>
                        Powerful features designed for your financial success
                    </p>
                    <div className={styles.featuresGrid}>
                        {[
                            {
                                title: "AI-Powered Insights",
                                description:
                                    "Get personalized financial advice tailored to your goals.",
                                image: images.feature1,
                            },
                            {
                                title: "Real-Time Analytics",
                                description:
                                    "Access real-time market data and trends.",
                                image: images.feature2,
                            },
                            {
                                title: "Portfolio Management",
                                description:
                                    "Manage and optimize your investments effortlessly.",
                                image: images.feature3,
                            },
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -10 }}
                                className={styles.featureCard}
                                onMouseEnter={() => setIsHovering(index)}
                                onMouseLeave={() => setIsHovering(null)}
                            >
                                <div className={styles.featureImageContainer}>
                                    <div
                                        className={styles.featureImage}
                                        style={{
                                            backgroundImage: `url(${feature.image})`,
                                        }}
                                    ></div>
                                    <div
                                        className={styles.featureOverlay}
                                    ></div>
                                </div>
                                <div className={styles.featureContent}>
                                    <h3 className={styles.featureTitle}>
                                        {feature.title}
                                    </h3>
                                    <p className={styles.featureDescription}>
                                        {feature.description}
                                    </p>
                                    <motion.div
                                        className={styles.featureLearnMore}
                                        animate={{
                                            x: isHovering === index ? 5 : 0,
                                            opacity:
                                                isHovering === index ? 1 : 0.8,
                                        }}
                                    >
                                        Learn more →
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className={styles.stats}>
                <div className={styles.statsContainer}>
                    {/* These are Placeholder for NOW. */}
                    {[
                        { value: "10M+", label: "Users Worldwide" },
                        { value: "99.9%", label: "Uptime Reliability" },
                        { value: "24/7", label: "Customer Support" },
                        { value: "100+", label: "Financial Tools" },
                    ].map((stat, index) => (
                        <div key={index} className={styles.statItem}>
                            <motion.h3
                                className={styles.statValue}
                                whileHover={{ scale: 1.1 }}
                            >
                                {stat.value}
                            </motion.h3>
                            <p className={styles.statLabel}>{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ Section */}
            <section className={styles.faqSection}>
                <div className={styles.sectionContainer}>
                    <h2 className={styles.sectionTitle}>
                        Frequently Asked Questions
                    </h2>
                    <p className={styles.sectionSubtitle}>
                        Everything you need to know
                    </p>
                    <div className={styles.faqList}>
                        {faqData.map((faq, index) => (
                            <motion.div
                                key={index}
                                className={styles.faqItem}
                                onClick={() => toggleFaq(index)}
                                whileHover={{ x: 5 }}
                            >
                                <div className={styles.faqQuestion}>
                                    <span>{faq.question}</span>
                                    <motion.span
                                        className={styles.faqToggle}
                                        animate={{
                                            rotate:
                                                faqOpenIndex === index ? 45 : 0,
                                        }}
                                    >
                                        +
                                    </motion.span>
                                </div>
                                <AnimatePresence>
                                    {faqOpenIndex === index && (
                                        <motion.div
                                            className={styles.faqAnswer}
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{
                                                opacity: 1,
                                                height: "auto",
                                            }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {faq.answer}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.ctaSection}>
                <div className={styles.ctaContainer}>
                    <h2 className={styles.ctaTitle}>
                        Ready to transform your financial future?
                    </h2>
                    <p className={styles.ctaSubtitle}>
                        Join thousands of users who trust PennyVise for their financial
                        decisions
                    </p>
                    <div className={styles.ctaButtons}>
                        <Link to="/signup">
                            <NewGetStartedButton />
                        </Link>
                        <Link to="/demo" className={styles.ctaButtonSecondary}>
                            <NewWatchButton />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className={styles.footer}>
                <div className={styles.footerContainer}>
                    <div className={styles.footerTop}>
                        <div className={styles.footerBrand}>
                            <img
                                src={images.logo}
                                alt="Logo"
                                className={styles.footerLogoImage}
                            />
                            <span className={styles.footerLogo}>
                                PennyVise
                            </span>
                            <p className={styles.footerTagline}>
                                Your personal AI finance assistant
                            </p>
                        </div>
                        <div className={styles.footerLinks}>
                            <div className={styles.footerColumn}>
                                <h4 className={styles.footerHeading}>
                                    Product
                                </h4>
                                <Link
                                    to="/features"
                                    className={styles.footerLink}
                                >
                                    Features
                                </Link>
                                <Link
                                    to="/pricing"
                                    className={styles.footerLink}
                                >
                                    Pricing
                                </Link>
                                <Link to="/demo" className={styles.footerLink}>
                                    Demo
                                </Link>
                            </div>
                            <div className={styles.footerColumn}>
                                <h4 className={styles.footerHeading}>
                                    Company
                                </h4>
                                <Link to="/about" className={styles.footerLink}>
                                    About
                                </Link>
                                <Link
                                    to="/careers"
                                    className={styles.footerLink}
                                >
                                    Careers
                                </Link>
                                <Link to="/blog" className={styles.footerLink}>
                                    Blog
                                </Link>
                            </div>
                            <div className={styles.footerColumn}>
                                <h4 className={styles.footerHeading}>
                                    Support
                                </h4>
                                <Link to="/help" className={styles.footerLink}>
                                    Help Center
                                </Link>
                                <Link
                                    to="/contact"
                                    className={styles.footerLink}
                                >
                                    Contact Us
                                </Link>
                                <Link
                                    to="/privacy"
                                    className={styles.footerLink}
                                >
                                    Privacy Policy
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className={styles.footerBottom}>
                        <p className={styles.footerCopyright}>
                            &copy; {new Date().getFullYear()} PennyVise. All
                            rights reserved.
                        </p>
                        <div className={styles.footerSocial}>
                            <a
                                href="https://twitter.com"
                                className={styles.socialLink}
                                aria-label="Twitter"
                            >
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M22.46 6.012a8.58 8.58 0 01-2.466.676 4.305 4.305 0 001.887-2.374 8.591 8.591 0 01-2.725 1.041 4.292 4.292 0 00-7.313 3.914 12.184 12.184 0 01-8.846-4.483 4.271 4.271 0 00-.581 2.157 4.29 4.29 0 001.91 3.572 4.276 4.276 0 01-1.943-.537v.054a4.295 4.295 0 003.442 4.208 4.305 4.305 0 01-1.938.073 4.297 4.297 0 004.01 2.981 8.61 8.61 0 01-5.33 1.838c-.347 0-.687-.02-1.022-.06a12.147 12.147 0 006.59 1.932c7.908 0 12.23-6.55 12.23-12.23 0-.186-.004-.372-.012-.557a8.748 8.748 0 002.148-2.228z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </a>
                            <a
                                href="https://linkedin.com"
                                className={styles.socialLink}
                                aria-label="LinkedIn"
                            >
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </a>
                            <a
                                href="https://github.com"
                                className={styles.socialLink}
                                aria-label="GitHub"
                            >
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
