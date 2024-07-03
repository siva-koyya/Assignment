const express = require("express")

const router = express.Router()
const { Product } = require("../schema/schema")

router.get("/products",async(req,res)=>{
    const response= await Product.find()
    res.json(response)
});
router.post("/products",async(req,res)=>{
    try {  
        await Product.insertMany([req.body])
        res.status(201).json({message:"succussfully created"})
    } catch (error) {
        res.status(304).json({message:"Not Modified Data"})
    }
});

module.exports = router