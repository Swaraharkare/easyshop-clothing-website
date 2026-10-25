import express from 'express'
import UserModel from '../models/userModel.js' // Assuming your Mongoose User model
import authUser from '../middleware/auth.js'

const router = express.Router()

// GET /api/user/profile
router.get('/profile', authUser, async (req, res) => {
    try {
        const user = await UserModel.findById(req.body.userId).select('-password')
        if (!user) return res.json({ success: false, message: 'User not found' })

        res.json({ success: true, user })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
})

export default router
