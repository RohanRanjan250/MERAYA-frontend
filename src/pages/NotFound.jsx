import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.errorCode}>404</h1>
                <h2 className={styles.title}>Page Not Found</h2>
                <p className={styles.message}>
                    Oops! The page you're looking for doesn't exist.
                </p>
                <p className={styles.submessage}>
                    It might have been moved or deleted.
                </p>
                <div className={styles.buttons}>
                    <button
                        onClick={() => navigate('/')}
                        className={styles.homeBtn}
                    >
                        Go to Home
                    </button>
                    <button
                        onClick={() => navigate(-1)}
                        className={styles.backBtn}
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
