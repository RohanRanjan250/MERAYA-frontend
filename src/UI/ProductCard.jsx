import { ArrowRight } from "lucide-react";
import styles from "./ProductCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const ProductCard = ({ image, title, desc, price }) => {
  return (
    <div className={styles.card}>
      {/* Image */}
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} className={styles.image} />
        <button className={styles.wishlistBtn}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>

      {/* Details */}
      <div className={styles.meta}>
          <p className={styles.desc}>{desc}</p>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.metaBottom}>
          <p className={styles.price}>₹{price}</p>
          <button className={styles.button}>
            Add to Cart ↙
          </button>
        </div>
      </div>
      <hr className={styles.divider} />
    </div>
  );
};

export default ProductCard;
