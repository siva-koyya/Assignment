 const express =require("express");
 const mongoose =require("mongoose")
 const app =express();
 const cors =require("cors")
 const bodyParser =require("body-parser")
 const port =5000
 const UserData= require("./controllers/userData")
 const ProductData=require("./controllers/productDetails")

app.use(express.json());
app.use(bodyParser.json());
app.use(cors())

app.listen(port || 5000,()=>{
    console.log(`The Port ${port}`)   
 })
async function ConnectToDb(){
    try {
        mongoose.connect("mongodb+srv://sku:sku@sku.qjk9ur5.mongodb.net/SKU?retryWrites=true&w=majority&appName=SKU")
        console.log("conneccted mongo db")
    }catch(error){
        console.log("Disconnect To Db ",error)
    }
}
ConnectToDb()

app.use("/",UserData)
app.use("/",ProductData)

// app.post("/users",async(req,res)=>{
//     console.log(req.body)
//     // const {name,email,password,mobile} = req.body
//     try {
//         await User.insertMany([req.body])
//         res.json(["suucuss fully saved"]);
        
//     } catch (error) {
//         console.log("unable to save",error)
//     }
// })
