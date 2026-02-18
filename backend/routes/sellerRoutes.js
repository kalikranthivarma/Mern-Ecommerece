const express = require('express');
const router = express.Router()
const Seller = require("../models/Seller");
const transporter = require("../utils/sendEmail");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


router.post("/send-otp", async (req, res) => {
    const { email } = req.body;
    try {
        let seller = await Seller.findOne({ email })
        let otp = Math.floor(Math.random() * 900000+10000).toString();
        if (!seller) {
            seller = new Seller({email})
        }
        seller.otp=otp
        seller.otpExpiry =new Date.now() +5 *60 *1000
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
        if (seller.otp !== otp || seller.otp< Date.now()) {
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

module.exports = router;    