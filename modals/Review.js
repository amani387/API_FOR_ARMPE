const mongoose =require('mongoose');
const Schema =mongoose.Schema;
const ReviewSchema = new Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user',
            required:[true,"Review must Belong to A user "]
        },
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"post",
            required:[true,"Review must belong to machinery"],

        },
        message:{
            type:String,
            required:[true,"please add a message"],
        },
        rating:{
            type:Number,
            required:[true,"Please add a rating between 1 and 5"],
            min:1,
            max:5,

        }
    },
    {
        timestamps:true,
    }
)
const Review =mongoose.model("Review",ReviewSchema);
module.exports =Review;