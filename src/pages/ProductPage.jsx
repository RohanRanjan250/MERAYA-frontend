import React, { useEffect, useMemo, useState } from "react";
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
    // Navigating here from Related/You May Also Like is client-side routing on
    // the same route, so the scroll position carries over from wherever the
    // user clicked — without this, the page content changes underneath them
    // with no visual cue that a different product just loaded.
    window.scrollTo({ top: 0, behavior: "smooth" });

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

  // Hooks must run unconditionally on every render, so this is computed
  // before the "still loading" early return below rather than after it.
  const canonicalPath = product ? `/product/${product.slug}` : null;

  // Review like/dislike clicks call setProduct with a new object reference on
  // every click (see Product.jsx's optimistic reaction handler), which would
  // otherwise rebuild this array and re-run SEO's structured-data effect on
  // every single click. Memoizing on the actual underlying values (not the
  // product/reviews object references) means it only recomputes when
  // something that genuinely changes the schema output changes.
  const reviewCount = product?.reviews?.length || 0;
  const totalStock = (product?.variants || []).reduce((sum, v) => sum + (v.stock || 0), 0);
  const structuredData = useMemo(() => {
    if (!product) return null;
    const productUrl = `https://meraya.co.in${canonicalPath}`;
    const averageRating = reviewCount
      ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount
      : null;

    return [
      {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.description,
        image: product.images || [],
        url: productUrl,
        offers: {
          "@type": "Offer",
          url: productUrl,
          priceCurrency: "INR",
          price: product.selling_price,
          availability: totalStock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        },
        ...(reviewCount > 0 && {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: averageRating.toFixed(1),
            reviewCount,
          },
        }),
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://meraya.co.in/" },
          { "@type": "ListItem", position: 2, name: "Products", item: "https://meraya.co.in/products" },
          { "@type": "ListItem", position: 3, name: product.name, item: productUrl },
        ],
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    canonicalPath,
    product?.name,
    product?.description,
    product?.selling_price,
    totalStock,
    reviewCount,
  ]);

  if (!product) return <p>Loading...</p>; // show loading until product fetched

  return (
    <>
      <SEO
        title={product.name}
        description={product.description?.slice(0, 150)}
        path={canonicalPath}
        image={product.images?.[0]}
        structuredData={structuredData}
      />
      <Navbar />
      <DoubleLine />
      <Product key={product.id} product={product} setProduct={setProduct} />
      <RelatedProducts heading="YOU MAY ALSO LIKE" showAll />
      <Footer />
    </>
  );
}
