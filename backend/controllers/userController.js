const userModel=require("../models/userModel");
const HttpError=require("../models/errorModels");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const fs=require("fs");
const path=require("path");
const {v4:uuid}=require("uuid");
//sign up user
//post:api/users/register
const registerUser=async(req,res,next)=>{
   try {
      const {name,email,password}=req.body;
      if(!name || !email || !password)
      {
        return next(new HttpError("fill in all fields",422)); //422 means not processable data
      }
      const newEmail=email.toLowerCase();
      const emailExists=await userModel.findOne({email:newEmail});
       if(emailExists)
       {
        return next(new HttpError("Email already exist",422));
       }
       if((password.trim()).length<6)
       {
             return next(new HttpError("password should be at least 6 length",422));
       } 

       const salt=await bcrypt.genSalt(10);
       console.log(salt);
       const hashedPass=await bcrypt.hash(password,salt);
       const newUser=await userModel.create(
        {
         name:name,
         email:newEmail,
         password:hashedPass   
        }
       );
       res.status(201).json(`new user ${newUser.email} has registered`); //201 means one resource added/created
   } catch (error) {
      
   }
}
//login user
//post:api/users/login
const loginUser=async(req,res,next)=>{
 try {
    const {email,password}=req.body;
    if(!email || !password)
    {
        return next(new HttpError("please fill all fields"),422);

    }
    const newEmail=email.toLowerCase();
    const user=await userModel.findOne({email:newEmail});
    console.log(user);
    if(!user)
    {
        return next(new HttpError("Invalid user credentials",422));
    }

    const comparepass=await bcrypt.compare(password,user.password);
    if(!comparepass)
    {
        return next(new HttpError("Invalid password credentials",422));
    }
    const {_id:id,email:userEmail,name}=user;
    const token=jwt.sign({id,name,userEmail},process.env.JWT_SECRET,{expiresIn:"30m"});
    res.status(200).json({token,id,name,userEmail});

 } catch (error) {
    return next(new HttpError("Login failed.Please check credentials"));
 }
}

//user profile
const getUser=async(req,res,next)=>{
   try {
      const {id}=req.params;
      const user=await userModel.findById(id).select('-password');//exclude passw
      if(!user)
      {
        return next(new HttpError("User not found",404));
      }
      res.status(200).json(user);
   } catch (error) {
    return next(new HttpError(error));
}
}
//change profile pic
//post:api/users/changeAvatar
const changeAvatar=async(req,res,next)=>{
    try {
        const {id}=req.params;
        if(!req.files.avatar)
        {
            return next(new HttpError("please choose an image",422));

        }
          const user=await userModel.findById(req.user.id);
         //deleting old data from db
          if(user.avatar)
        {
           fs.unlink(path.join(__dirname,"..","uploads",user.avatar),(err)=>{
               if(err){
                return next(new HttpError("error"));
               }

           })

        }
       //upload it
       const {avatar}=req.files;
       if(avatar.size>500000)
       {
         return next(new HttpError("Profile too big .should be less than 500kb",422));
       }
       let filename=avatar.name;
       let splitedData=filename.split('.');
       let newFileName=splitedData[0]+uuid()+"."+splitedData[splitedData.length-1];
       console.log(__dirname);
       //It uses mv() method provided by the express-fileupload middleware to move the file to the desired location. Once the file is moved, it executes the callback function, where it checks for any errors during the file moving process. If an error occurs, it returns a new HttpError with the error message.
       avatar.mv(path.join(__dirname,"..",'uploads',newFileName),async(err)=>{
        if(err)
        {
            return next(new HttpError(err));
        }
        const updatedAvatar=await userModel.findByIdAndUpdate(req.user.id,{avatar:newFileName},{new:true});
        if(!updatedAvatar)
        {
            return next(new HttpError("Avater could not be changed",422));

        }
        res.status(200).json(updatedAvatar);
       })
        
        } catch (error) {
           return next(new HttpError(error));
        
       }
}
//change edit user
//post:api/users/editUser
const editUser=async(req,res,next)=>{
    try {
        const {name,email,currentPassword,newPassword}=req.body;
        if(!name || !email || !currentPassword || !newPassword){
            return next(new HttpError("Fill in all fields"));
        }
        //get user
        const user=await userModel.findById(req.user.id);
        if(!user)
        {

            return next(new HttpError("user not found.",403));
        }
        // make sure new email does not exits
        const emailExists=await userModel.findOne({email});
        if(emailExists &&(emailExists._id !=req.user.id)) //it means it some one's else email
        {
            return next(new HttpError("email already exist",422));
        }
       // compare password
       const validUserPassword=await bcrypt.compare(currentPassword,user.password);
       if(!validUserPassword)
       {
        return next(new HttpError("invalid current password"));
       }

       const salt=await bcrypt.genSalt(10);
       const hashPass=await bcrypt.hash(newPassword,salt);
       const newInfo=await userModel.findByIdAndUpdate(req.user.id,{name,email,password:hashPass},{new:true});
       res.status(200).json(newInfo);
    } catch (err) {
        return next(new HttpError(err));
    }
}
//change edit user
//post:api/users/authors
const getAuthors=async(req,res,next)=>{
  try {
      const authors=await userModel.find({}).select('-password');
      res.status(200).json(authors);
  } catch (error) {
    return next(new HttpError(error));
  }
}

module.exports={
    registerUser,
    loginUser
    ,getUser,
    changeAvatar,
    editUser,
    getAuthors
}