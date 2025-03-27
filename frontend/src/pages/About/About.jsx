import React from "react";
import { Link } from "react-router-dom";
import styles from "./About.module.css";
import { FaLinkedin, FaEnvelope, FaGithub } from "react-icons/fa";

const About = () => {
    const teamMembers = [
        {
            name: "Omkar Mutyalwar",
            role: "Web-Dev",
            email: "omkarmutyalwar5@gmail.com",
            linkedin: "https://www.linkedin.com/in/omkar-mutyalwar/",
            github: "https://github.com/StackOverflowed512",
            photo: "https://adaptcommunitynetwork.org/wp-content/uploads/2023/09/person-placeholder.jpg",
        },
        {
            name: "Vaishnav Mankar",
            role: "MLOps",
            email: "pict.vaishnav@gmail.com",
            linkedin: "https://www.linkedin.com/in/vaishnav-mankar",
            github: "https://github.com/myselfmankar",
            photo: "https://adaptcommunitynetwork.org/wp-content/uploads/2023/09/person-placeholder.jpg",
        },
        {
            name: "Sakshi Shinde",
            role: "Team Lead",
            email: "sakshinshinde29@gmail.com",
            linkedin: "https://www.linkedin.com/in/sakshi-shinde-913733317",
            github: "https://github.com/Sakshi411910",
            photo: "https://adaptcommunitynetwork.org/wp-content/uploads/2023/09/person-placeholder.jpg",
        },
        {
            name: "Pranav Chaudhari",
            role: "UI/UX",
            email: "pranav.chaudhari@mitwpu.edu.in",
            linkedin:
                " https://www.linkedin.com/in/pranav-amol-chaudhari-849170344",
            github: "#",
            photo: "https://adaptcommunitynetwork.org/wp-content/uploads/2023/09/person-placeholder.jpg",
        },
    ];

    return (
        <div className={styles.container}>
            {/* Animated Background */}
            <div className={styles.animatedBackground}></div>

            {/* Navbar */}
            <nav className={styles.navbar}>
                <div className={styles.navLeft}>
                    <span className={styles.logo}>
                        PennyVise<span></span>
                    </span>
                </div>
                <div className={styles.navRight}>
                    <Link to="/" className={styles.navLink}>
                        Home
                    </Link>
                    <Link to="/login" className={styles.navLink}>
                        Sign In
                    </Link>
                    <Link to="/signup" className={styles.navButton}>
                        Sign Up
                    </Link>
                </div>
            </nav>

            {/* Main Content */}
            <main className={styles.main}>
                {/* Hero Section */}
                <section className={styles.hero}>
                    <h1 className={styles.heroTitle}>
                        Revolutionizing <span>Finance</span> with AI
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Smart solutions for smarter financial decisions
                    </p>
                </section>

                {/* About Section */}
                <section className={styles.aboutSection}>
                    <div className={styles.aboutContent}>
                        <h2 className={styles.sectionTitle}>Our Vision</h2>
                        <p className={styles.aboutText}>
                            At PennyVise , we're transforming financial
                            management through artificial intelligence. Our
                            platform delivers real-time insights, predictive
                            analytics, and personalized investment strategies to
                            empower both novice and expert investors.
                        </p>
                        <div className={styles.stats}>
                            <div className={styles.statItem}>
                                <span className={styles.statNumber}>100%</span>
                                <span className={styles.statLabel}>
                                    AI-Powered
                                </span>
                            </div>
                            <div className={styles.statItem}>
                                <span className={styles.statNumber}>24/7</span>
                                <span className={styles.statLabel}>
                                    Market Analysis
                                </span>
                            </div>
                            <div className={styles.statItem}>
                                <span className={styles.statNumber}>10K+</span>
                                <span className={styles.statLabel}>
                                    Data Points
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className={styles.teamSection}>
                    <h2 className={styles.sectionTitle}>Meet The Team</h2>
                    <p className={styles.sectionSubtitle}>
                        The brilliant minds behind PennyVise Finance
                    </p>

                    <div className={styles.teamGrid}>
                        {teamMembers.map((member, index) => (
                            <div key={index} className={styles.teamCard}>
                                <div className={styles.cardImage}>
                                    <img src={member.photo} alt={member.name} />
                                    <div className={styles.cardOverlay}></div>
                                </div>
                                <div className={styles.cardContent}>
                                    <h3 className={styles.memberName}>
                                        {member.name}
                                    </h3>
                                    <p className={styles.memberRole}>
                                        {member.role}
                                    </p>
                                    <div className={styles.socialLinks}>
                                        <a
                                            href={`mailto:${member.email}`}
                                            aria-label="Email"
                                        >
                                            <FaEnvelope />
                                        </a>
                                        <a
                                            href={member.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="LinkedIn"
                                        >
                                            <FaLinkedin />
                                        </a>
                                        <a
                                            href={member.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="GitHub"
                                        >
                                            <FaGithub />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className={styles.ctaSection}>
                    <h2 className={styles.ctaTitle}>
                        Ready to Transform Your Financial Future?
                    </h2>
                    <Link to="/signup" className={styles.ctaButton}>
                        Get Started Now
                    </Link>
                </section>
            </main>

            {/* Footer */}
            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <div className={styles.footerLogo}>PennyVise</div>
                    <div className={styles.footerLinks}>
                        <Link to="/">Home</Link>
                        <Link to="/about">About</Link>
                        <Link to="/features">Features</Link>
                        <Link to="https://www.linkedin.com/in/vaishnav-mankar">Contact</Link>
                    </div>
                    <div className={styles.footerLegal}>
                        <p>
                            &copy; {new Date().getFullYear()} PennyVise. All
                            rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default About;
