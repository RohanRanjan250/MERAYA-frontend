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
                        We want you to love what you wear from Meraya. If something isn't quite right, we're here to help.
                    </p>

                    {/* Returns Section */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Returns</h2>
                        <div className={styles.card}>
                            <ul className={styles.list}>
                                <li>Returns can be requested within <strong>7 days of receiving your order</strong>.</li>
                                <li>We currently do not offer refunds to the original payment method.</li>
                                <li>Once your returned product passes our quality check, you'll receive the amount as <strong>Meraya Store Credit</strong>, which can be used on any future purchase.</li>
                                <li>A <strong>₹150 handling and shipping fee</strong> will be deducted from the store credit issued for every return.</li>
                            </ul>
                        </div>
                    </section>

                    {/* Exchanges Section */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Exchanges</h2>
                        <div className={styles.card}>
                            <ul className={styles.list}>
                                <li>Need a different size? We've got you.</li>
                                <li>Size exchanges can be requested within <strong>7 days of delivery</strong>, subject to availability.</li>
                                <li>A <strong>₹150 shipping charge</strong> will apply for every exchange request.</li>
                                <li>If the requested size is unavailable, we'll issue the product value as Meraya Store Credit instead.</li>
                            </ul>
                        </div>
                    </section>

                    {/* Conditions Section */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Return & Exchange Conditions</h2>
                        <div className={styles.card}>
                            <ul className={styles.list}>
                                <li>Products must be <strong>unused, unwashed</strong>, and in their original condition, with all tags and packaging intact.</li>
                                <li>Items that show signs of wear, washing, damage, or alterations will not be eligible for return or exchange.</li>
                                <li>Products purchased during special sales, clearance events, or marked as <strong>Final Sale</strong> cannot be returned or exchanged unless they arrive damaged or incorrect.</li>
                            </ul>
                        </div>
                    </section>

                    {/* Damaged or Defective Items Section */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Damaged or Defective Items</h2>
                        <div className={styles.card}>
                            <p className={styles.cardText}>
                                If you receive a damaged, defective, or incorrect item, please contact us within{' '}
                                <strong>48 hours of delivery</strong> with your order number and clear photos at{' '}
                                <a href="mailto:support@meraya.co.in" className={styles.link}>support@meraya.co.in</a>,
                                and we'll make it right immediately.
                            </p>
                        </div>
                    </section>

                    <p className={styles.intro}>
                        Thank you for supporting Meraya. Every piece is thoughtfully made, and we truly appreciate
                        your patience and understanding as a growing brand.
                    </p>

                    {/* Contact Section */}
                    <section className={styles.contactSection}>
                        <h3 className={styles.contactTitle}>Need Help?</h3>
                        <p className={styles.contactText}>
                            For any questions or to initiate a return/exchange, please contact us at{' '}
                            <a href="mailto:support@meraya.co.in" className={styles.link}>support@meraya.co.in</a>
                        </p>
                    </section>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ReturnPolicy;
