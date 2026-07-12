import React, { useState } from 'react';
import styles from './ContactUs.module.css';
import Navbar from '../components/Navbar';
import DoubleLine from '../UI/DoubleLine';
import Footer from '../components/FooterSection/Footer';
import SEO from '../components/SEO';
import { useToast } from '../Context/ToastContext';
import API from '../API/instance';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { showToast } = useToast();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.name || !formData.email || !formData.message) {
            showToast('Please fill in all fields', 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showToast('Please enter a valid email', 'error');
            return;
        }

        setIsSubmitting(true);

        try {
            await API.post('/contact/submit/', formData);

            showToast('Message sent successfully! We\'ll get back to you soon.', 'success');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            showToast(error.response?.data?.error || 'Failed to send message. Please try again.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <SEO title="Contact Us" description="Get in touch with the Meraya team." />
            <Navbar />
            <DoubleLine />
            <div className={styles.container}>
                <div className={styles.backgroundText}>MERAYA</div>

                <div className={styles.content}>
                    <h1 className={styles.mainTitle}>Contact Us</h1>
                    <p className={styles.subtitle}>We'd love to hear from you</p>

                    <div className={styles.contactGrid}>
                        {/* Corporate Office */}
                        <div className={styles.card}>
                            <div className={styles.iconWrapper}>
                                <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className={styles.cardTitle}>Corporate Office</h3>
                            <p className={styles.cardText}>
                                Sai Serenity,<br />
                                Dwaraka Nagar, Banashankari,<br />
                                Bengaluru, Karnataka-560085
                            </p>
                        </div>

                        {/* Email */}
                        <div className={styles.card}>
                            <div className={styles.iconWrapper}>
                                <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className={styles.cardTitle}>Email</h3>
                            <a href="mailto:support@meraya.com" className={styles.link}>
                                support@meraya.co.in
                            </a>
                        </div>

                        {/* Phone */}
                        <div className={styles.card}>
                            <div className={styles.iconWrapper}>
                                <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <h3 className={styles.cardTitle}>Phone</h3>
                            <a href="tel:+919279360532" className={styles.link}>
                                +91 9279360532
                            </a>
                        </div>

                        {/* Opening Hours */}
                        <div className={styles.card}>
                            <div className={styles.iconWrapper}>
                                <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className={styles.cardTitle}>Opening Hours</h3>
                            <p className={styles.cardText}>
                                Mon to Sat<br />
                                10:30 AM - 6:30 PM
                            </p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className={styles.formSection}>
                        <h2 className={styles.formTitle}>Send Us a Message</h2>
                        <form onSubmit={handleSubmit} className={styles.contactForm}>
                            <div className={styles.formGroup}>
                                <label htmlFor="name" className={styles.formLabel}>Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={styles.formInput}
                                    placeholder="Your name"
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="email" className={styles.formLabel}>Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={styles.formInput}
                                    placeholder="your.email@example.com"
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="message" className={styles.formLabel}>Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className={styles.formTextarea}
                                    placeholder="How can we help you?"
                                    rows="6"
                                    disabled={isSubmitting}
                                />
                            </div>

                            <button
                                type="submit"
                                className={styles.submitButton}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                            </button>
                        </form>
                    </div>

                    {/* Additional Info */}
                    <div className={styles.infoBox}>
                        <h2 className={styles.infoTitle}>Get in Touch</h2>
                        <p className={styles.infoText}>
                            Have questions about our products, shipping, or returns? Our customer support team is here to help!
                            Feel free to reach out via email or phone during our business hours.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ContactUs;
