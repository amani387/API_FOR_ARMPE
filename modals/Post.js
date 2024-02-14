
const mongoose =require("mongoose");
const Review = require("./Review");

//posting schema and 
const postSchema =mongoose.Schema({
    title:{
        type:String,
        required:true,

    },
    description:String, 
    file:{type:mongoose.Types.ObjectId,ref:"File"},
    category:{type:mongoose.Types.ObjectId,ref:"category"},
    updatedBy:{type:mongoose.Types.ObjectId,ref:"user",required:true},
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Review"
    }]
},{
    timestamps:true,
    toJSON:{
        virtuals:true
    },
    
});

//total reviews using virtuals 
postSchema.virtual("totalReviews").get(
    function(){
        const product =this;
        return product?.reviews?.length;     
    }
);

// AVERAGE RATING 
postSchema.virtual("averageRating").get(function(){    
    let ratingTotal = 0;
    const product =this;      
    product?.reviews?.forEach((review) => {       
        ratingTotal += review?.rating;
    });

    //calculating the average rating

    const averageRating =ratingTotal /product?.reviews?.length;
return averageRating;
})

const Post =mongoose.model("post",postSchema);
module.exports =Post;

