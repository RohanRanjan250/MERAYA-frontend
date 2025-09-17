import React, { useState } from "react";
import styles from "./Signup.module.css";
import leftPhoto from "../../assets/login.png"; 
import {emailVerify, signup, signupWithGoogle } from "../../API/authApi.jsx"
import logo from "../../assets/image.png";
import { FcGoogle } from "react-icons/fc";
import OtpInput from "./OtpInput";
import { useGoogleLogin } from "@react-oauth/google";

const Signup = () => {
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

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Send only the id_token to your backend
        console.log(tokenResponse)
        console.log(tokenResponse.access_token)
        const response = await signupWithGoogle(tokenResponse.access_token);
        console.log("Logged in user:", response.data);
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
        <img src={leftPhoto} alt='Meerya Logo' className={styles.leftPhoto} />
      </div>

      {/* Right Side */}
      <div className={styles.right}>
        <img src={logo} alt="Meerya Logo" className={styles.logo} />
        <h2 className={styles.heading}>REGISTER</h2>
        <button className={styles.googleBtn} onClick={() => googleLogin()}>
          <FcGoogle className={styles.icon} />
          <span>Sign up with Google</span>
        </button>

        <div className={styles.divider}>
          <span className={styles.or}>Or</span>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
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
              SEND VERIFICATION CODE
            </button>
          ) : (
            <>
              <OtpInput
                value={formData.otp}
                onChange={(otp) => setFormData({ ...formData, otp })}
              />
              <button type="submit">SUBMIT</button>
            </>
          )}


          <p className={styles.haveaccount}>Already have an account?      <a href="/login">Click here</a></p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
