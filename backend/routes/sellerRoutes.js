const express = require('express');
const router = express.Router()
const Seller = require("../models/Seller");
const transporter = require("../utils/sendEmail");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {generateAccessToken,generateRefreshToken} = require("../utils/generateTokens.js")


router.post("/send-otp", async (req, res) => {
    const { email } = req.body;
    try {
        let seller = await Seller.findOne({ email })
        let otp = Math.floor(Math.random() * 900000+10000).toString();
        // const otp = Math.floor(100000 + Math.random() * 900000).toString();

        if (!seller) {
            seller = new Seller({email})
        }
        seller.otp=otp
        seller.otpExpiry =Date.now() +5 *60 *1000
        await seller.save();
        await transporter.sendMail({
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: "OTP for Email Verification",
            html: `The otp is ${otp}`
    })
        res.status(200).json({message:"OTP send to email"})
}
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: err.message })
    }
})

router.post("/verify-otp", async (req, res) => {
    const { email, otp, password } = req.body;
    try {
        const seller = await Seller.findOne({ email })
        if (!seller) {
            return res.status(400).json({ message: "Email not found" })
        }
        if (seller.otp !== otp || seller.otpExpiry< Date.now()) {
            return res.status(400).json({ message: "Invalid or expired OTP" })
        }
        seller.isEmailVerified = true,
        seller.otp=null
        seller.otpExpiry=null
        await seller.save();
        return res.status(200).json({ message: "Email verified" })

    }
    catch (err) {
        console.log("verify endpoint",err)
        return res.status(500).json({ message: err.message })
    }
})


router.post("/register", async (req, res) => {
    const {name,email,password } = req.body;
    try {
       const seller = await Seller.findOne({ email })
       if (!seller.isEmailVerified) {
        return res.status(400).json({ message: "Email not verified" })
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    seller.name=name;
    seller.password=hashedPassword;
    await seller.save();
    return res.status(201).json({ message: "Seller registered successfully" })
}

catch (err) {
    console.log("register endpoint",err)
    return res.status(500).json({ message: err.message })
}
})

router.post("/login", async (req,res)=>{
    const {email,password} = req.body
    try{
       const seller = await Seller.findOne({email})
       if(!seller){
        return res.status(404).json({message:"User not found"})
       }
       const isMatch= await bcrypt.compare(password,seller.password)
       if(!isMatch){
        console.log("")
        return res.status(400).json({message:"Password is incorrect"})
       }
       const accessToken = generateAccessToken()
       const refreshToken=generateRefreshToken()
       seller.refreshToken=refreshToken
       await seller.save()
       res.cookie("refreshToken", refreshToken,{
        httpOnly: true,
        secure: false,
        path: "/", 
        sameSite:"lax",
        maxAge:7 * 24* 60 * 60 * 1000 
       })
       res.status(200).json({
        accessToken,
        message:"Login Successful",
        seller:{
            id:seller._id,
            name:seller.name,
            email:seller.email
        }
       })

    }
    catch(err){
        console.log("Error from login route",err)
        return res.status(500).json({message:"Server Error form login route"})
    }

})

router.post("/refresh-token",async(req,res)=>{
    const refreshToken= req.cookies.refreshToken
    if(!refreshToken)
        return res.status(400).json({message:"Invalid cookie or no refresh Token"})
    try{
        const decoded = jwt.verify(refreshToken,process.env.JWT_REFRESH)
        const seller = await seller.findById(decoded.id)
        if(!seller || seller.refreshToken!== refreshToken)
            return res.status(400).json({message:"Invalid token"})
        const newAccessToken = generateAccessToken()
        return res.json({
            accessToken: newAccessToken
        })
    }
    catch (err) {
        console.log("error from refresh endpoint", err)
    }
})
 
router.post("/logout",async(req,res)=>{
    const refreshToken = req.cookies.refreshToken
    // const seller = await seller.findOne({refreshToken})
    // if(seller){
    //     seller.refreshToken=null
    //     await seller.save()
    // }
    const decoded=jwt.verify(refreshToken,process.env.JWT_REFRESH)
    const seller = await seller.findById(decoded.id)
    if(seller){
        seller.refreshToken=null
        await seller.save()
    }
    res.clearCookie("refreshToken")
    return res.json({message:"Logged out successful"})

})

module.exports = router;    