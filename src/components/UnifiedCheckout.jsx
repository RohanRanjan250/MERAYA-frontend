import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCart, changeCartQuantity, removeFromCart, checkDeliveryAvailability } from "../API/cart"
import { getUserAddress } from "../API/myaccountAPI"
import { OrderCreate, verifyPayment } from "../API/orderAPI"
import styles from "./OrderConfirmed/OrderConfirmed.module.css"
import successFallback from "../assets/sad.png"
import { useToast } from "../Context/ToastContext";
import API from "../API/instance";
import { SAD_URL, onImgError } from "../utils/cloudinaryImages";
import { isLoggedIn } from "../utils/authCookie";

const success = SAD_URL;

// --- Embedded Reusable Components ---
// In a real project, these would be in their own files and imported.

const CartItems = ({ items, onQuantityChange, onRemove, onBuyNow }) => {
  return (
    <div className="cartItems">
      {items.map((item) => {
        const isAtStockLimit = item.stock && item.quantity >= item.stock;

        return (
          <div key={item.id} className="item">
            <img
              src={item.image[0] || "https://via.placeholder.com/150"}
              alt={item.name}
              className="image"
              onClick={() => onBuyNow(item.slug)}
            />
            <div className="details">
              <h3>{item.name}</h3>
              <div className="sizeLabel">
                <p className="Size">SIZE </p>
                <span className="whiteLine"></span>
                <p className="selectedSize">{item.variant}</p>
              </div>
              {item.stock !== undefined && (
                <p className="stockInfo" style={{
                  fontSize: '0.85rem',
                  color: item.stock < 5 ? '#ff6b6b' : '#888',
                  marginTop: '0.5rem'
                }}>
                  {item.stock < 5 ? `Only ${item.stock} left in stock` : `${item.stock} available`}
                </p>
              )}
              <div className="actions">
                <div className="quantity">
                  <button onClick={() => onQuantityChange(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => onQuantityChange(item.id, 1)}
                    disabled={isAtStockLimit}
                    style={{
                      opacity: isAtStockLimit ? 0.5 : 1,
                      cursor: isAtStockLimit ? 'not-allowed' : 'pointer'
                    }}
                    title={isAtStockLimit ? 'Stock limit reached' : ''}
                  >
                    +
                  </button>
                </div>
                <button className="remove" onClick={() => onRemove(item.id)}>
                  Remove
                </button>
              </div>
            </div>
            <div className="price">₹{item.price.toFixed(2)}</div>
          </div>
        );
      })}
    </div>
  );
};

const OrderSummary = ({
  subtotal,
  discount,
  shipping,
  total,
  deliveryDate,
  label,
  onClick,
  isProcessing,
  couponCode,
  onCouponChange,
  onApplyCoupon,
  onRemoveCoupon,
  couponDiscount,
  appliedCoupon,
  couponError,
  isApplyingCoupon,
  walletBalance = 0,
  useWallet = false,
  setUseWallet = () => { },
  walletDiscount = 0
}) => {
  return (
    <div className="orderSummary">
      <p>Order Summary</p>
      <div className="row">
        <span>Subtotal</span>
        <span>₹{subtotal.toFixed(2)}</span>
      </div>
      <div className="row">
        <span>Discount</span>
        <span>-₹{discount.toFixed(2)}</span>
      </div>
      <div className="row">
        <span>Shipping</span>
        <span className="free">{shipping > 0 ? `₹${shipping.toFixed(2)}` : "Free"}</span>
      </div>
      {appliedCoupon && (
        <div className="row" style={{ color: '#4caf50' }}>
          <span>Coupon ({appliedCoupon.coupon_code})</span>
          <span>-₹{couponDiscount.toFixed(2)}</span>
        </div>
      )}

      {/* Wallet Checkbox */}
      {walletBalance > 0 && (
        <div className="walletSection" style={{
          padding: '12px',
          background: useWallet ? 'rgba(227, 128, 18, 0.15)' : 'rgba(227, 128, 18, 0.05)',
          borderRadius: '8px',
          margin: '12px 0',
          border: useWallet ? '2px solid #e38012' : '1px solid rgba(227, 128, 18, 0.3)',
          transition: 'all 0.3s ease'
        }}>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            fontSize: '14px',
            fontFamily: 'Abel, sans-serif'
          }}>
            <input
              type="checkbox"
              checked={useWallet}
              onChange={(e) => setUseWallet(e.target.checked)}
              style={{
                width: '18px',
                height: '18px',
                cursor: 'pointer',
                accentColor: '#e38012'
              }}
            />
            <span style={{ flex: 1, color: '#333', fontWeight: useWallet ? 'bold' : 'normal' }}>
              Use Meraya Wallet Points
              <div style={{ fontSize: '12px', color: '#666', marginTop: '4px', fontWeight: 'normal' }}>
                Available: ₹{walletBalance.toFixed(2)}
              </div>
            </span>
          </label>
        </div>
      )}

      {useWallet && walletDiscount > 0 && (
        <div className="row" style={{ color: '#4caf50' }}>
          <span>Wallet Discount</span>
          <span>-₹{walletDiscount.toFixed(2)}</span>
        </div>
      )}

      <hr />
      <div className="row total">
        <span>TOTAL</span>
        <span className="totalPrice">₹{total.toFixed(2)}</span>
      </div>
      {/* {total === 1.00 && walletDiscount > 0 && (
        <div style={{ fontSize: '12px', color: '#666', marginTop: '8px', textAlign: 'center' }}>
          Minimum payment of ₹1.00 required
        </div>
      )} */}
      <div className="row">
        <span>Estimated Delivery by</span>
        <span>{deliveryDate}</span>
      </div>
      <div className="couponBox">
        <input
          type="text"
          placeholder="Coupon Code"
          value={couponCode}
          onChange={(e) => onCouponChange(e.target.value.toUpperCase())}
          disabled={appliedCoupon !== null}
        />
        {appliedCoupon ? (
          <button onClick={onRemoveCoupon} style={{ background: '#e53935' }}>
            Remove
          </button>
        ) : (
          <button
            onClick={onApplyCoupon}
            disabled={isApplyingCoupon}
          >
            {isApplyingCoupon ? '...' : 'Apply'}
          </button>
        )}
      </div>
      {couponError && (
        <div style={{ color: '#ff6b6b', fontSize: '0.85rem', marginTop: '0.5rem' }}>
          {couponError}
        </div>
      )}
      <button className="checkoutBtn" onClick={onClick} disabled={isProcessing}>
        {isProcessing ? 'PROCESSING...' : label}
      </button>
      {total === 1.00 && walletDiscount > 0 && (
        <div style={{ fontSize: '12px', color: '#666', marginTop: '8px', textAlign: 'center' }}>
          Minimum payment of ₹1.00 required
        </div>
      )}
    </div>
  );
};

