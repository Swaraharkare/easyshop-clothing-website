import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const ForgotPassword = () => {
  const { backendUrl } = useContext(ShopContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await axios.put(`${backendUrl}/api/user/reset-password`, {
        email,
        password: newPassword,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setTimeout(() => navigate('/login'), 2000); // Redirect after 2s
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-20 p-10 gap-4 text-gray-800 shadow-lg shadow-black'>
      <h2 className='text-2xl text-indigo-800 font-semibold  mb-2'>Reset Your Password</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-3 py-2 border border-gray-800"
      />

      <div className="w-full relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="New Password"
          value={newPassword}
          required
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-800"
        />
        <span
          onClick={toggleShowPassword}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl text-gray-600"
        >
          {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </span>
      </div>

      <div className="w-full relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
          value={confirmPassword}
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-800"
        />
        <span
          onClick={toggleShowPassword}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl text-gray-600"
        >
          {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </span>
      </div>

      <button type="submit" className='bg-black text-white font-light px-8 py-2 mt-4'>
        Reset Password
      </button>
    </form>
  );
};

export default ForgotPassword;
