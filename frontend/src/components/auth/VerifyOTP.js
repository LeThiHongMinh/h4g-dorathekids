// /src/components/auth/VerifyOTP.js

import React, { useState } from 'react';
import { verifyOTP } from '../../services/firebase';

const VerifyOTP = () => {
  const [code, setCode] = useState('');
  const [verificationId, setVerificationId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await verifyOTP(verificationId, code);
      alert('Phone verified!');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder="OTP Code" required />
      <button type="submit">Verify OTP</button>
    </form>
  );
};

export default VerifyOTP;
