import React, { useState } from "react";
import styles from "./Signup.module.css";
import logo from "../../assets/logo-removebg-preview.png"; // Adjust the path if needed

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    otp: ""
  });

  const [otpSent, setOtpSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Request OTP via email
  const handleSendOtp = () => {
    fetch("/api/send-email-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: formData.email })
    })
      .then((res) => res.json())
      .then(() => {
        setOtpSent(true);
      })
      .catch((err) => console.error(err));
  };

  // 🔹 Verify OTP and login
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Login successful!");
      })
      .catch((err) => console.error(err));
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

          <p>
            Don’t have an account? <a href="/signup">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
