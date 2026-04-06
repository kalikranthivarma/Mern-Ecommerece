const express= require("express")
const app=express() 
const cors= require("cors")
const connectDB = require("./config/db.js")
const sellerRoutes= require("./routes/sellerRoutes.js")
const productRoutes= require("./routes/productRoutes.js")
const buyerRoutes = require("./routes/buyerAuthRoutes")
const authRoutes = require("./routes/authRoutes")
const cartRoutes = require("./routes/cartRoutes")
const orderRoutes = require("./routes/orderRoutes")
const paymentRoutes = require("./routes/paymentRoutes.js")

const cookieParser =require("cookie-parser")
require("dotenv").config()
const defaultOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174"
]
const configuredOrigins = [
    process.env.CLIENT_URL,
    ...(process.env.CLIENT_URLS || "").split(",")
]
    .map((origin) => origin && origin.trim())
    .filter(Boolean)
const allowedOrigins = [...new Set([...defaultOrigins, ...configuredOrigins])]

app.set("trust proxy", 1)
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true)
        }
        return callback(new Error("CORS origin not allowed"))
    },
    credentials:true
}))
connectDB(app)
app.use(cookieParser())
app.get("/",(req,res)=>{
    res.json({message:"Testing route"})
})

app.use("/api", authRoutes)
app.use("/api/seller",sellerRoutes)
app.use("/api/product",productRoutes)
app.use("/api/buyer", buyerRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/orders", orderRoutes)
app.use('/api/payment',paymentRoutes)

const port = process.env.PORT || 2000

app.listen(port,()=>console.log("Server is running on port", port))
