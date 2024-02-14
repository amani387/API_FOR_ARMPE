const { check, param } =require("express-validator");
const { default: mongoose } = require("mongoose");
const addCategoryValidator =[
    check("title").notEmpty().withMessage("Title is Required")

]
const idValidator =[
    param("id").custom(async(id)=>{
        if(id && !mongoose.Types.ObjectId.isValid(id)){
            throw "Invalid category Id"
        }
    })
]
module.exports ={addCategoryValidator,idValidator};