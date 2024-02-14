const mongoose = require("mongoose");
const userSchema = mongoose.Schema({


    
    name: { type: String, required: true },

    
    email: { type: String, required: true, unique: true, trim: true },


    password: { type: String, required: true, minlength: 6 },
    //role role: 1 super admin  role : 2 normal admin role 3:normal user
    role: { type: String, required: true, default: 3 },
    verificationCode:String,
    isVerified:{type:Boolean,default:false},
    forgotPasswordCode:String,
    profilePic:{type:mongoose.Types.ObjectId,ref:"File"}
    
}, { timestamps: true })


const User = mongoose.model("user", userSchema);    
module.exports =  User;  