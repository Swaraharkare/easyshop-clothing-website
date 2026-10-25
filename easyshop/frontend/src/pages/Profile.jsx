import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import { FaUserCircle, FaEnvelope } from 'react-icons/fa';

const Profile = () => {
  const { token, backendUrl, navigate } = useContext(ShopContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        toast.error('Please log in first');
        navigate('/login');
        return;
      }

      try {
        const res = await axios.get(`${backendUrl}/api/user/profile`, {
          headers: { token },
        });

        if (res.data.success) {
          setUser(res.data.user);
        } else {
          toast.error(res.data.message);
        }
      } catch (err) {
        console.error(err);
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  if (loading) {
    return <div className="text-center mt-10 text-gray-700">Loading profile...</div>;
  }

  if (!user) {
    return <div className="text-center mt-10 text-red-600">No profile data found</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-slate-100 shadow-2xl rounded-lg border border-gray-200">
    <div className="flex flex-col items-center m-4">
      <FaUserCircle className="text-5xl text-blue-700 mb-2" />
      {/* <h6 </h6> */}
      <h6 className="text-1xl font-bold text-gray-800">Welcome 👋</h6>
      <h3 className="text-2xl font-semibold text-pink-600"> {user.name}</h3>
      <br />
      
    </div>
    <div className='flex flex-col items-center mb-6 mr-6 ml-6 p-7 shadow-lg rounded-lg border bg-white border-gray-200'>
    <p className=" mb-6 text-sm font-medium text-red-700 ">Your account details</p>
    <div className="space-y-4">
      <div className="flex items-center gap-3 text-gray-700">
        <FaUserCircle className="text-indigo-600" />
        <p><strong>Name:</strong> {user.name}</p>
      </div>
      <div className="flex items-center gap-3 text-gray-700">
        <FaEnvelope className="text-indigo-600" />
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
    <div className="mt-6 text-center">
      <button
        onClick={() => navigate('/editprofile')}
        className="bg-purple-700 hover:bg-blue-700 shadow-lg shadow-purple-500/50 hover:shadow-blue-500/50 text-white font-medium px-7 py-1 rounded-sm transition duration-200"
      >
        Edit Profile
      </button>
    </div>
    </div>
  </div>
);
};

export default Profile;
