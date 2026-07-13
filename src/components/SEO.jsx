import { useEffect } from "react";
import { LOGO_URL } from "../utils/cloudinaryImages";

const SITE_URL = "https://meraya.co.in";
const STRUCTURED_DATA_ATTR = "data-seo-structured";

const setMetaTag = (attr, key, content) => {
  let tag = document.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
};

const setLinkTag = (rel, href) => {
  let tag = document.querySelector(`link[rel="${rel}"]`);
  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", rel);
    document.head.appendChild(tag);
  }
  tag.setAttribute("href", href);
};

const clearStructuredData = () => {
  document.querySelectorAll(`script[${STRUCTURED_DATA_ATTR}]`).forEach((el) => el.remove());
};

// Accepts either a single JSON-LD object or an array of them (e.g. a Product
// schema plus a BreadcrumbList schema on the same page) — each gets its own
// <script type="application/ld+json"> tag, which is the pattern Google's own
// docs recommend over combining unrelated types into one block.
const setStructuredData = (data) => {
  clearStructuredData();
  if (!data) return;
  const items = Array.isArray(data) ? data : [data];
  items.forEach((item) => {
    const tag = document.createElement("script");
    tag.type = "application/ld+json";
    tag.setAttribute(STRUCTURED_DATA_ATTR, "true");
    tag.textContent = JSON.stringify(item);
    document.head.appendChild(tag);
  });
};

// Lightweight per-page SEO tag management — avoids pulling in react-helmet
// just to set a handful of tags. Every route previously shared the same
// static title/description/og tags from index.html with no canonical URL
// and no structured data, which hurts both search indexing and how links
// look when shared on WhatsApp/social.
const SEO = ({ title, description, path, image, structuredData, noIndex }) => {
  useEffect(() => {
    const previousTitle = document.title;
    if (title) document.title = `${title} | Meraya`;
    if (description) setMetaTag("name", "description", description);
    setMetaTag("name", "robots", noIndex ? "noindex, nofollow" : "index, follow");

    const canonicalUrl = `${SITE_URL}${path ?? window.location.pathname}`;
    setLinkTag("canonical", canonicalUrl);

    const shareImage = image || LOGO_URL;
    if (title) setMetaTag("property", "og:title", title);
    if (description) setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:url", canonicalUrl);
    setMetaTag("property", "og:image", shareImage);
    setMetaTag("name", "twitter:card", "summary_large_image");
    if (title) setMetaTag("name", "twitter:title", title);
    if (description) setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", shareImage);

    setStructuredData(structuredData);

    return () => {
      document.title = previousTitle;
      clearStructuredData();
      setMetaTag("name", "robots", "index, follow");
    };
  }, [title, description, path, image, structuredData, noIndex]);

  return null;
};

export default SEO;
