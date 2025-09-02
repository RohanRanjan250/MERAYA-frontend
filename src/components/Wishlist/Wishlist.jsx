import React from "react";
import styles from "./Wishlist.module.css";
import ProductCard from "../../UI/ProductCard"; // adjust path as per your folder

const products = [
  {
    image: "https://via.placeholder.com/371x400",
    title: "Piece Title",
    desc: "A placeholder text is a block of nonsensical",
    price: 899,
  },
  {
    image: "https://via.placeholder.com/371x400",
    title: "Piece Title",
    desc: "A placeholder text is a block of nonsensical",
    price: 899,
  },
  {
    image: "https://via.placeholder.com/371x400",
    title: "Piece Title",
    desc: "A placeholder text is a block of nonsensical",
    price: 899,
  },
  {
    image: "https://via.placeholder.com/371x400",
    title: "Piece Title",
    desc: "A placeholder text is a block of nonsensical",
    price: 899,
  },
  {
    image: "https://via.placeholder.com/371x400",
    title: "Piece Title",
    desc: "A placeholder text is a block of nonsensical",
    price: 899,
  },
  {
    image: "https://via.placeholder.com/371x400",
    title: "Piece Title",
    desc: "A placeholder text is a block of nonsensical",
    price: 899,
  },
];

const Wishlist = () => {
  return (
    <>
      <div className={styles.heading}>
        <p className={styles.wishlist}>MY WISHLIST</p>
        <p>{products.length} ITEMS</p>
      </div>
      <div className={styles.container}>
        <div className={styles.grid}>
          {products.map((p, i) => (
            <ProductCard key={i} {...p} />
          ))}
        </div>
      </div>
      <div className={styles.backgroundText}>MERAYA</div>
    </>
  );
};

export default Wishlist;
