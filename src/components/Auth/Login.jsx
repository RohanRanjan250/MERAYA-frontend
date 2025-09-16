import React, { useState } from "react";
import styles from "./Signup.module.css";
import logo from "../../assets/login.png";
import { login,emailloginverify } from "../../API/authApi";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate() ;
  const [formData, setFormData] = useState({
    email: "",
    otp: ""
  });

  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState(""); // 🔹 state for error message

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // clear error while typing
  };

  // 🔹 Request OTP via email
  const handleSendOtp = async () => {
    try {
      const response = await emailloginverify(formData.email) ;
      if (response.status == 200) {
        console.log("OTP sent");
        setOtpSent(true);
      } else {
        console.log("Unexpected response", response);
      }
    } catch (err) {
      console.error("OTP send failed", err);
      setError(err.message || "Failed to send OTP. Try again!"); // 🔹 show error
    }
  };

  // 🔹 Verify OTP and login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(formData); // ✅ fixed formData typo
      if (data.status === 200) {
        navigate("/")
        
        setError("");
      } else if ( data.status == 400){
        setError(data.message || "Invalid OTP or Email not registered"); // 🔹 show error
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Try again!"); // ✅ fixed catch
    }
  };

  return (
    <div className={styles.container}>
      {/* Left Side */}
      <div className={styles.left}>
        <img src={logo} alt="Meerya Logo" className={styles.logo} />
      </div>

      {/* Right Side */}
      <div className={styles.right}>
        <form className={styles.form}>
          <h2>Login</h2>

          {/* Email input */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {!otpSent ? (
            <button type="button" onClick={handleSendOtp}>
              Send OTP
            </button>
          ) : (
            <>
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                value={formData.otp}
                onChange={handleChange}
                required
              />
              <button onClick={handleSubmit}>Login</button>
            </>
          )}

          {/* 🔹 Error message placeholder */}
          <p className={styles.error}>{error}</p>

          <p>
            Don’t have an account? <a href="/signup">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;


