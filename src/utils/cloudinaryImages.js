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
