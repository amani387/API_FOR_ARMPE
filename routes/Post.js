const express =require('express');
const router =express.Router();
const isAuth = require('../middleware/isAuth');
const { postcontroller } = require('../controllers');
const { addPostValidator,updatePostValidator,idValidator } = require('../validator/post');
const validate = require("../validator/validate");
const upload = require('../middleware/fileUpload');

//router.post("/",isAuth,addPostValidator,validate,postcontroller.addPost)
router.post("/",isAuth,upload.array('files'),postcontroller.addPost)
router.put("/:id",isAuth,updatePostValidator,idValidator,validate,postcontroller.updatePost)
router.delete("/:id",isAuth,idValidator,postcontroller.deletePost)
router.get("/",isAuth,postcontroller.getPosts)
router.get("/:id",isAuth,idValidator,validate,postcontroller.getPost)
module.exports =router;


//post id;65bddd4dae895dc3affd0e9e
//file ;65bca5b300c0b6da764df361