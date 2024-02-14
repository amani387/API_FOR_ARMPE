const express =require("express");
const router =express.Router();
const {authController} =require("../controllers")
const {signupValidator,signinValidator,emailvalidator,verifyUserValidator,recoverPasswordValidator, changePasswordValidator,updateProfileValidator} =require("../validator/auth");
const validate = require("../validator/validate");
const isAuth = require("../middleware/isAuth");

router.post("/signup",signupValidator,validate,authController.signup);
router.post('/signin',signinValidator,validate,authController.signin)
router.post("/send-verification-email",emailvalidator,validate,authController.verifyCode)
router.post("/verify-user",verifyUserValidator,validate,authController.verify_user)
router.post("/forgot-password-code",emailvalidator,validate,authController.ForgotPasswordCode)
router.post("/recover-password",recoverPasswordValidator,validate,authController.recoverPassword)
router.put("/change-password",changePasswordValidator,validate,isAuth,authController.changePassword)
router.put("/update-profile",isAuth,updateProfileValidator,validate,authController.updateProfile)
router.get("/current-user",isAuth,authController.currentUser)


module.exports = router;