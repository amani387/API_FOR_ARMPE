const hashPassword = require('../utils/hashedPassword')
const comparepassword = require("../utils/comparepasword")
const generateToken = require("../utils/generatetoken")
const generateCode = require('../utils/generateCode')
const sendEmail = require("../utils/sendEmail")

const { compare } = require('bcryptjs')
const { User ,File} = require('../modals')

const signup = async (req, res, next) => {
    try {
        //console.log(req.body)
        const { name, email, password, role } = req.body;
        console.log(name,email,password)
        const isEmailExist = await User.findOne({ email });
        if (isEmailExist) {            
            res.code = 400;
            throw new Error("Email already Exist");
        }
console.log("the user reached here also ")
        const hashedPassword = await hashPassword(password);
        const newUser = new User({ name, email, password: hashedPassword, role })
        await newUser.save();
        res.status(201).json({
            code: 201,
            status: true,
            message: "User registerd successfully"
        })
    } catch (error) {
        next(error)
    }
}
const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.code = 401;
            throw new Error("Invalid credential")
        }
        const match = await comparepassword(password, user.password);
        if (!match) {
            res.code = 401;
            throw new Error("Invalid credential password")
        }

        //generating  a token after the user is found 

        const token = generateToken(user);
        res.status(200).json({ code: 200, status: true, message: "User signin successfull", data: { token } })
    } catch (error) {
        next(error);
    }
}
const verifyCode = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            res.code = 404
            throw new Error("Use not Found");
        }
        if (user.isVerified) {
            res.code = 400;
            throw new Error('user already verified')
        }
        const code = generateCode(6);

        user.verificationCode = code;
        await user.save();
        await sendEmail({
            emailTo: user.email,
            subject: "Email verification code ",
            code,
            content: "verify your account"

        })




        //i will begin from on lilne 83
        //send to emaial
        res.status(200).json({ code: 200, status: true, message: "user verification code sent succssfully " })
    } catch (error) {
        next(error)
    }
}
const verify_user = async (req, res, next) => {
    try {
        const { email, code } = req.body;
        const user_found = await User.findOne({ email })


        if (!user_found) {
            res.code = 404;
            throw new Error("user not found");
        }
        console.log("user verification is: ", user_found.verificationCode);
        console.log("the user code is: ", code)
        if (user_found.verificationCode !== code) {

            res.code = 400;

            throw new Error("invalid code ")

        }

        user_found.isVerified = true;
        user_found.verificationCode = null;
        await user_found.save();
        res.status(200).json({ code: 200, status: true, message: "user verified succssfully" })

    } catch (error) {
        next(error)
    }
}
const ForgotPasswordCode = async (req, res, next) => {

    try {

        const { email } = req.body;
        const user = await User.findOne({ email })

        if (!user) {
            res.code = 404;
            throw new Error("User Not Found");
        }

        const code = generateCode(6)
        user.forgotPasswordCode = code;
        await user.save();

        await sendEmail({
            emailTo: user.email,
            subject: "Forgot password code",
            code,
            content: "change your password"
        });
        res.status(200).json({
            code: 200,
            status: true,
            message: 'Forgot password code sent successfully'
        })

        res
    } catch (error) {
        next();
    }

}
const recoverPassword = async (req, res, next) => {
    try {
        const { email, code, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.code = 400;
            throw new Error("user not found")
        }

        if (code !== user.forgotPasswordCode) {
            res.code = 400;
            throw new Error("invalid recovery code")
        }

        const hashedPassword = await hashPassword(password);
        user.password = hashedPassword;
        user.forgotPasswordCode = null;
        await user.save();

        res.status(200).json({
            code: 200,
            status: true,
            message: "Password recoverd successfully"
        })

    }catch(error) {
        next(error)
    }
}
const changePassword = async (req, res, next) => {
    try {
        const { newPassword, oldPassword } = req.body;
        const { _id } = req.user
        const user = await User.findById({ _id })
        if (!user) {
            res.code = 404;
            throw new Error("user not found")
        }

        const match = await comparepassword(oldPassword, user.password);

        if (!match) {
            res.code= 400;
            throw new Error(" old password doesn't match ");
        }

        if (oldPassword === newPassword) {
            res.code = 400;
            throw new Error(" you are providing old password ");
        }

        const hashedPassword = await hashPassword(newPassword);
        user.password = hashedPassword;
        await user.save();


        res.status(200).json({ codea: 200, status: true, message: "Password changed successfully " })
    } catch (error) {
        next(error)
    }
}
const updateProfile =async (req,res,next) =>{
    try {
        const {_id} =req.user;
        const {email ,name,profilePic } =req.body;
        const user =await User.findById(_id).select("-password -verificationCode -forgotPasswordCode");
        if(!user){
        res.code =404;
            throw new Error("no such user");

        }
        if(email){
            
                const isUserExist =await User.findOne({email});
                if(isUserExist && isUserExist.email === email && String(user._id) !== String(isUserExist._id)){
                    res.code = 400;
                    throw new Error("email already exist ");
                }
           
        }
        if(profilePic){
            const file =await File.findById(profilePic)
            if(!file){
                res.code =404;
                throw new Error("fil not found")
            }
        }
        user.name =name ? name : user.name;
        user.email =email ? email : user.email;
        user.profilePic =profilePic;
        if(email){
            user.isVerified =false;

        }
        res.status(200).json({code:200,status:true,message:"user profile updated successfully",data:{user}})


    } catch (error) {
        next(error)
    }
}
const currentUser =async (req,res,next)=>{
    try {
        const {_id} =req.user;
        const user =await User.findById(_id).select("-password -verificationCode -forgotPasswordCode");
        if(!user){
            res.code =404;
            throw new Error("current user not found ") 
        }
        res.status(200).json({
            code:200,status:true,message :"current user found ",data:{user}
        })
    } catch (error) {
        next(error)
    }
}
module.exports = { signup, signin, verifyCode, verify_user, ForgotPasswordCode, recoverPassword, changePassword,updateProfile ,currentUser};