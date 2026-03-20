import axios from "axios";
import { useState } from "react";

export default function Signup() {
  const [aadhaar, setAadhaar] = useState("");
  const [otp, setOtp] = useState("");

  const sendOtp = async () => {
    await axios.post("http://localhost:5000/send-otp", { aadhaar });
  };

  const verifyOtp = async () => {
    const res = await axios.post("http://localhost:5000/verify-otp", {
      aadhaar,
      otp,
    });
    alert(res.data.verified ? "Verified" : "Failed");
  };

  return (
    <div>
      <input placeholder="Aadhaar" onChange={(e) => setAadhaar(e.target.value)} />
      <button onClick={sendOtp}>Send OTP</button>

      <input placeholder="OTP" onChange={(e) => setOtp(e.target.value)} />
      <button onClick={verifyOtp}>Verify</button>
    </div>
  );
}
