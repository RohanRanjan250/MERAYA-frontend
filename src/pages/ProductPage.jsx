import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import DoubleLine from "../UI/DoubleLine";
import Footer from "../components/FooterSection/Footer";
import Product from "../components/Product/Product";
import RelatedProducts from "../components/RelatedProduct/RelatedProduct";
import { buyProduct } from "../API/productmainpageAPI";
import { useParams } from "react-router-dom";
import SEO from "../components/SEO";

export default function ProductPage() {
  const { slug } = useParams(); // get slug from URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await buyProduct(slug);
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    }
    fetchProduct();
  }, [slug]);

  if (!product) return <p>Loading...</p>; // show loading until product fetched

  return (
    <>
      <SEO title={product.name} description={product.description?.slice(0, 150)} />
      <Navbar />
      <DoubleLine />
      <Product product={product} setProduct={setProduct} />
      <RelatedProducts heading="RELATED PRODUCTS" collectionId={product.collection_id} />
      <Footer />
    </>
  );
}
