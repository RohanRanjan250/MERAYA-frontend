import React, { useState } from "react";
import styles from "./Signup.module.css";
import logo from "../../assets/logo-removebg-preview.png"; // Adjust the path if needed
import { login } from "../../API/authApi";

const Login = () => {
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
  const handleSendOtp = () => {
    fetch("/api/send-email-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: formData.email })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOtpSent(true);
          setError(""); // clear error
        } else {
          setError(data.message || "Email not registered"); // 🔹 show error
        }
      })
      .catch(() => setError("Something went wrong. Try again!"));
  };

  // 🔹 Verify OTP and login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(formData); // ✅ fixed formData typo
      if (data.success) {
        alert("Login successful!");
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
        <form className={styles.form} onSubmit={handleSubmit}>
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
              <button type="submit">Login</button>
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
