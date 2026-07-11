import React, { useState } from "react";
import styles from "./Signup.module.css";
import leftPhotoFallback from "../../assets/login.png";
import { login, emailloginverify, loginWithGoogle } from "../../API/authApi";
import { useNavigate } from "react-router-dom";
import logoFallback from "../../assets/image.png";
import { LOGIN_PHOTO_URL, LOGO_URL, onImgError } from "../../utils/cloudinaryImages";
import { FcGoogle } from "react-icons/fc";
import OtpInput from "./OtpInput";
import { useGoogleLogin } from "@react-oauth/google";
import { useToast } from "../../Context/ToastContext";

const leftPhoto = LOGIN_PHOTO_URL;
const logo = LOGO_URL;

const Login = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    otp: ""
  });

  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  // ✅ OTP box change handler
  const handleOtpChange = (val) => {
    setFormData({ ...formData, otp: val });
    setError("");
  };

  const handleSendOtp = async () => {
    // Show OTP input immediately
    setOtpSent(true);

    try {
      const response = await emailloginverify(formData.email);
      if (response.status === 200) {
        console.log("OTP sent");
        showToast('OTP sent successfully! Check your email', 'success');
      } else {
        console.log("Unexpected response", response);
        showToast('Failed to send OTP', 'error');
        setOtpSent(false); // Hide OTP input on failure
      }
    } catch (err) {
      console.error("OTP send failed", err);
      setError(err.message || "Failed to send OTP. Try again!");
      showToast(err.message || 'Failed to send OTP', 'error');
      setOtpSent(false); // Hide OTP input on failure
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(formData);
      if (data.status === 200) {
        showToast('Login successful!', 'success');
        navigate("/");
        setError("");
      } else if (data.status === 400) {
        const errorMsg = data.message || "Invalid OTP or Email not registered";
        setError(errorMsg);
        showToast(errorMsg, 'error');
      }
    } catch (err) {
      const errorMsg = err.message || "Something went wrong. Try again!";
      setError(errorMsg);
      showToast(errorMsg, 'error');
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await loginWithGoogle(tokenResponse.access_token);
        if (response.status === 200) {
          const isNewUser = response.data?.message === "Signup successful";
          showToast(isNewUser ? "Account created — welcome!" : "Login successful!", "success");
          navigate("/");
        }
      } catch (err) {
        console.error("Google Login failed:", err);
        showToast('Google login failed', 'error');
      }
    },
    onError: () => {
      console.error("Google Login Failed");
    },
  });

  return (
    <div className={styles.container}>
      {/* Left Side */}
      <div className={styles.left}>
        <img src={leftPhoto} onError={onImgError(leftPhotoFallback)} alt="Meerya Logo" className={styles.leftPhoto} />
      </div>

      {/* Right Side */}
      <div className={styles.right}>
        <img src={logo} onError={onImgError(logoFallback)} alt="Meerya Logo" className={styles.logo} />
        <h2 className={styles.heading}>LOGIN</h2>
        <button className={styles.googleBtn} onClick={() => googleLogin()}>
          <FcGoogle className={styles.icon} />
          <span>Sign up with Google</span>
        </button>

        <div className={styles.divider}>
          <span className={styles.or}>Or</span>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {/* Email input */}
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Ex: name@gmail.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {!otpSent ? (
            <button type="button" onClick={handleSendOtp}>
              SEND VERIFICATION CODE
            </button>
          ) : (
            <>
              {/* ✅ OTP Styled Boxes */}
              <OtpInput value={formData.otp} onChange={handleOtpChange} />
              <button type="submit">LOGIN</button>
            </>
          )}

          <p className={styles.error}>{error}</p>

          <p className={styles.haveaccount}>
            Don’t have an account? <a href="/signup">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

