import React from 'react';
import styles from './ShippingPolicy.module.css';
import Navbar from '../components/Navbar';
import DoubleLine from '../UI/DoubleLine';
import Footer from '../components/FooterSection/Footer';
import SEO from '../components/SEO';

const ShippingPolicy = () => {
    return (
        <>
            <SEO title="Shipping Policy" description="Meraya shipping policy." />
            <Navbar />
            <DoubleLine />
            <div className={styles.container}>
                <div className={styles.backgroundText}>SHIPPING</div>

                <div className={styles.content}>
                    <h1 className={styles.mainTitle}>Shipping & Delivery Policy</h1>
                    <p className={styles.lastUpdated}>Last Updated: January 2025</p>

                    {/* Shipping Timeline */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>What is your Shipping Timeline?</h2>
                        <div className={styles.card}>
                            <p className={styles.text}>
                                All products are dispatched from our warehouse within <strong>24-48 hours</strong> and would take <strong>2 to 7 working days</strong> depending on the pincode to be delivered.
                            </p>
                            <p className={styles.text}>
                                Working Days are Monday - Friday so the shipping timeline does not include the weekend. Once the order is dispatched from our warehouse, tracking details will be emailed to you on your registered email.
                            </p>
                            <p className={styles.highlight}>
                                ⚠️ Please do not accept a parcel if it is tampered as we will not be responsible for it.
                            </p>
                        </div>
                    </section>

                    {/* Reverse Pickup */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Do you offer reverse pickup for exchanges?</h2>
                        <div className={styles.card}>
                            <p className={styles.text}>
                                Yes, we do offer reverse pickup for eligible items' exchanges within India.
                            </p>
                            <p className={styles.text}>
                                Sometimes, for some addresses, reverse pickup facility may not be available. In that case we may ask you to ship the product back to us at your own cost and risk.
                            </p>
                        </div>
                    </section>

                    {/* Tracking Details */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Where are my tracking details?</h2>
                        <div className={styles.card}>
                            <p className={styles.text}>
                                As soon as the order is shipped from our warehouse, you will receive a WhatsApp/email message with tracking details.
                            </p>
                        </div>
                    </section>

                    {/* Shipping Charges */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>What are your shipping charges?</h2>
                        <div className={styles.card}>
                            <p className={styles.freeShipping}>
                                🎉 We offer <strong>FREE SHIPPING</strong> on all orders!
                            </p>
                        </div>
                    </section>

                    {/* Contact Section */}
                    <section className={styles.section}>
                        <div className={styles.contactBox}>
                            <h3 className={styles.contactTitle}>Need Help?</h3>
                            <p className={styles.text}>
                                If you have any questions about shipping or delivery, please contact our customer support team.
                            </p>
                            <a href="/contact" className={styles.contactButton}>Contact Us</a>
                        </div>
                    </section>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ShippingPolicy;
