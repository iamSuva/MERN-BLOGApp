const express=require("express");
const mongoose=require("mongoose");
require("dotenv").config();
const cors=require("cors");
const upload=require("express-fileupload");
const app=express();
const URI=process.env.MONGO_URI;
const port=process.env.PORT;

const userRoutes=require("./routes/userRoutes");
const postRoutes=require("./routes/postRoutes");
const {notFound,errorHandler}=require("./middleware/errorMiddleware");
app.use(express.json({extended:true}));
app.use(express.urlencoded({extended:true}));
app.use(cors({credentials:true,origin:"http://localhost:3000"}));

app.use(upload());
app.use("/uploads",express.static(__dirname+"/uploads"));
app.use("/api/users",userRoutes);
app.use("/api/posts",postRoutes);
app.use(notFound);
app.use(errorHandler);














mongoose.connect(URI).then(()=>{
     console.log("connected to db");
    app.listen(4000,()=>{
        console.log("server is running on port 4000");
    })
}).catch((err)=>{
    console.log(err);
})
