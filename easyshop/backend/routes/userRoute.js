import express from 'express';
import { loginUser,registerUser,adminLogin } from '../controllers/userController.js';
import authUser from '../middleware/auth.js'
import UserModel from '../models/userModel.js';


const userRouter = express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)

userRouter.get('/profile', authUser, async (req, res) => {
    try {
      const user = await UserModel.findById(req.body.userId).select('-password');
      if (!user) return res.json({ success: false, message: 'User not found' });
  
      res.json({ success: true, user });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  });
  
  // ✅ New route: Update user profile
  userRouter.put('/update', authUser, async (req, res) => {
    try {
      const { name, email } = req.body;
  
      const user = await UserModel.findById(req.body.userId);
      if (!user) return res.json({ success: false, message: 'User not found' });
  
      user.name = name;
      user.email = email;
      await user.save();
  
      res.json({ success: true, message: 'Profile updated successfully' });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  });

  //
  userRouter.put('/reset-password', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Hash new password
    const bcrypt = await import('bcrypt');
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    res.json({ success: true, message: 'Password reset successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET delivery info of logged-in user
userRouter.get('/delivery-info', authUser, async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userId).select('deliveryInfo');
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, deliveryInfo: user.deliveryInfo || null });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT update delivery info for logged-in user
userRouter.put('/delivery-info', authUser, async (req, res) => {
  try {
    const { firstName, lastName, email, street, city, state, zipcode, country, phone } = req.body;
    const user = await UserModel.findById(req.body.userId);
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    user.deliveryInfo = { firstName, lastName, email, street, city, state, zipcode, country, phone };
    await user.save();

    res.json({ success: true, message: 'Delivery info updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});


  


export default userRouter;