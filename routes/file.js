const isAuth = require("../middleware/isAuth");
const express =require("express");
const { uploadFileCtrl} = require("../controllers");
const upload = require("../middleware/upoad");

const router =express.Router();
router.post('/upload-pdf',isAuth, upload.array('file', 3),uploadFileCtrl.uploadPdf);
router.delete('/:id',isAuth,uploadFileCtrl.deleteFile)
module.exports =router;
