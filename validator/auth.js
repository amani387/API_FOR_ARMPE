const {check} =require("express-validator");
const validateEmail = require("./validateEmail");
const mongoose =require("mongoose")
const signupValidator =[
    check("name").notEmpty().withMessage("Name is Required"),
    check("email").isEmail().withMessage("Invalid Email").notEmpty().withMessage("Email is required"),
    check("password").notEmpty().withMessage("Password is required").isLength({min:6}).withMessage("password should be 6 char long")
];
signinValidator =[
    check("email").isEmail().withMessage("Invalid Email").notEmpty().withMessage("Email is Requred")
   , check("password").notEmpty().withMessage("password required")

]
emailvalidator =[
    check("email").isEmail().withMessage("invalid Email").notEmpty().withMessage("Email is Required")
]
const verifyUserValidator =[
    check("email").isEmail().withMessage("invalid Email").notEmpty().withMessage("Email is Required"),
    check("code").notEmpty().withMessage("code is required")

]
const recoverPasswordValidator =[
    check("email").isEmail().withMessage("invalid Email").notEmpty().withMessage("Email is Required"),
    check("code").notEmpty().withMessage("code is required"),
    check("password").notEmpty().withMessage("Password is required").isLength({min:6}).withMessage("password should be 6 char long")

]
const changePasswordValidator =[
    check("oldPassword").notEmpty().withMessage("please insert old password"),

    check("newPassword").notEmpty().withMessage("please insert the new password"),
]
const updateProfileValidator =[
    check("email").custom(async (email) =>{
        if(email){
 const isValidEmail =validateEmail(email);
 if(!isValidEmail){
    throw "Invalid Email";
 }
        }
    }),
    check("profilePic").custom(async(profilePic)=>{
if(profilePic && mongoose.Types.ObjectId.isValid(profilePic)){
    throw new Error("Invalid profile picture")
}
    })
]
module.exports ={signupValidator,signinValidator,emailvalidator,verifyUserValidator,recoverPasswordValidator,changePasswordValidator,updateProfileValidator };
