const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id:Number,
    name:String,
    email:String,
    mobile:String,
    password:String,
})

const productSchema = new mongoose.Schema({})

const User = new mongoose.model("user",userSchema);
const Product = new mongoose.model("product",productSchema)
module.exports ={User,Product}