const express =require("express");
const router =express.Router();
const {categoryCtrl} =require("../controllers");
const {addCategoryValidator,updateCategoryValidator,idValidator} = require("../validator/catagory");

const validate = require("../validator/validate");
const isAuth = require("../middleware/isAuth");
const isAdmin = require("../middleware/isAdmin");

router.post("/",isAuth,isAdmin,addCategoryValidator,validate,categoryCtrl.addCategory)
router.put("/:id",isAuth,isAdmin,idValidator,validate,categoryCtrl.uppdateCategory)
router.delete("/:id",isAuth,isAdmin,idValidator,categoryCtrl.deleteCategory)
router.get("/",isAuth,categoryCtrl.getCategory)
router.get("/:id",isAuth,idValidator,categoryCtrl.getSingleCategory)
module.exports=router