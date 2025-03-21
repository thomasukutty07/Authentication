import Image from '../models/image.js'
import { uploadToCloudinary } from '../helpers/cloudinaryHelper.js'
import fs from 'fs'
import cloudinary from '../config/cloudinary.js'


export const uploadImageController = async (req, res) => {
    try {
        // Checking file is available or not
        if (!req.file) {
            return res.status(400).json({ success: false, message: "File is missing" })
        }
        const { url, publicId } = await uploadToCloudinary(req.file.path)

        // Store image url and public id

        const newlyUploadedImage = new Image({
            url,
            publicId,
            uploadedBy: req.user.userId
        })

        await newlyUploadedImage.save()

        // Delete from local storage
        fs.unlinkSync(req.file.path)
        res.status(201).json({ success: true, message: 'Image uploaded successfully', image: newlyUploadedImage })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Something went wrong" })
    }
}
export const fetchImagesController = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 2
        const skip = (page - 1) * limit

        const totalImages = await Image.countDocuments()
        const totalPages = Math.ceil(totalImages / limit)

        const sortBy = req.query.sortBy || "createdAt"
        const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1
        const sortObj = {}

        sortObj[sortBy] = sortOrder

        const result = await Image.find().sort(sortObj).limit(limit).skip(skip)
        res.status(200).json({ success: true, totalImages: totalImages, totalPages: totalPages, currentPage: page, result })
    } catch (error) {
        res.status(500).json({ success: false, message: "Error occurred while fetching images" })
    }
}
export const deleteImageController = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(400).json({ success: false, message: "Id is not available" })
        }

        const findImage = await Image.findById(id)
        if (!findImage) {
            return res.status(404).json({ success: false, message: "Image not found" })
        }
        await cloudinary.uploader.destroy(findImage.publicId)
        await Image.findByIdAndDelete(id)
        return res.status(200).json({ success: true, message: "Image deleted successfully" })
    } catch (error) {
        return res.status(500).json({ succes: false, message: error.message })
    }
}