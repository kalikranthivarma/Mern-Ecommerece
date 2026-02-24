const express = require('express');
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const sellerRoutes = require("./routes/sellerRoutes");
const cookieParser =require("cookie-parser")
require("dotenv").config();



app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors({
    // origin:"http://localhost:5173",
  origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials:true
}))

connectDB()
app.get("/",(req,res)=>{
    res.json({message:"Testing route"})
})

app.use(cookieParser())
app.use("/api/seller",sellerRoutes)
app.listen(process.env.PORT,()=>console.log("Server running on port",process.env.PORT))
