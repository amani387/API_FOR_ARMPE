const {cloudinaryApiSecretKey,cloudinaryKey,cloudinaryName}=require('../config/kyes');
const cloudinary =require('cloudinary').v2;
const multer =require('multer');
const {CloudinaryStorage} =require('multer-storage-cloudinary');
cloudinary.config({
    api_secret:cloudinaryApiSecretKey,
    api_key:cloudinaryKey,
    cloud_name:cloudinaryName
})
//create storage engine 
const storage =new CloudinaryStorage({
    cloudinary,
    allowedFormat:['jpg','png','jpeg','pdf'],
    params:{
        folder:"ERMPE-FILE-FOLDER"
    },
});
//INIT MULTER WITH STORAGE ENGINE
const upload =multer({
    storage
})
module.exports =upload;

