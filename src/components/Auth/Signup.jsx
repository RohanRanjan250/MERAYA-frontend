import React, { useState } from "react";
import styles from "./Signup.module.css";
import leftPhoto from "../../assets/login.png";
import { emailVerify, signup, signupWithGoogle } from "../../API/authApi.jsx"
import logo from "../../assets/image.png";
import { FcGoogle } from "react-icons/fc";
import OtpInput from "./OtpInput";
import { useGoogleLogin } from "@react-oauth/google";
import { useToast } from "../../Context/ToastContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    otp: ""
  });

  const [otpSent, setOtpSent] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  // Password regex: min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate password on change
    if (name === "password") {
      if (value && !passwordRegex.test(value)) {
        setPasswordError("Password must be at least 8 characters with uppercase, lowercase, number, and special character (@$!%*?&)");
      } else {
        setPasswordError("");
      }
    }
  };

  const handleVerify = async () => {
    // Show OTP input immediately
    setOtpSent(true);

    try {
      const response = await emailVerify(formData.email);
      if (response?.status === 200) {
        console.log("OTP sent");
        showToast('OTP sent successfully! Check your email', 'success');
      } else {
        console.log("Unexpected response", response);
        showToast('Failed to send OTP', 'error');
        setOtpSent(false); // Hide OTP input on failure
      }
    } catch (err) {
      console.error("verify failed", err);
      showToast(err.message || 'Failed to send OTP', 'error');
      setOtpSent(false); // Hide OTP input on failure
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password before submission
    if (!passwordRegex.test(formData.password)) {
      showToast('Password must be at least 8 characters with uppercase, lowercase, number, and special character', 'error');
      setPasswordError("Password must be at least 8 characters with uppercase, lowercase, number, and special character (@$!%*?&)");
      return;
    }

    try {
      const data = await signup(formData);
      console.log(data);
      if (data.status === 200 || data.status === 201) {
        showToast('Signup successful! Redirecting...', 'success');
        setTimeout(() => navigate("/login"), 1500);
      } else {
        showToast(data.message || 'Signup failed', 'error');
      }
    } catch (err) {
      console.error("Signup failed:", err);
      showToast(err.message || 'Signup failed', 'error');
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await signupWithGoogle(tokenResponse.access_token);
        if (response.status === 200) {
          showToast('Signup successful!', 'success');
          navigate("/");
        }
      } catch (err) {
        console.error("Google Login failed:", err);
        showToast('Google signup failed', 'error');
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
          {passwordError && (
            <p style={{ color: '#ff6b6b', fontSize: '0.85rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
              {passwordError}
            </p>
          )}

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
