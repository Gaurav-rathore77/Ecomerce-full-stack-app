const mongoose= require("mongoose");

const userSchema=new mongoose.Schema({
    username : {
        type: String,
        required: true,
        // trim: true
    },
    email : {
        type: String,
        required: true,
        unique: true,
    },
    password : {
        type: String,
        required: true,
    },
    phone : {
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    answer: {
        type: String,
        // required: true,
      },
    role:{
        type: String,
        default: 0,
    }
    // name:{type:String,required:true},
    // email:{type:String,required:true},
    // password:{type:String,required:true},
    // isAdmin:{type:Boolean,required:true},
    // isSeller:{type:Boolean,required:true},
    // seller:{type:mongoose.Schema.Types.ObjectId,ref:"seller"},
    // cart:{type:mongoose.Schema.Types.ObjectId,ref:"cart"},
    // wishlist:{type:mongoose.Schema.Types.ObjectId,ref:"wishlist"},
    // address:{type:mongoose.Schema.Types.ObjectId,ref:"address"},
    // orders:{type:mongoose.Schema.Types.ObjectId,ref:"order"},
    // reviews:{type:mongoose.Schema.Types.ObjectId,ref:"review"},
    // rating:{type:mongoose.Schema.Types.ObjectId,ref:"rating"},
    // resetPasswordToken:{type:String},
    // resetPasswordExpire:{type:Date},
    // createdAt:{type:Date, default:Date.now},
    // updatedAt:{type:Date, default:Date.now},
},{timestamps:true});

module.exports=mongoose.model("user",userSchema);