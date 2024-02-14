const {validationResult} =require("express-validator");
const validate =(req,res,next)=>{
    const error = validationResult(req);
   const mappedError ={};
   if(Object.keys(error.errors).length === 0){
    next()
   }else{
    error.errors.map((error)=>{
        mappedError[error.path] = error.msg
    })
    res.status(400).json(mappedError);
   }
}
module.exports=validate;