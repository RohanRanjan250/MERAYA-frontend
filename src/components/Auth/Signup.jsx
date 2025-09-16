import React, { useState } from "react";
import styles from "./Signup.module.css";
import logo from "../../assets/login.png"; 
import {emailVerify, signup } from "../../API/authApi.jsx"

const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    otp: ""
  });

  const [otpSent, setOtpSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVerify = async () => {
    try {
      const response = await emailVerify(formData.email);
      if (response?.status === 200) {
        console.log("OTP sent");
        setOtpSent(true);
      } else {
        console.log("Unexpected response", response);
      }
    } catch (err) {
      console.error("verify failed", err);
      // handle/show error to user
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 🔹 Send full data with OTP to backend
    const data  = await signup(formData) ;
    console.log(data) ;
  };

  return (
    <div className={styles.container}>
      {/* Left Side */}
      <div className={styles.left}>
        <img src={logo} alt='Meerya Logo' className={styles.logo} />
      </div>

      {/* Right Side */}
      <div className={styles.right}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>Signup</h2>

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {!otpSent ? (
            <button type="button" onClick={handleVerify}>
              Verify
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
              <button type="submit">Submit</button>
            </>
          )}
        <p>Already have an account?      <a href="/login">Click here</a></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
