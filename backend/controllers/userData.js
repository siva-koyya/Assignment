const express = require("express");
const router =express.Router()
const {User} = require("../schema/schema");

// const UserApi=async(req,res)=>{
//     console.log(req.body)
//    const {name,email,password,mobile}=req.body;
//    try {
//        await User.insertMany([req.body]);
//        res.json("Succussfully created account")
//    } catch (error) {
//         console.log("unable to sent succussfully",error)
//    }
// }

router.post("/users",async(req,res)=>{
    console.log(req.body)
   const {name,email,password,mobile}=req.body;
   try {
       await User.insertMany([req.body]);
       res.json("Succussfully created account")
   } catch (error) {
        console.log("unable to sent succussfully",error)
   }
});

router.get("/users",async(req,res)=>{

 const response=await User.find()
 console.log("users Data")
 res.json(response)
});
router.put("/users",async(req,res)=>{
    const {id}=req.body
    const response = await User.findByIdAndUpdate({id})
}
)

module.exports= router
