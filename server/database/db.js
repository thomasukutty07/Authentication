import mongoose from "mongoose";
export async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("DB Connected")
    } catch (error) {
        console.log(error)
        console.log("DB Connection failed")
    }
}