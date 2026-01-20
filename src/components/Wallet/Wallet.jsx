import React, { useEffect, useState } from "react";
import styles from "./Wallet.module.css";
import { useNavigate } from "react-router-dom";
import { getWallet } from "../../API/walletAPI";

const Wallet = () => {
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    let isAuth = JSON.parse(localStorage.getItem("isAuthenticated"));

    useEffect(() => {
        if (!isAuth) {
            navigate("/login");
        }
    }, [isAuth, navigate]);

    const loadWallet = async () => {
        try {
            const data = await getWallet();
            setBalance(data.balance || 0);
            setTransactions(data.transactions || []);
        } catch (err) {
            console.error("Error fetching wallet:", err);
            if (err?.error === "Authentication required") {
                navigate("/login");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadWallet();
    }, []);

    if (loading) {
        return (
            <div className={styles.loading}>
                Loading wallet...
            </div>
        );
    }

    return (
        <>
            <div className={styles.heading}>
                <p className={styles.walletTitle}>MY WALLET</p>
            </div>

            <div className={styles.container}>
                {/* Balance Card */}
                <div className={styles.balanceCard}>
                    <div className={styles.balanceLabel}>TOTAL MERAYA POINTS</div>
                    <div className={styles.balanceAmount}>₹{balance.toFixed(2)}</div>
                </div>

                {/* Transactions Section */}
                <div className={styles.transactionsSection}>
                    <h2 className={styles.sectionTitle}>TRANSACTION HISTORY</h2>

                    {transactions.length === 0 ? (
                        <div className={styles.noTransactions}>
                            <p>No transactions yet</p>
                        </div>
                    ) : (
                        <div className={styles.transactionsList}>
                            {transactions.map((txn) => (
                                <div key={txn.id} className={styles.transactionItem}>
                                    <div className={styles.transactionLeft}>
                                        <div className={styles.transactionReason}>{txn.reason}</div>
                                        <div className={styles.transactionDate}>{txn.date}</div>
                                    </div>
                                    <div className={styles.transactionRight}>
                                        <div
                                            className={`${styles.transactionAmount} ${txn.type === 'credit' ? styles.credit : styles.debit
                                                }`}
                                        >
                                            {txn.type === 'credit' ? '+' : '-'}₹{Math.abs(txn.amount).toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.backgroundText}>MERAYA</div>
        </>
    );
};

export default Wallet;
