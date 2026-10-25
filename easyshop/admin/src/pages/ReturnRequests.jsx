import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { backendUrl } from '../App';

const ReturnRequests = ({ token }) => {
  const [returnRequests, setReturnRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [processingId, setProcessingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      alert("You are not logged in as an admin.");
      navigate("/login");
      return;
    }

    const fetchReturnRequests = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${backendUrl}/api/order/returnRequests`, {
          headers: { token }
        });

        if (response.data.success) {
          const sortedReturns = (response.data.returns || []).sort(
            (a, b) => new Date(b.returnRequestedAt || b.createdAt) - new Date(a.returnRequestedAt || a.createdAt)
          );
          setReturnRequests(sortedReturns);
          setErrorMessage(null);
        } else {
          setErrorMessage(response.data.message || 'Failed to fetch return requests.');
        }
      } catch (error) {
        setErrorMessage('Error fetching return requests.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchReturnRequests();
  }, [token, navigate]);

  const handleReturnRequest = useCallback(async (orderId, decision) => {
    if (!window.confirm(`Are you sure you want to ${decision.toLowerCase()} this return request?`)) {
      return;
    }

    setProcessingId(orderId);
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/handleReturn`,
        { orderId, decision },
        { headers: { token } }
      );
      if (response.data.success) {
        alert(`Return request ${decision.toLowerCase()}.`);
        setReturnRequests(prev => prev.filter(request => request._id !== orderId));
        setErrorMessage(null);
      } else {
        setErrorMessage(response.data.message || 'Failed to process return request.');
      }
    } catch (error) {
      setErrorMessage(`Error processing return request: ${error.message}`);
    } finally {
      setProcessingId(null);
    }
  }, [token]);

  return (
    <div className="p-3 shadow-lg border border-gray-300">
      <h1 className="text-xl font-bold text-indigo-950 mb-8">Return Requests</h1>

      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : errorMessage ? (
        <div className="text-center text-red-500">{errorMessage}</div>
      ) : returnRequests.length === 0 ? (
        <div className="text-center text-gray-500">No return requests available.</div>
      ) : (
        <div className="space-y-4">
          {returnRequests.map((returnRequest) => (
            <div key={returnRequest._id} className="p-4 border rounded-lg shadow-md bg-white">
              <h2 className="text-base font-semibold mb-2">Order ID: {returnRequest._id}</h2>
              <p><strong>User Name:</strong> {returnRequest.userId?.name || 'N/A'}</p>
              <p><strong>User Email:</strong> {returnRequest.userId?.email || 'N/A'}</p>
              <p><strong>Status:</strong> {returnRequest.returnStatus}</p>
              <p><strong>Requested On:</strong> {returnRequest.returnRequestedAt ? new Date(returnRequest.returnRequestedAt).toLocaleString() : 'N/A'}</p>

              <div className="mt-4">
                <h3 className="font-semibold mb-2">Product Information:</h3>
                <div className="space-y-2">
                  {returnRequest.items.map((item, index) => (
                    <div key={index} className="flex flex-col gap-1 border-b pb-2">
                      <span className="font-medium">{item.name} (x{item.quantity})</span>
                      <span className="text-gray-600 text-sm">₹{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex space-x-4">
                {returnRequest.returnStatus === 'Pending' ? (
                  <>
                    <button
                      onClick={() => handleReturnRequest(returnRequest._id, 'Accepted')}
                      className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md shadow-sm"
                      disabled={processingId === returnRequest._id}
                    >
                      {processingId === returnRequest._id ? 'Processing...' : 'Accept'}
                    </button>
                    <button
                      onClick={() => handleReturnRequest(returnRequest._id, 'Rejected')}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md shadow-sm"
                      disabled={processingId === returnRequest._id}
                    >
                      {processingId === returnRequest._id ? 'Processing...' : 'Reject'}
                    </button>
                  </>
                ) : (
                  <span className={`font-semibold ${returnRequest.returnStatus === 'Accepted' ? 'text-green-600' : 'text-red-600'}`}>
                    Return {returnRequest.returnStatus}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReturnRequests;
