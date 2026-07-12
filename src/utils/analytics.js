// Thin wrapper around gtag's standard GA4 ecommerce events. These specific
// event names (view_item, add_to_cart, begin_checkout, add_shipping_info,
// add_payment_info, purchase) are what GA4's built-in Purchase Journey
// report keys off of — using the exact names/shape is what makes the
// "where do users drop off" funnel report work out of the box.
const gtagEvent = (eventName, params = {}) => {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
};

export const trackViewItem = (product) => {
  gtagEvent("view_item", {
    currency: "INR",
    value: product.selling_price || 0,
    items: [{
      item_id: String(product.id),
      item_name: product.name,
      price: product.selling_price,
    }],
  });
};

export const trackAddToCart = (product, variant, quantity = 1) => {
  gtagEvent("add_to_cart", {
    currency: "INR",
    value: (product.selling_price || 0) * quantity,
    items: [{
      item_id: String(product.id),
      item_name: product.name,
      item_variant: variant,
      price: product.selling_price,
      quantity,
    }],
  });
};

const cartItemsToGaItems = (cartItems) =>
  (cartItems || []).map((item) => ({
    item_id: String(item.product_id),
    item_name: item.name,
    item_variant: item.variant,
    price: item.price,
    quantity: item.quantity,
  }));

export const trackBeginCheckout = (cartItems, total) => {
  gtagEvent("begin_checkout", { currency: "INR", value: total, items: cartItemsToGaItems(cartItems) });
};

export const trackAddShippingInfo = (cartItems, total) => {
  gtagEvent("add_shipping_info", { currency: "INR", value: total, items: cartItemsToGaItems(cartItems) });
};

export const trackAddPaymentInfo = (cartItems, total) => {
  gtagEvent("add_payment_info", { currency: "INR", value: total, items: cartItemsToGaItems(cartItems) });
};

export const trackPurchase = (orderId, cartItems, total) => {
  gtagEvent("purchase", {
    transaction_id: String(orderId),
    currency: "INR",
    value: total,
    items: cartItemsToGaItems(cartItems),
  });
};
