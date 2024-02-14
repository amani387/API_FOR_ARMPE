const  notfound=(req,res,next)=>{
return res.status(404).json({code:404,status:false,message:"Sorry Api not Found"});
}
module.exports=notfound;