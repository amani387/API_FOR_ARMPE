const mongoose =require('mongoose');
const {connection_url} =require("../config/kyes")

const dbConnect =async ()=>{
    mongoose.set("strictQuery",false);
    try {
        const connected =await mongoose.connect(connection_url);
        console.log(`connected to mongodb `)
    } catch (error) {
        console.log(`error : ${error.message}`);
    }};
module.exports =dbConnect