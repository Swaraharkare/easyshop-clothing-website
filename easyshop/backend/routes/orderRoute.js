import express from 'express'
import {placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyStripe, verifyRazorpay} from '../controllers/orderController.js'
import adminAuth  from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'
import { cancelOrder,requestReturn, handleReturnRequest, allReturnRequests} from '../controllers/orderController.js';
import Order from "../models/orderModel.js";

const orderRouter = express.Router()


// Admin Features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

// Payment Features
orderRouter.post('/place',authUser,placeOrder)
// orderRouter.post('/stripe',authUser,placeOrderStripe)
orderRouter.post('/razorpay',authUser,placeOrderRazorpay)

// User Feature 
orderRouter.post('/userorders',authUser,userOrders)
orderRouter.post('/cancel', authUser, cancelOrder);

// verify payment
orderRouter.post('/verifyStripe',authUser, verifyStripe)
orderRouter.post('/verifyRazorpay',authUser, verifyRazorpay)

orderRouter.post('/track', async (req, res) => {
    const { orderId } = req.body;
    // const token = req.headers.token; // Validate token if needed
  
    try {
      const order = await Order.findById(orderId);
  
      if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found' });
      }
  
      res.status(200).json({ success: true, order });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });
  
  
// User Request Return
orderRouter.post('/returnRequest', authUser, requestReturn);

// Admin View All Return Requests
orderRouter.get('/returnRequests', adminAuth, allReturnRequests);

// Admin Accept/Reject Return
orderRouter.post('/handleReturn', adminAuth, handleReturnRequest);



export default orderRouter