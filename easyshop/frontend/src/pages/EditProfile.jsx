import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';

const EditProfile = () => {
  const { token, backendUrl, navigate } = useContext(ShopContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/user/profile`, {
          headers: { token },
        });
        if (res.data.success) {
          setName(res.data.user.name);
          setEmail(res.data.user.email);
        }
      } catch (error) {
        toast.error("Failed to load profile.");
      }
    };

    fetchUser();
  }, [token]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${backendUrl}/api/user/update`, { name, email }, {
        headers: { token },
      });
      if (res.data.success) {
        toast.success('Profile updated successfully!');
        navigate('/profile');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error('Something went wrong.');
    }
  };

  return (
    <form onSubmit={handleUpdate} className="max-w-md mx-auto mt-10  bg-white shadow-lg border rounded-md">
      <div className="items-center justify-center ml-40 mt-10">
      <h2 className="text-2xl font-semibold mb-1 px-13 text-rose-600 ">Edit Profile</h2>
      </div>
      <div className=' m-10'>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded"
        placeholder="Name"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded"
        placeholder="Email"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 mt-3 rounded"
      >
        Update Profile
      </button>
      </div>
    </form>
  );
};

export default EditProfile;
