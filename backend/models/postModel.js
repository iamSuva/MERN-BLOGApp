const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required:true
    // enum: [
    //   "Agriculture",
    //   "Business",
    //   "Education",
    //   "Entertainment",
    //   "Art",
    //   "Investment",
    //   "Weather",
    //   "Uncategorized",
    // ],
    // message:"{category is not supported"
  },
  description:{
    type:String,
    required:true,
  },
  title:{
    type:String,
    require:true
  },
  thumbnail:{
    type:String,
    require:true
  },
  creator:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }

},{timestamps:true});
module.exports=new mongoose.model("Post",postSchema);
