import express from 'express'
import { changePassword, checkUserExists, loginUser, logoutUser, registerUser } from '../controllers/authController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/check-auth", authMiddleware, (req, res) => {
    return res.status(200).json({
        success: true, message: "Authorized user", user: req.user
    })
})
router.post('/check-user', checkUserExists)
router.post('/change-password', changePassword)
router.post("/logout", logoutUser)



export default router