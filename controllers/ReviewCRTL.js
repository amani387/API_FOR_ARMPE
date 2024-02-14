const { Post, User } = require("../modals");
const Review = require("../modals/Review");

const CreateReview = async(req,res,next) =>{
    const {product,message,rating} =req.body;
    //const { _id } = req.user
    try {
        const {id} = req.params;
        const {_id} =req.user
        console.log(_id)
        console.log(id)
        const Postfound =await Post.findById(id).populate('reviews');
        if(!Postfound){
            res.code =404;
            throw new Error("no Post found")
        }
       

        //CHECK IF USER ALREADY REVIEWD THIS PRODUCT 
const hasReviewed = Postfound?.reviews?.find((review)=>{
   
    return review?.user?.toString() === req?.user?._id?.toString()

})
console.log(hasReviewed)
if(hasReviewed){
    res.code = 400;
    throw new Error("you have already Reviewd")

}

        
        //CREATE REVIEW
        const review = await Review.create({
            message,
            rating,
            product:Postfound ?._id,
            user:req.user
        })

        //push the review into product found 

        Postfound.reviews.push(review?._id)
        await Postfound.save();
        res.status(200).json({
            code:200,
            status:true,
            message:"review has been created successfully",
            
        })
    } catch (error) {
        next(error)
    }
}
module.exports =CreateReview;
