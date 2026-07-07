import { useEffect } from "react";

const setMetaDescription = (content) => {
  let tag = document.querySelector('meta[name="description"]');
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", "description");
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
};

// Lightweight per-page title/description management — avoids pulling in
// react-helmet just to set two tags. Every route previously shared the
// same static <title>Meraya</title>, which hurts search indexing and
// social link previews for a public storefront.
const SEO = ({ title, description }) => {
  useEffect(() => {
    const previousTitle = document.title;
    if (title) document.title = `${title} | Meraya`;
    if (description) setMetaDescription(description);

    return () => {
      document.title = previousTitle;
    };
  }, [title, description]);

  return null;
};

export default SEO;
