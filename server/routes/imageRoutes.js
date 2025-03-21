import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { adminMiddleware } from '../middleware/adminMiddleware.js'
import multerMiddleware from '../middleware/imageUploadMiddleware.js'
import { deleteImageController, fetchImagesController, uploadImageController } from '../controllers/imageController.js'
const router = express.Router()
router.post('/upload', authMiddleware, adminMiddleware, multerMiddleware.single("image"), uploadImageController)
router.get("/get-image", authMiddleware, fetchImagesController)
router.delete("/delete/:id", authMiddleware, deleteImageController)
export default router   