const AddressSelection = ({ addresses, selectedAddress, onSelect, onClick, onRemove }) => {
  return (
    <div className="addressSelection">
      {addresses.map((address) => (
        <div
          key={address.id}
          className={`addressCard ${selectedAddress?.id === address.id ? "active" : ""}`}
          onClick={() => onSelect(address)}
        >
          <div className="left">
            <div className="radio"></div>
            <div>
              <div className="nameRow">
                <h3 className="name">{address.full_name}</h3>
                <span className="tag">{address.tag}</span>
              </div>
              <p className="text">{address.address_line1} {address.address_line2},&nbsp;{address.city}, {address.state} - {address.pincode}</p>
              <p className="text">CONTACT&emsp;&emsp;<span className="phone">{address.phone}</span></p>
            </div>
          </div>
          <div className="actions">
            <button className="editBtn" onClick={onClick}>Edit</button>
            <span className="separator">|</span>
            <button className="removeBtn" onClick={(e) => { e.stopPropagation(); onRemove(address); }}>Remove</button>
          </div>
        </div>
      ))}
      <div className="addNew" onClick={onClick}>
        + Add New Address
      </div>
    </div>
  );
};

const CartSummary = ({ items, address, estimatedDeliveryDate }) => {
  return (
    <div className="cartSummaryContainer">
      {items.map((item) => (
        <div key={item.id} className="itemCard">
          <img src={item.image[0]} alt={item.name} className="image" />
          <div className="details">
            <h3>{item.name}</h3>
            <p className="price">₹{item.price.toFixed(2)}</p>
            <p>
              SIZE <span className="whiteLine"></span><span>{item.variant}</span> &nbsp;&nbsp;
              QUANTITY <span className="whiteLine"></span><span>{String(item.quantity).padStart(2, "0")}</span>
            </p>
            {/* --- DYNAMIC DELIVERY DATE --- */}
            <p className="delivery">
              {estimatedDeliveryDate
                ? `Estimated Delivery by ${estimatedDeliveryDate}`
                : "Estimated delivery: 5–7 business days"}
                {/* "Enter pincode in summary to check delivery date" */}
            </p>
          </div>
        </div>
      ))}
      <div className="addressSection">
        <h3>DELIVERING AT</h3>
        {address ? (
          <>
            <p>{address.full_name} | {address.address_line1} {address.address_line2}</p>
            <p>{address.city}, {address.state} - {address.pincode}</p>
            <p>Mobile Number: {address.phone}</p>
          </>
        ) : <p>No address selected.</p>}
      </div>
    </div>
  );
};

