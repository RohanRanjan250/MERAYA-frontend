import React from 'react';
import styles from './PrivacyPolicy.module.css';
import Navbar from '../components/Navbar';
import DoubleLine from '../UI/DoubleLine';
import Footer from '../components/FooterSection/Footer';
import SEO from '../components/SEO';

const PrivacyPolicy = () => {
    return (
        <>
            <SEO title="Privacy Policy" description="Meraya privacy policy." />
            <Navbar />
            <DoubleLine />
            <div className={styles.container}>
                <div className={styles.backgroundText}>MERAYA</div>

                <div className={styles.content}>
                    <h1 className={styles.mainTitle}>Privacy Policy</h1>
                    <p className={styles.lastUpdated}>Last Updated: January 2025</p>

                    {/* Introduction */}
                    <section className={styles.section}>
                        <p className={styles.intro}>
                            At Meraya, we value your privacy and are committed to protecting your personal information.
                            This Privacy Policy explains how we collect, use, and safeguard your data when you use our website and services.
                        </p>
                    </section>

                    {/* Information We Collect */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Information We Collect</h2>
                        <div className={styles.card}>
                            <h3 className={styles.subTitle}>Personal Information</h3>
                            <ul className={styles.list}>
                                <li>Name, email address, and phone number</li>
                                <li>Shipping and billing addresses</li>
                                <li>Payment information (processed securely through payment gateways)</li>
                                <li>Order history and preferences</li>
                            </ul>

                            <h3 className={styles.subTitle}>Automatically Collected Information</h3>
                            <ul className={styles.list}>
                                <li>IP address and browser type</li>
                                <li>Device information and operating system</li>
                                <li>Cookies and usage data</li>
                                <li>Pages visited and time spent on our website</li>
                            </ul>
                        </div>
                    </section>

                    {/* How We Use Your Information */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>How We Use Your Information</h2>
                        <div className={styles.card}>
                            <ul className={styles.list}>
                                <li>Process and fulfill your orders</li>
                                <li>Send order confirmations and shipping updates</li>
                                <li>Provide customer support</li>
                                <li>Send promotional emails (with your consent)</li>
                                <li>Improve our website and services</li>
                                <li>Prevent fraud and enhance security</li>
                            </ul>
                        </div>
                    </section>

                    {/* Data Sharing */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Data Sharing & Disclosure</h2>
                        <div className={styles.card}>
                            <p className={styles.cardText}>
                                We do not sell your personal information. We may share your data with:
                            </p>
                            <ul className={styles.list}>
                                <li><strong>Service Providers:</strong> Payment processors, shipping partners, and email services</li>
                                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                                <li><strong>Business Transfers:</strong> In case of merger, acquisition, or sale of assets</li>
                            </ul>
                        </div>
                    </section>

                    {/* Cookies */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Cookies & Tracking</h2>
                        <div className={styles.card}>
                            <p className={styles.cardText}>
                                We use cookies to enhance your browsing experience. You can control cookies through your browser settings.
                            </p>
                            <ul className={styles.list}>
                                <li><strong>Essential Cookies:</strong> Required for website functionality</li>
                                <li><strong>Analytics Cookies:</strong> Help us understand user behavior</li>
                                <li><strong>Marketing Cookies:</strong> Used for personalized advertising</li>
                            </ul>
                        </div>
                    </section>

                    {/* Your Rights */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Your Rights</h2>
                        <div className={styles.card}>
                            <ul className={styles.list}>
                                <li><strong>Access:</strong> Request a copy of your personal data</li>
                                <li><strong>Correction:</strong> Update or correct your information</li>
                                <li><strong>Deletion:</strong> Request deletion of your data</li>
                                <li><strong>Opt-Out:</strong> Unsubscribe from marketing emails</li>
                                <li><strong>Data Portability:</strong> Receive your data in a portable format</li>
                            </ul>
                        </div>
                    </section>

                    {/* Data Security */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Data Security</h2>
                        <div className={styles.card}>
                            <p className={styles.cardText}>
                                We implement industry-standard security measures to protect your data, including:
                            </p>
                            <ul className={styles.list}>
                                <li>SSL encryption for data transmission</li>
                                <li>Secure payment processing</li>
                                <li>Regular security audits</li>
                                <li>Access controls and authentication</li>
                            </ul>
                        </div>
                    </section>

                    {/* Contact Section */}
                    <section className={styles.contactSection}>
                        <h3 className={styles.contactTitle}>Questions About Privacy?</h3>
                        <p className={styles.contactText}>
                            If you have any questions or concerns about our Privacy Policy, please contact us at{' '}
                            <a href="mailto:privacy@meraya.com" className={styles.link}>privacy@meraya.com</a>
                        </p>
                    </section>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PrivacyPolicy;
