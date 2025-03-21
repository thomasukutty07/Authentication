import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export const registerUser = async (req, res) => {
    try {
        const { userName, email, password, role } = req.body
        if (!userName || !email || !password) {
            return res.status(404).json({ success: false, message: "All fields are requried" })
        }
        const findExistingUser = await User.findOne({ $or: [{ userName }, { email }] })
        if (findExistingUser) {
            return res.status(400).json({ success: false, message: "Exisiting user! please login" })
        }
        // Hash password
        const salt = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newlyCreatedUser = new User({
            userName, password: hashedPassword, email, role: role || 'user'
        })
        await newlyCreatedUser.save()
        if (newlyCreatedUser) {
            res.status(201).json({ success: true, message: "Registration completed", })
        } else {
            res.status(400).json({ success: false, message: "Registration failed Please try again" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Some error occured" })
    }
}
export const loginUser = async (req, res) => {
    try {
        const { identifier, password } = req.body
        if (!identifier) {
            return res.status(400).json({ success: false, message: "Enter username or email" })
        }
        if (!password) {
            return res.status(400).json({ success: false, message: "Password is empty" })
        }

        const findExistingUser = await User.findOne({ $or: [{ email: identifier }, { userName: identifier }] })
        if (!findExistingUser) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        const checkPassword = await bcrypt.compare(password, findExistingUser.password)
        if (!checkPassword) {
            return res.status(401).json({ success: false, message: "Incorrect Password" })
        }
        const accessToken = jwt.sign({
            userId: findExistingUser._id,
            email: findExistingUser.email,
            role: findExistingUser.role
        }, process.env.JWT_SECRET_KEY, { expiresIn: "60m" })

        res.cookie("token", accessToken, {
            httpOnly: true, secure: false
        })

        res.json({ success: true, message: "Logged in successfully", user: findExistingUser, accessToken })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Some error occured" })
    }
}
export const changePassword = async (req, res) => {
    try {
        const { identifier, oldPassword, newPassword, confirmNewPassword } = req.body

        if (!identifier) {
            return res.status(400).json({ success: false, message: "Enter the username or email" })
        }
        const findExistingUser = await User.findOne({ $or: [{ email: identifier }, { userName: identifier }] })
        if (!findExistingUser) {
            return res.status(404).json({ success: false, message: "User not found" })
        }
        const isMatch = await bcrypt.compare(oldPassword, findExistingUser.password)

        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Old password is incorrect" })
        }
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ success: false, message: "New passwords not matching" })
        }
        const genSalt = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(newPassword, genSalt)

        findExistingUser.password = hashedPassword
        await findExistingUser.save()
        return res.status(200).json({ success: true, message: 'Password changed successfully' })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Error occured while changing password" })
    }
}
export const checkUserExists = async (req, res) => {
    try {
        const { identifier } = req.body
        if (!identifier) {
            return res.status(400).json({ success: false, message: "Enter the username or passsword" })
        }
        const findExistingUser = await User.findOne({ $or: [{ email: identifier }, { userName: identifier }] })
        if (!findExistingUser) {
            return res.status(404).json({ success: false, message: "User not found" })
        }
        res.status(200).json({ success: true, user: findExistingUser })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "An error occurred" });
    }
}
export const logoutUser = async (req, res) => {
    try {
        res.clearCookie('token')
        res.status(200).json({ success: true, message: "Logged out successfully" })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error occured' })
    }
}