// --- Embedded CSS Styles ---
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Abel&family=Aboreto&display=swap');
    
    .checkoutFlowPage { max-width: 1000px; margin: 0 auto; padding: 1vh; color: #fff; }
    .loading { color: white; text-align: center; font-size: 2rem; padding: 5rem; font-family: 'Abel', sans-serif; }
    .checkoutLayout { display: flex; justify-content: space-between; align-items: flex-start; gap: 20px; }
    .mainContentArea { flex: 1.7; }
    .sidebarArea { flex: 1; }
    .heading { display: flex; justify-content: space-between; align-items: center; padding: 3.5vh 2vw 5vh 2vw; font-family: 'Abel', sans-serif; font-size: 3vh; color: #FBFBFB; margin: 0 auto; }
    .steps { display: flex; align-items: center; gap: 1.5rem; }
    .steps .whiteLine { width: 15vh; height: 2px; background-color: #ffffff; }
    .steps .current { font-weight: 700; -webkit-text-stroke: 0.5px #FBFBFB; color: #FBFBFB; }
    .steps .completed { font-weight: normal; color: #A2A3B1; -webkit-text-stroke: 0; }
    .steps .pending { font-weight: normal; color: #A2A3B1; opacity: 0.6; }

    /* CartItems Styles */
    .cartItems { display: flex; flex-direction: column; gap: 1vh; }
    .item { display: flex; align-items: flex-start; background: transparent; padding: 2vh 0 3vh; border-bottom: 1px solid #D1D1D8; }
    .item .image { width: 120px; height: 160px; object-fit: cover; margin-right: 15px; cursor: pointer; }
    .item .details { flex: 1; }
    .item .details h3 { font-size: 2.2vh; margin: 0; color: #ffffff; font-family: 'Aboreto', sans-serif; }
    .sizeLabel { display: flex; align-items: center; gap: 0.5rem; margin-top: 1vh; font-size: 1rem; }
    .Size { font-size: 1.7vh; margin-bottom: 0.5rem; font-family: 'Abel', sans-serif; color: #BABABA; }
    .sizeLabel .whiteLine { display: inline-block; width: 3vw; height: 0.08vw; background-color: rgba(244, 243, 241, 1); margin-left: 1.5vw; vertical-align: middle; }
    .selectedSize { font-size: 1.7vh; margin-bottom: 0.5rem; font-family: 'Abel', sans-serif; color: #f4f3f1; }
    .actions { display: flex; align-items: center; margin-top: 10px; gap: 15px; }
    .quantity { display: flex; align-items: center; margin: 8px 0; border: 1px solid #A2A3B1; color: #FFFFFF; font-size: large; font-family: 'Abel', sans-serif; }
    .quantity button { width: 5vh; height: 5vh; cursor: pointer; font-size: 3vh; background: none; border: none; color: white; }
    .quantity span { margin: 0 10px; font-weight: 500; }
    .remove { background: none; border: none; color: #e53935; font-size: 14px; cursor: pointer; text-decoration: none; font-family: 'Abel', sans-serif; }
    .price { font-size: 2.2vh; color: #e38012; margin-left: 15px; font-family: 'Abel', sans-serif; }

    /* OrderSummary Styles */
    .orderSummary { background: transparent; color: #ffffff; padding: 0px 2vh 2vh; font-family: 'Abel', sans-serif; }
    .orderSummary p:first-child { font-size: 2rem; margin-bottom: 15px; }
    .row { display: flex; justify-content: space-between; margin-bottom: 2.5vh; font-size: 0.8rem; }
    .orderSummary .heading-summary { color: #A2A3B1; padding: 0; font-size: 1rem; }
    .total { font-weight: bold; font-size: 1.2rem; margin-top: 2.5vh; }
    .totalPrice { color: #4caf50; font-size: 1.2rem; }
    .couponBox { display: flex; gap: 10px; margin: 12px 0; }
    .couponBox input { flex: 1; padding: 8px; border: 1px solid #D1D1D8; background: transparent; color: #fff; font-family: 'Abel', sans-serif; border-radius: 0; }
    .couponBox button { background: transparent; border: none; padding: 8px 14px; color: #fff; cursor: pointer; font-family: 'Abel', sans-serif; }
    .checkoutBtn { width: 100%; padding: 12px; background: #e38012; border: none; color: white; font-weight: bold; font-size: 15px; cursor: pointer; margin-top: 10px; font-family: 'Abel', sans-serif; transition: background-color 0.2s; }
    .checkoutBtn:disabled { background-color: #555; cursor: not-allowed; }
    .free { color: #3AA39F; }
    
    /* AddressSelection Styles */
    .addressSelection { display: flex; flex-direction: column; gap: 1.5rem; color: #fff; font-family: 'Abel', sans-serif; }
    .addressCard { display: flex; justify-content: space-between; align-items: flex-start; padding: 20px 10px; border-bottom: 1px solid #D1D1D8; cursor: pointer; transition: background 0.2s ease; }
    .addressCard.active { background: rgba(227, 128, 18, 0.1); border-left: 3px solid #e38012; }
    .addressCard:hover { background: rgba(255, 255, 255, 0.05); }
    .left { display: flex; gap: 1.5rem; align-items: center; }
    .radio { width: 18px; height: 18px; border: 2px solid #E38012; transition: background-color 0.2s; }
    .addressCard.active .radio { background-color: #E38012; }
    .nameRow { display: flex; align-items: center; gap: 0.5rem; }
    .name { font-size: 2.7vh; font-weight: 600; color: #FFFFFF; }
    .tag { font-size: 1.3vh; padding: 2px 6px; border: 1px solid #3AA39F; border-radius: 4px; color: #3AA39F; margin-left: 8vh; }
    .text { font-size: 1.7vh; color: #A2A3B1; padding: 0.8vh 0vh; }
    .phone { font-size: 1.7vh; color: #FFFFFF; padding: 0.8vh 0vh; }
    .addressCard .actions { display: flex; gap: 0.75rem; font-size: 0.9rem; align-items: center; }
    .editBtn, .removeBtn { background: none; border: none; cursor: pointer; color: #bbb; font-family: 'Abel', sans-serif; }
    .separator { color: #555; }
    .addNew { display: flex; align-items: center; gap: 0.5rem; cursor: pointer; color: #bbb; font-size: 1.2rem; padding: 20px; border: 1px dashed #555; justify-content: center;  }
    .removeBtn {color: #E14B4B;}
    
    /* CartSummary Styles */
    .cartSummaryContainer { color: white; font-family: 'Abel', sans-serif; width: 100%; margin: 0 auto; }
    .itemCard { display: flex; align-items: flex-start; justify-content: space-between; border-bottom: 1px solid #444; padding: 20px 0; position: relative; }
    .itemCard .image { width: 120px; height: auto; object-fit: cover; margin-right: 20px; }
    .itemCard .details { flex: 1; font-size: 14px; }
    .itemCard .details h3 { font-size: 16px; text-transform: uppercase; margin-bottom: 5px; font-family: 'Aboreto', sans-serif; }
    .itemCard .price { color: #e38012; font-size: 16px; font-weight: bold; margin: 5px 0; }
    .delivery { color: #00a99d; font-size: 13px; margin-top: 5px; }
    .itemCard .whiteLine { display: inline-block; width: 3vw; height: 0.08vw; background-color: rgba(244, 243, 241, 1); margin: 0 1.5vw; vertical-align: middle; }
    .addressSection { margin-top: 30px; font-size: 14px; border: 1px solid #444; padding: 20px; border-radius: 8px; }
    .addressSection h3 { text-transform: uppercase; font-size: 16px; margin-bottom: 10px; }

    @media (max-width:1343px){
      .steps .whiteLine {
        width: 40px; /* Shorter line between steps */
      }
    }

    @media (max-width:1105px){
      .heading {
        align-items: flex-start;
        gap: 1rem;
        font-size: 2.5rem;
      }
      
      .steps {
        font-size: 2.5rem;
        gap: 0.5rem;
      }

      .steps .whiteLine {
        width: 40px; /* Shorter line between steps */
      }
    }

    @media (max-width:1005px){
      .checkoutLayout {
        flex-direction: column; /* Stack main content and sidebar */
        }

      .mainContentArea{
        width: 100%;
      }

      .sidebarArea {
        width: 100%;
        margin-top: 2rem;
        border-top: 1px solid #444;
        padding-top: 2rem;
      }

      .item {
        position: relative;
        padding-bottom: 2rem; /* Add space for the price at the bottom */
      }

      .item .image {
        width: 250px;
        height: auto;
      }
      
      .item .details h3 {
        font-size: 2rem;
      }
      
      .item .price {
        
        bottom: 1rem;
        right: 0;
        margin-left: 0;
      }
      
      .addressCard {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }

      .addressCard .actions {
        width: 100%;
        justify-content: flex-end;
      }

      .itemCard .image {
        margin-bottom: 1rem;
      }
    }

    

    @media (max-width: 821px) {
      .checkoutLayout {
        flex-direction: column; /* Stack main content and sidebar */
        }
        

      .mainContentArea{
        width: 100%;
      }
      
      .sidebarArea {
        width: 100%;
        margin-top: 2rem;
        border-top: 1px solid #444;
        padding-top: 2rem;
      }
      
      .heading {
        align-items: flex-start;
        gap: 1rem;
        font-size: 2rem;
      }
      
      .steps {
        font-size: 2rem;
        gap: 0.5rem;
      }

      .steps .whiteLine {
        width: 40px; /* Shorter line between steps */
      }

      .item {
        position: relative;
        padding-bottom: 2rem; /* Add space for the price at the bottom */
      }

      .item .image {
        width: 100px;
        height: 133px;
      }
      
      .item .details h3 {
        font-size: 1rem;
      }
      
      .item .price {
        
        bottom: 1rem;
        right: 0;
        margin-left: 0;
      }
      
      .addressCard {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }

      .addressCard .actions {
        width: 100%;
        justify-content: flex-end;
      }

      .itemCard .image {
        margin-bottom: 1rem;
      }

      
      .${styles.buttons} {
        flex-direction: column;
        align-items: center;
      }
      .${styles.btn}, .${styles.btnn} {
        width: 100%;
      }
    }

    @media (max-width: 688px){
      .heading {
        align-items: flex-start;
        gap: 1rem;
        font-size: 1.5rem;
      }
      
      .steps {
        font-size: 1.5rem;
        gap: 0.5rem;
      }
    }

    @media (max-width: 540px){
      .heading {
        align-items: flex-start;
        gap: 1rem;
        font-size: 1rem;
      }
      
      .steps {
        font-size: 1rem;
        gap: 0.5rem;
      }
    }
  `}</style>
);


// --- The Main "Wizard" Component ---

export default function CheckoutFlow() {
  const [step, setStep] = useState("cart");
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pincode, setPincode] = useState('');
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState(null);
  const [isCheckingPincode, setIsCheckingPincode] = useState(false);

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [useWallet, setUseWallet] = useState(false);
  const [walletDiscount, setWalletDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const { showToast } = useToast();
  let isAuth = isLoggedIn();

  // Fetch wallet balance
  useEffect(() => {
    const fetchWalletBalance = async () => {
      if (isAuth) {
        try {
          const API = (await import("../API/instance")).default;
          const response = await API.get("/wallet/");
          setWalletBalance(response.data.balance || 0);
        } catch (error) {
          console.error("Error fetching wallet balance:", error);
        }
      }
    };
    fetchWalletBalance();
  }, [isAuth]);

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  // Calculate prices based on show_price and selling_price
  const subtotal = cartItems.reduce((acc, item) => acc + (item.show_price * item.quantity), 0);
  const sellingPriceTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discount = subtotal - sellingPriceTotal; // Difference between show_price and selling_price
  const shipping = appliedCoupon?.free_shipping ? 0 : 49; // Flat delivery fee, waived by free-shipping coupons

  // Calculate wallet discount - ALWAYS apply coupon first, then wallet
  useEffect(() => {
    if (useWallet && walletBalance > 0) {
      // Step 1: Calculate amount after coupon discount
      const afterCoupon = sellingPriceTotal - couponDiscount;

      // Step 2: Ensure minimum payment of ₹1.00 (Razorpay minimum)
      const MINIMUM_PAYMENT = 1.00;

      // Step 3: Maximum wallet can cover = afterCoupon - minimum payment
      const maxWalletCanCover = Math.max(0, afterCoupon - MINIMUM_PAYMENT);

      // Step 4: Wallet discount is minimum of (wallet balance, maxWalletCanCover)
      const calculatedWalletDiscount = Math.min(walletBalance, maxWalletCanCover);

      setWalletDiscount(calculatedWalletDiscount);
    } else {
      setWalletDiscount(0);
    }
  }, [useWallet, walletBalance, sellingPriceTotal, couponDiscount]);

  // Calculate final total - ensure it never goes below ₹1.00 (Razorpay minimum)
  const calculatedTotal = sellingPriceTotal - couponDiscount - walletDiscount + shipping;
  const total = Math.max(1.00, calculatedTotal);

  // Re-validate the coupon against the backend whenever the cart total changes.
  // This re-runs ALL of apply_coupon's checks (min order value, active flag,
  // valid window, usage cap) against the current total — not just the
  // discount math — since any of those boundaries can be crossed by adding
  // or removing items after the coupon was first applied. Debounced so rapid
  // +/- clicks don't spam the endpoint.
  useEffect(() => {
    if (!appliedCoupon) return;

    if (cartItems.length === 0) {
      setAppliedCoupon(null);
      setCouponDiscount(0);
      setCouponCode('');
      return;
    }

    // Immediate, synchronous guard for the most common boundary (min order
    // value) — don't wait on a debounced network round-trip for this one,
    // since it's checkable instantly from data we already have.
    if (appliedCoupon.min_order_value && sellingPriceTotal < appliedCoupon.min_order_value) {
      const errMsg = `Minimum order value of ₹${appliedCoupon.min_order_value} required for this coupon.`;
      setAppliedCoupon(null);
      setCouponDiscount(0);
      setCouponCode('');
      setCouponError(errMsg);
      showToast(errMsg, 'error');
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        const response = await API.post('/coupon/apply/', {
          code: appliedCoupon.coupon_code,
          cart_total: sellingPriceTotal,
        });
        setAppliedCoupon(response.data);
        setCouponDiscount(response.data.discount_amount);
      } catch (error) {
        const errMsg = error.response?.data?.error || 'This coupon no longer applies to your cart.';
        setAppliedCoupon(null);
        setCouponDiscount(0);
        setCouponCode('');
        setCouponError(errMsg);
        showToast(errMsg, 'error');
      }
    }, 500);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sellingPriceTotal, cartItems.length]);

  // Function to dynamically load the Razorpay script
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };



  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");

    const loadInitialData = async () => {
      setIsLoading(true);
      try {
        const [cartData, addressData] = await Promise.all([
          fetchCart(),
          getUserAddress(),
        ]);
        setCartItems(cartData.items || []);
        setAddresses(addressData || []);
        if (addressData && addressData.length > 0) {
          setSelectedAddress(addressData[0]);
        }
      } catch (error) {
        console.error("Failed to load checkout data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadInitialData();
  }, []);


  const handleQuantityChange = async (itemId, change) => {
    const action = change === 1 ? "increment" : "decrement";

    // Optimistically update UI
    const previousItems = [...cartItems];
    setCartItems(
      (prevItems) => prevItems.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );

    try {
      if (!isAuth) {
        navigate("/login");
        return;
      }
      await changeCartQuantity(itemId, action);
    } catch (err) {
      console.error("Failed to update quantity:", err);

      // Revert to previous state on error
      setCartItems(previousItems);

      // Show error message if it's a stock limit error
      if (err?.error && err.error.includes("Stock limit")) {
        showToast(err.error, 'error');
      } else if (err?.message) {
        showToast(err.message, 'error');
      } else {
        showToast('Failed to update quantity', 'error');
      }
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      if (!isAuth) {
        navigate("/login");
        return;
      }
      await removeFromCart(itemId);
      setCartItems((prev) => prev.filter((item) => item.id !== itemId));
      showToast('Item removed from cart', 'success');
    } catch (error) {
      console.error("Failed to remove item:", error);
      showToast('Failed to remove item', 'error');
    }
  };

  // Coupon handler function
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code');
      showToast('Please enter a coupon code', 'error');
      return;
    }

    setIsApplyingCoupon(true);
    setCouponError('');

    try {
      const response = await API.post('/coupon/apply/', {
        code: couponCode,
        cart_total: sellingPriceTotal
      });

      const data = response.data;

      setAppliedCoupon(data);
      setCouponDiscount(data.discount_amount);
      showToast(data.message, 'success');
    } catch (error) {
      const errMsg = error.response?.data?.error || 'Failed to apply coupon';
      setCouponError(errMsg);
      showToast(errMsg, 'error');
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  // Remove coupon handler
  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
    setCouponCode('');
    setCouponError('');
    showToast('Coupon removed', 'success');
  };


  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
  };

  const handleBuyNow = (slug) => {
    navigate(`/product/${slug}`);
  };

  // Re-fetches the cart from the backend (source of truth for stock) right
  // before every "proceed" action. Zero-stock items are removed automatically;
  // items whose quantity now exceeds available stock block the user from
  // continuing. This is what catches the race where someone else bought the
  // last unit between this user loading the cart and clicking proceed.
  const validateCartStock = async () => {
    try {
      const freshCart = await fetchCart();
      const freshItems = freshCart.items || [];

      const outOfStock = freshItems.filter((item) => (item.stock ?? 0) <= 0);
      const overStock = freshItems.filter((item) => (item.stock ?? 0) > 0 && item.quantity > item.stock);
      const remaining = freshItems.filter((item) => (item.stock ?? 0) > 0);

      if (outOfStock.length > 0) {
        await Promise.all(outOfStock.map((item) => removeFromCart(item.id).catch(() => {})));
      }

      setCartItems(remaining);

      if (outOfStock.length > 0) {
        const names = outOfStock.map((item) => item.name).join(", ");
        showToast(`${names} ${outOfStock.length > 1 ? "are" : "is"} out of stock and ${outOfStock.length > 1 ? "have" : "has"} been removed from your cart.`, "error");
        return false;
      }

      if (overStock.length > 0) {
        const names = overStock.map((item) => item.name).join(", ");
        showToast(`Not enough stock left for ${names}. Please reduce the quantity before continuing.`, "error");
        return false;
      }

      if (remaining.length === 0) {
        showToast("Your cart is empty.", "error");
        return false;
      }

      return true;
    } catch (error) {
      console.error("Stock validation failed:", error);
      showToast("Could not verify stock availability. Please try again.", "error");
      return false;
    }
  };

  const handleNextStep = async () => {
    const stockOk = await validateCartStock();
    if (!stockOk) return;

    if (step === "cart") {
      setStep("address");
      return;
    }
    if (step === "address") {
      if (!selectedAddress) {
        showToast("Please select a delivery address.", "error");
        return;
      }
      setStep("summary");
      return;
    }
    if (step === "summary") {
      setIsProcessing(true);

      const orderPayload = {
        address_id: selectedAddress.id,
        pincode: pincode || selectedAddress.pincode,
        cart_items: cartItems.map(item => ({
          product_id: item.product_id,
          variant_id: item.variant_id,
          quantity: item.quantity
        })),
        coupon_code: appliedCoupon ? appliedCoupon.coupon_code : null,
        coupon_discount: couponDiscount ? parseFloat(couponDiscount.toFixed(2)) : 0,
        wallet_used: useWallet ? parseFloat(walletDiscount.toFixed(2)) : 0
      };
      console.log(orderPayload)

      try {
        const data = await OrderCreate(orderPayload);

        // Backend now returns the correct amount after wallet discount
        const options = {
          key: data.key,
          amount: data.amount, // This is already calculated with wallet discount on backend
          currency: data.currency,
          name: "Meraya",
          description: "Order Payment",
          order_id: data.razorpay_order_id,
          handler: async function (response) {
            console.log("Payment response received:", response);

            try {
              // Verify payment signature with backend before showing success
              const verificationData = {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                order_id: data.order_id
              };

              const verificationResult = await verifyPayment(verificationData);

              if (verificationResult.success) {
                console.log("Payment verified successfully");
                navigate('/confirmed', {
                  state: { orderId: data.order_id, items: cartItems, total },
                });
              } else {
                console.error("Payment verification failed");
                alert('Payment verification failed. Please contact support.');
              }
            } catch (error) {
              console.error("Payment verification error:", error);
              alert('Payment verification failed. Please contact support with your payment ID: ' + response.razorpay_payment_id);
            }
          },
          modal: {
            ondismiss: function () {
              console.log("Payment modal closed by user");
              setIsProcessing(false);
            }
          },
          prefill: {
            name: selectedAddress.full_name,
            contact: selectedAddress.phone,
          },
          theme: {
            color: "#e38012",
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();

      } catch (error) {
        console.error("Payment initiation failed:", error);
        const errMsg = error.error || error.message || "An unexpected error occurred.";
        showToast(errMsg, "error");
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const nav = () => {
    navigate("/myaccount/address")
  }

  const renderCurrentStepComponent = () => {
    switch (step) {
      case "cart":
        return <CartItems items={cartItems} onQuantityChange={handleQuantityChange} onRemove={handleRemoveItem} onBuyNow={handleBuyNow} />;
      case "address":
        return <AddressSelection addresses={addresses} selectedAddress={selectedAddress} onSelect={handleSelectAddress} onClick={nav} onRemove={(a) => console.log("Remove", a)} />;
      case "summary":
        // --- PASS DATE TO SUMMARY ---
        return <CartSummary items={cartItems} address={selectedAddress} estimatedDeliveryDate={estimatedDeliveryDate} />;
      default: return null;
    }
  };

  const renderStepIndicator = () => {
    const getStepClass = (currentStep) => {
      if (currentStep === step) return "current";
      if (step === 'summary' && currentStep !== 'summary') return "completed";
      if (step === 'address' && currentStep === 'cart') return "completed";
      return "pending";
    };
    return (
      <div className="steps">
        <p className={getStepClass('cart')}>MY CART</p>
        <p className="whiteLine"></p>
        <p className={getStepClass('address')}>ADDRESS</p>
        <p className="whiteLine"></p>
        <p className={getStepClass('summary')}>CART SUMMARY</p>
      </div>
    );
  };

  if (isLoading) {
    return <div className="loading">Loading Checkout...</div>;
  }

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);


  if (!isLoading && totalItems === 0) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>EMPTY!</h2>

        <div className={styles.icon}>
          <img src={success} onError={onImgError(successFallback)} alt="success" className={styles.success}></img>
        </div>

        <p className={styles.thankyou}>
          Your cart looks empty :(
        </p>

        <div className={styles.buttons}>
          <button onClick={() => navigate("/wishlist")} className={styles.btn}>
            ADD FROM WISHLIST
          </button>
          <button onClick={() => navigate("/")} className={styles.btnn}>
            HOME
          </button>
        </div>
      </div>
    )
  }



  return (
    <>
      <Styles />
      <div className="heading">
        {renderStepIndicator()}
        <p>{totalItems} ITEMS</p>
      </div>
      <div className="checkoutFlowPage">
        <div className="checkoutLayout">
          <div className="mainContentArea">{renderCurrentStepComponent()}</div>
          <div className="sidebarArea">
            {/* --- 5. PASS NEW PROPS TO ORDER SUMMARY --- */}
            <OrderSummary
              subtotal={subtotal}
              discount={discount}
              shipping={shipping}
              total={total}
              deliveryDate={estimatedDeliveryDate || "5-7 business days"}
              label="PROCEED TO PAYMENT"
              onClick={handleNextStep}
              isProcessing={isProcessing}
              couponCode={couponCode}
              onCouponChange={setCouponCode}
              onApplyCoupon={handleApplyCoupon}
              onRemoveCoupon={handleRemoveCoupon}
              couponDiscount={couponDiscount}
              appliedCoupon={appliedCoupon}
              couponError={couponError}
              isApplyingCoupon={isApplyingCoupon}
              walletBalance={walletBalance}
              useWallet={useWallet}
              setUseWallet={setUseWallet}
              walletDiscount={walletDiscount}
            />
          </div>
        </div>
      </div>
    </>
  );
}
