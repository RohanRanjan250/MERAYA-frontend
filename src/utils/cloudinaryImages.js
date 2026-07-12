// Cloudinary-hosted copies of frequently reused local assets. Each has an
// onError fallback to the bundled local asset wherever it's rendered.
export const LOGIN_PHOTO_URL = "https://res.cloudinary.com/dx2u1zlph/image/upload/v1783450266/login_wkicld.png";
export const LOGO_URL = "https://res.cloudinary.com/dx2u1zlph/image/upload/v1783450265/image_hkkjcw.png";
export const PROFILE_SIDE_URL = "https://res.cloudinary.com/dx2u1zlph/image/upload/v1783450269/ProfileSide_rykn4o.png";
export const RETURN_URL = "https://res.cloudinary.com/dx2u1zlph/image/upload/v1783450265/return_asvwax.png";
export const SUCCESS_URL = "https://res.cloudinary.com/dx2u1zlph/image/upload/v1783450266/Success_ls4rxr.png";
export const SAD_URL = "https://res.cloudinary.com/dx2u1zlph/image/upload/v1783450266/sad_tdzj2t.png";

export const onImgError = (fallback) => (e) => {
  e.target.onerror = null;
  e.target.src = fallback;
};

// Product photos are uploaded to Cloudinary as-is (no resizing/compression),
// so a listing page can end up loading several multi-megabyte originals at
// once. Cloudinary supports transforming any existing delivery URL on the
// fly just by inserting a transformation segment after "/upload/" — no
// re-upload needed, and it works retroactively on every image already
// uploaded. f_auto picks WebP/AVIF when the browser supports it, q_auto
// compresses with no visible quality loss, w_{width} caps it to the size
// it's actually displayed at instead of shipping the full original.
export const optimizeImage = (url, width = 500) => {
  if (!url || typeof url !== "string" || !url.includes("/upload/")) return url;
  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
};
