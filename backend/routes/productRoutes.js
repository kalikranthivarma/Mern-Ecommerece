const express = require("express")
const router = express.Router()
const {protect,authorizeRole}= require("../middleware/authMiddleware.js")

router.post("/add",protect,authorizeRole("seller"),async(req,res)=>{
    res.json({message:"Product added successfully"})
})


module.exports=router