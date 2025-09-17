import React, { useState } from "react";
import styles from "./Signup.module.css";
import leftPhoto from "../../assets/login.png";
import { login, emailloginverify, loginWithGoogle } from "../../API/authApi";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/image.png";
import { FcGoogle } from "react-icons/fc";
import OtpInput from "./OtpInput";
import { useGoogleLogin } from "@react-oauth/google";

const Login = () => {
  const navigate = useNavigate();
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
    try {
      const response = await emailloginverify(formData.email);
      if (response.status === 200) {
        console.log("OTP sent");
        setOtpSent(true);
      } else {
        console.log("Unexpected response", response);
      }
    } catch (err) {
      console.error("OTP send failed", err);
      setError(err.message || "Failed to send OTP. Try again!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(formData);
      if (data.status === 200) {
        navigate("/");
        setError("");
      } else if (data.status === 400) {
        setError(data.message || "Invalid OTP or Email not registered");
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Try again!");
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Send only the id_token to your backend
        console.log(tokenResponse)
        console.log(tokenResponse.access_token)
        const response = await loginWithGoogle(tokenResponse.access_token);
        console.log("Logged in user:", response.data);
        if (response.status === 200) {
          navigate("/");
        }
      } catch (err) {
        console.error("Google Login failed:", err);
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
        <img src={leftPhoto} alt="Meerya Logo" className={styles.leftPhoto} />
      </div>

      {/* Right Side */}
      <div className={styles.right}>
        <img src={logo} alt="Meerya Logo" className={styles.logo} />
        <h2 className={styles.heading}>LOGIN</h2>
        <button className={styles.googleBtn} onClick={() => googleLogin()}>
          <FcGoogle className={styles.icon} />
          <span>Sign up with Google</span>
        </button>

        <div className={styles.divider}>
          <span className={styles.or}>Or</span>
        </div>

        <form className={styles.form}>
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
              <button onClick={handleSubmit}>LOGIN</button>
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

