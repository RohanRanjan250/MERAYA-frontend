import React from 'react';
import styles from './TermsOfService.module.css';
import Navbar from '../components/Navbar';
import DoubleLine from '../UI/DoubleLine';
import Footer from '../components/FooterSection/Footer';
import SEO from '../components/SEO';

const TermsOfService = () => {
    return (
        <>
            <SEO title="Terms of Service" description="Meraya terms of service." />
            <Navbar />
            <DoubleLine />
            <div className={styles.container}>
                <div className={styles.backgroundText}>MERAYA</div>

                <div className={styles.content}>
                    <h1 className={styles.mainTitle}>Terms of Service</h1>
                    <p className={styles.lastUpdated}>Last Updated: July 2026</p>

                    {/* Introduction */}
                    <section className={styles.section}>
                        <h2 className={styles.welcomeTitle}>Welcome to Meraya!</h2>
                        <p className={styles.intro}>
                            These Terms of Service ("Terms") govern your access to and use of our website, products, and services. By visiting our website or purchasing from us, you agree to be bound by these Terms. Please read them carefully.
                        </p>
                        <p className={styles.intro}>
                            Meraya is committed to delivering high-quality, hand-crafted Indian ethnic wear, blending tradition with modern aesthetics. Our website and services are designed to provide you with an exceptional shopping experience.
                        </p>
                    </section>

                    {/* Section 1 */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Section 1: Who Can Use Our Services</h2>
                        <div className={styles.card}>
                            <p className={styles.text}>
                                By accessing our website, you confirm that you are of legal age in your jurisdiction or have permission from a legal guardian to use our services. Our products are for personal, non-commercial use, and any misuse or unauthorized access may result in termination of your account.
                            </p>
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Section 2: Your Account</h2>
                        <div className={styles.card}>
                            <p className={styles.text}>
                                To make purchases on our website, you may need to create an account. You agree to provide accurate and up-to-date information and keep your login details secure. You are responsible for any activity under your account.
                            </p>
                            <p className={styles.text}>
                                We reserve the right to suspend or terminate accounts that violate our Terms or engage in fraudulent activities.
                            </p>
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Section 3: Product Information & Availability</h2>
                        <div className={styles.card}>
                            <p className={styles.text}>
                                We strive to ensure that all product details, descriptions, and prices on our website are accurate. However, slight variations may occur due to the handcrafted nature of our products.
                            </p>
                            <p className={styles.text}>
                                Product availability is subject to change without notice. We reserve the right to limit the quantities of any products or services offered.
                            </p>
                        </div>
                    </section>

                    {/* Section 4 */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Section 4: Pricing & Payment</h2>
                        <div className={styles.card}>
                            <p className={styles.text}>
                                All prices listed on our website are in Indian Rupees (INR) and include applicable taxes. We accept various payment methods, including credit/debit cards, UPI, and digital wallets.
                            </p>
                            <p className={styles.text}>
                                We reserve the right to change prices at any time. In case of a pricing error, we will contact you before processing your order.
                            </p>
                        </div>
                    </section>

                    {/* Section 5 */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Section 5: Shipping & Delivery</h2>
                        <div className={styles.card}>
                            <p className={styles.text}>
                                Meraya ships across India and selected international locations. Shipping times and costs will vary based on your location and the selected shipping method.
                            </p>
                            <p className={styles.text}>
                                Once your order is dispatched, we will provide tracking details. While we strive to ensure timely delivery, delays may occur due to unforeseen circumstances.
                            </p>
                        </div>
                    </section>

                    {/* Section 6 */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Section 6: Returns & Exchanges</h2>
                        <div className={styles.card}>
                            <p className={styles.text}>
                                We take pride in our products and aim to deliver the best quality. If you are not satisfied with your purchase, you can request an return within 7 days of delivery.
                            </p>
                            <p className={styles.text}>
                                Products must be unused, with tags intact, and in original packaging. Custom or personalized items are non-returnable.
                            </p>
                            <p className={styles.text}>
                                For more details, please refer to our <a href="/return-policy" className={styles.link}>Return Policy</a>.
                            </p>
                        </div>
                    </section>

                    {/* Section 7 */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Section 7: Privacy & Security</h2>
                        <div className={styles.card}>
                            <p className={styles.text}>
                                Your privacy is important to us. We collect and process your personal information in accordance with our <a href="/privacy-policy" className={styles.link}>Privacy Policy</a>.
                            </p>
                            <p className={styles.text}>
                                We use secure payment gateways and encryption protocols to ensure that your information is protected. However, we cannot guarantee complete security in online communications.
                            </p>
                        </div>
                    </section>

                    {/* Section 8 */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Section 8: Third-Party Services</h2>
                        <div className={styles.card}>
                            <p className={styles.text}>
                                Our website may include links to third-party websites or services. Meraya is not responsible for the content, policies, or practices of these third-party sites.
                            </p>
                            <p className={styles.text}>
                                Your interactions with third-party services are at your own risk.
                            </p>
                        </div>
                    </section>

                    {/* Section 9 */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Section 9: Intellectual Property</h2>
                        <div className={styles.card}>
                            <p className={styles.text}>
                                All content on our website, including text, images, logos, and designs, is the property of Meraya. Unauthorized use, reproduction, or distribution of our content is strictly prohibited.
                            </p>
                            <p className={styles.text}>
                                You may not use our trademarks or branding without our prior written consent.
                            </p>
                        </div>
                    </section>

                    {/* Section 10 */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Section 10: Limitation of Liability</h2>
                        <div className={styles.card}>
                            <p className={styles.text}>
                                Meraya is not liable for any direct, indirect, incidental, or consequential damages resulting from your use of our website or services.
                            </p>
                            <p className={styles.text}>
                                We are not responsible for any delays, interruptions, or errors beyond our reasonable control.
                            </p>
                        </div>
                    </section>

                    {/* Section 11 */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Section 11: Governing Law</h2>
                        <div className={styles.card}>
                            <p className={styles.text}>
                                These Terms are governed by the laws of India. Any disputes will be resolved through arbitration in accordance with the Arbitration and Conciliation Act, 1996, with Mumbai, Maharashtra, as the venue.
                            </p>
                        </div>
                    </section>

                    {/* Section 12 */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Section 12: Changes to Terms</h2>
                        <div className={styles.card}>
                            <p className={styles.text}>
                                We may update these Terms from time to time. The latest version will always be available on our website. Continued use of our services after changes are posted constitutes your acceptance of the revised Terms.
                            </p>
                        </div>
                    </section>

                    {/* Section 13 */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Section 13: Contact Us</h2>
                        <div className={styles.card}>
                            <p className={styles.text}>
                                For any questions about these Terms or our services, please contact us at:
                            </p>
                            <div className={styles.contactDetails}>
                                <p className={styles.contactText}><strong>Meraya Customer Support</strong></p>
                                <p className={styles.contactText}>Email: <a href="mailto:support@meraya.co.in" className={styles.link}>support@meraya.co.in</a></p>
                                <p className={styles.contactText}>Phone: <a href="tel:+919279360532" className={styles.link}>+91 9279360532</a></p>
                            </div>
                        </div>
                    </section>

                    {/* Closing */}
                    <div className={styles.closingBox}>
                        <p className={styles.closingText}>
                            Thank you for choosing Meraya. We are delighted to be a part of your journey in celebrating Indian heritage and style!
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default TermsOfService;
