import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        backendUrl + '/api/order/list',
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/order/status',
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Status update failed');
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3 className="text-black text-2xl font-bold mb-6">Order Page (Admin)</h3>
      <div>
        {orders.map((order, index) => (
          <div
            key={index}
            className={`grid grid-cols-1 sm:grid-cols-[3fr_1fr] lg:grid-cols-[3fr_1fr_1fr_1fr] gap-3 items-start border-2 ${
              order.status === 'Cancelled'
                ? 'border-red-400 bg-red-50'
                : 'border-gray-200'
            } p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700`}
          >
            {/* Removed parcel icon */}

            {/* Show list of items with images */}
            <div>
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 py-1">
                  <img
                    src={item.image && item.image.length > 0 ? item.image[0] : assets.placeholder_image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p>
                      Qty: {item.quantity} | Size: {item.size || 'N/A'}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <p className="text-sm sm:text-[15px]">Items: {order.items.length}</p>
              <p className="mt-3">Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>

            <p className="text-sm sm:text-[15px]">
              {currency}
              {order.amount}
            </p>

            <div className="flex flex-col">
              <select
                onChange={(event) => statusHandler(event, order._id)}
                value={order.status}
                disabled={order.status === 'Cancelled' || order.status === 'Delivered'}
                className={`p-2 font-semibold rounded border ${
                  order.status === 'Cancelled'
                    ? 'bg-red-100 text-red-600 border-red-400 cursor-not-allowed'
                    : 'bg-white'
                }`}
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>

              {order.status === 'Cancelled' && (
                <p className="text-red-600 text-xs mt-1 font-semibold">
                  This order was cancelled
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
