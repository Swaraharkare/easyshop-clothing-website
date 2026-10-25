import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Replace with your backend URL
  const backendUrl = 'http://localhost:5000'; 

  // You should have admin token stored after login (e.g. localStorage)
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${backendUrl}/api/users/all`, {
          headers: {
            token: token,
          },
        });
        if (data.success) {
          setUsers(data.users);
        } else {
          setError(data.message || 'Failed to fetch users');
        }
      } catch (err) {
        setError(err.message || 'Error fetching users');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUsers();
    } else {
      setError('Admin not authenticated');
      setLoading(false);
    }
  }, [token]);

  if (loading) return <div>Loading users...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Admin Panel - User List</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Delivery Info</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.deliveryInfo
                    ? `${user.deliveryInfo.street}, ${user.deliveryInfo.city}, ${user.deliveryInfo.state}, ${user.deliveryInfo.zipcode}, ${user.deliveryInfo.country}`
                    : 'No delivery info'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;
