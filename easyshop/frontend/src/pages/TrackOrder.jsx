import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';

const stepsList = [
  "Order Placed",
  "Packing",
  "Shipped",
  "Out For Delivery",
  "Delivered"
];

const TrackOrder = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { backendUrl, token } = useContext(ShopContext);
  const [tracking, setTracking] = useState(null);

  const fetchTrackingData = async () => {
    try {
      const response = await axios.post(`${backendUrl}/api/order/track`, { orderId }, {
        headers: { token }
      });
      if (response.data.success) {
        setTracking(response.data.order);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert('Error fetching tracking data.');
    }
  };

  const handleReturnRequest = async () => {
    const returnReason = prompt('Enter the reason for return:');
    if (returnReason) {
      try {
        const response = await axios.post(`${backendUrl}/api/order/requestReturn`, 
          { orderId, returnReason }, 
          { headers: { token } }
        );
        if (response.data.success) {
          alert('Return request submitted successfully');
          fetchTrackingData();  // Refresh tracking data
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error(error);
        alert('Error submitting return request');
      }
    }
  };

  useEffect(() => {
    fetchTrackingData();
  }, [orderId]);

  if (!tracking) {
    return <div className="p-10 text-center text-gray-500">Loading tracking details...</div>;
  }

  const isCancelled = tracking.status.toLowerCase() === 'cancelled';
  const currentStatusIndex = stepsList.findIndex(step => step.toLowerCase() === tracking.status.toLowerCase());

  return (
    <div className="p-8 shadow-lg border border-gray-300">
      <h1 className="text-2xl font-bold text-indigo-950 mb-8">Tracking Order </h1> 

      {/* Progress bar */}
      <div className="flex flex-col md:flex-row items-center justify-center mb-10 relative">
      {isCancelled ? (
  <div className="flex flex-col items-center text-center">
    <div className="flex items-center justify-center rounded-full bg-red-100 h-24 w-24">
      <span className="text-5xl text-red-500">❌</span>
    </div>
    <p className="text-red-600 mt-4 text-xl font-bold">Order Cancelled</p>

    {/* Button to go back */}
    <button 
      onClick={() => navigate('/orders')}
      className="mt-6 px-6 py-3 bg-black hover:bg-slate-800 text-white rounded-full shadow-md transition"
    >
      Go Back to Orders
    </button>
  </div>
) : (
          <div className="flex flex-col md:flex-row items-center justify-between w-full relative">
            {stepsList.map((step, idx) => {
              const isActive = idx <= currentStatusIndex;
              const showGreenLine = idx < currentStatusIndex || idx === 0; // always green after first step
              const isDeliveredStep = step.toLowerCase() === 'delivered' && tracking.status.toLowerCase() === 'delivered';

              return (
                <div key={idx} className="flex flex-col items-center text-center w-full relative">
                  <div
                    className={`rounded-full h-8 w-8 flex items-center justify-center z-10
                      ${isActive ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}
                    `}
                  >
                    {isDeliveredStep ? '✅' : idx + 1}
                  </div>
                  <p className="text-xs mt-2">{step}</p>

                  {/* Line connector */}
                  {idx !== stepsList.length - 1 && (
                    <div className={`hidden md:block absolute top-4 left-full w-full h-1 ${showGreenLine ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  )}
                </div>
              );
            })}
            
                
          </div>
          

        )}
      </div>

      {/* Order Details */}
      <div className="space-y-4 border rounded-lg p-6 shadow-md bg-white">
        <p><strong>Status:</strong> {tracking.status}</p>
        <p><strong>Payment Method:</strong> {tracking.paymentMethod}</p>
        {/* <p><strong>Payment Status:</strong> {tracking.payment}</p> */}
        <p><strong>Order Date:</strong> {new Date(tracking.date).toLocaleDateString()}</p>
        {/* <p><strong>Last Updated:</strong> {tracking.updatedAt ? new Date(tracking.updatedAt).toLocaleDateString() : '-'}</p> */}

        {/* Show history if available */}
        {tracking.history && tracking.history.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mt-6 mb-2">Order History:</h2>
            <ul className="list-disc ml-6">
              {tracking.history.map((step, idx) => (
                <li key={idx}>
                  {step.status} — {new Date(step.date).toLocaleDateString()}
                </li>
              ))}
            </ul>
          </div>
        )}
                       
                     {!isCancelled && tracking.status === 'Delivered' && !tracking.returnRequest && (
  <div className="mt-6 text-center">
    <button
      onClick={async () => {
        if (window.confirm('Are you sure you want to request a return?')) {
          try {
            const response = await axios.post(`${backendUrl}/api/order/returnRequest`, { orderId }, {
              headers: { token }
            });
            if (response.data.success) {
              alert('Return request submitted.');
              fetchTrackingData(); // Refresh
            } else {
              alert(response.data.message);
            }
          } catch (error) {
            console.error(error);
            alert('Error submitting return request.');
          }
        }
      }}
      className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-full shadow-md transition"
    >
      Request Return
    </button>
  </div>
)}

{tracking.returnRequest && (
  <div className="mt-4">
    <p><strong>Return Status:</strong> {tracking.returnStatus}</p>
    {tracking.returnRequestedAt && (
      <p><strong>Return Requested On:</strong> {new Date(tracking.returnRequestedAt).toLocaleDateString()}</p>
    )}
  </div>
)}


                    
      </div>
    </div>
  );
};

export default TrackOrder;
