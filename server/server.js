import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './database/db.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import AuthRouter from "./routes/authRoutes.js"
import AdminRouter from "./routes/adminRoutes.js"
import HomeRouter from "./routes/homeRoutes.js"
import UploadImageRouter from "./routes/imageRoutes.js"
dotenv.config()
connectDB()
const PORT = process.env.PORT

const app = express()
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://beamish-dango-941a97.netlify.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', AuthRouter)
app.use('/api/home', HomeRouter)
app.use('/api/admin', AdminRouter)
app.use('/api/image', UploadImageRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
