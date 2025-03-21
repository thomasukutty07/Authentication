import jwt from 'jsonwebtoken'
export const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        return res.status(400).json({ success: false, message: "Token unavailable" })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ success: false, message: "Unauthorized user" })
    }
}