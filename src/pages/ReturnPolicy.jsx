import React from 'react';
import styles from './ReturnPolicy.module.css';
import Navbar from '../components/Navbar';
import DoubleLine from '../UI/DoubleLine';
import Footer from '../components/FooterSection/Footer';
import SEO from '../components/SEO';

const ReturnPolicy = () => {
    return (
        <>
            <SEO title="Return Policy" description="Meraya return policy." />
            <Navbar />
            <DoubleLine />
            <div className={styles.container}>
                <div className={styles.backgroundText}>MERAYA</div>

                <div className={styles.content}>
                    <h1 className={styles.mainTitle}>Meraya Return & Exchange Policy 💌</h1>
                    <p className={styles.intro}>
                        We want you to be happy with your Meraya purchase, but in case something doesn't work out,
                        here's how returns & exchanges work:
                    </p>

                    {/* Returns Section */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Returns</h2>
                        <div className={styles.card}>
                            <ul className={styles.list}>
                                <li>Returns are accepted within <strong>7 days of delivery</strong>.</li>
                                <li>A flat shipping fee of <strong>₹149</strong> will be deducted to cover logistics.</li>
                            </ul>

                            <h3 className={styles.subTitle}>Refund Options:</h3>
                            <div className={styles.options}>
                                <div className={styles.option}>
                                    <span className={styles.optionIcon}>💳</span>
                                    <div>
                                        <h4>Store Credit</h4>
                                        <p>Full value after deduction, valid on your next order</p>
                                    </div>
                                </div>
                                <div className={styles.option}>
                                    <span className={styles.optionIcon}>💰</span>
                                    <div>
                                        <h4>Refund to Original Payment Method</h4>
                                        <p>After deducting the ₹149 fee</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Exchanges Section */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Exchanges</h2>
                        <div className={styles.card}>
                            <ul className={styles.list}>
                                <li>Exchanges are available for <strong>size or style</strong>.</li>
                                <li>A flat shipping fee of <strong>₹149</strong> will be charged/deducted.</li>
                                <li>Once we receive the product back, your new piece will be shipped out.</li>
                            </ul>
                        </div>
                    </section>

                    {/* Conditions Section */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Conditions</h2>
                        <div className={styles.card}>
                            <ul className={styles.list}>
                                <li>Items must be <strong>unworn, unused</strong>, with all original tags and packaging intact.</li>
                                <li>Requests must be raised within <strong>7 days of delivery</strong>.</li>
                            </ul>
                        </div>
                    </section>

                    {/* Contact Section */}
                    <section className={styles.contactSection}>
                        <h3 className={styles.contactTitle}>Need Help?</h3>
                        <p className={styles.contactText}>
                            For any questions or to initiate a return/exchange, please contact us at{' '}
                            <a href="mailto:support@meraya.com" className={styles.link}>support@meraya.com</a>
                        </p>
                    </section>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ReturnPolicy;
