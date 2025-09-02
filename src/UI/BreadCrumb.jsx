import React from "react";
import styles from "./BreadCrumb.module.css";

const BreadCrumb = ({ items }) => {
  return (
    <nav className={styles.breadcrumb}>
      {items.map((item, index) => (
        <span key={index} className={styles.item}>
          {item.link ? (
            <a href={item.link} className={styles.link}>
              {item.label}
            </a>
          ) : (
            <span className={styles.current}>{item.label}</span>
          )}
          {index < items.length - 1 && <span className={styles.separator}>›</span>}
        </span>
      ))}
    </nav>
  );
};

export default BreadCrumb;
