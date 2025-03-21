import cloudinary from '../config/cloudinary.js'

export const uploadToCloudinary = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath)
        return {
            url: result.secure_url,
            publicId: result.public_id
        }
    } catch (error) {
        console.error("Error while uploading image to cloudinary", error)
        throw new Error("Error while uploading image ot cloudinary")
    }
}