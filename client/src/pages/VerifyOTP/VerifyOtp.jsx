import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import "./VerifyOtp.css";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleOtpSubmit = async (event) => {
    event.preventDefault();
    if (otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/auth/verify-email", {
        verificationToken : otp,
      });

      if (response.status!==200) {
        throw new Error("OTP verification failed. Please try again.");
      }
      if (response.status === 200 && response.data?.user) {
        const userData = response.data.user;
        localStorage.setItem('user', JSON.stringify(userData));
      }
      
      setMessage("OTP verified successfully!");
      setTimeout(() => navigate("/home"), 2000); // Redirect after a short delay

    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="background">
    <div className="otp-container">
      <div className="otp-card">
        <h1>Verify OTP</h1>
        <p>
          Please enter the 6-digit One-Time Password (OTP) sent to your registered email
          address. This helps us verify your account and ensure secure access.
        </p>
        <form onSubmit={handleOtpSubmit} className="otp-form">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter 6-digit OTP"
            className="otp-input"
            maxLength="6"
            pattern="[0-9]*"
          />
          <button type="submit" className="otp-button">
            Verify OTP
          </button>
        </form>
        {message && <p className="otp-message">{message}</p>}
      </div>
    </div>
    </div>
  );
};

export default VerifyOtp;