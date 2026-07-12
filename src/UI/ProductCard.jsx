import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "./ProductCard.module.css";

const ProductCard = ({ id, image, title, desc, price, showPrice, onRemove, onAddToCart, onBuyNow, variant, stock, showRemove = true, showAddToCart = true }) => {
  const isOutOfStock = stock !== undefined && stock === 0;

  return (
    <div className={styles.card} onClick={!isOutOfStock ? onBuyNow : undefined}>
      {/* Image */}
      <div className={styles.imageWrapper}>
        <img
          src={image}
          alt={title}
          className={`${styles.image} ${isOutOfStock ? styles.outOfStockImage : ''}`}
        />
        {showRemove && onRemove && (
          <button
            className={styles.wishlistBtn}
            onClick={(e) => {
              e.stopPropagation();
              onRemove(id);
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        )}
        {isOutOfStock && (
          <div className={styles.outOfStockOverlay}>
            <span className={styles.outOfStockText}>OUT OF STOCK</span>
          </div>
        )}
      </div>

      {/* Details */}
      <div className={styles.meta}>
        <p className={styles.desc}>{desc}</p>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.metaBottom}>
          <div className={styles.priceRow}>
            {showPrice && showPrice > price && (
              <span className={styles.showPrice}>₹{showPrice}</span>
            )}
            <p className={styles.price}>₹{price}</p>
          </div>
          {showAddToCart && (
            <button
              className={styles.button}
              onClick={(e) => {
                e.stopPropagation();
                if (!isOutOfStock) {
                  onAddToCart(id, variant);
                }
              }}
              disabled={isOutOfStock}
              style={{
                opacity: isOutOfStock ? 0.5 : 1,
                cursor: isOutOfStock ? 'not-allowed' : 'pointer'
              }}
            >
              {isOutOfStock ? 'Out of Stock' : 'Add to Cart ↙'}
            </button>
          )}
        </div>
      </div>
      <hr className={styles.divider} />
    </div>
  );
};

export default ProductCard;
