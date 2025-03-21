export const adminMiddleware = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ success: false, message: "Unauthorized: No user found" });
    }

    if (req.user.role !== "admin") {
        return res.status(403).json({ success: false, message: "Access denied: Admins only" });
    }

    next();
};
