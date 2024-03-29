const express =require("express");
const bodyparser =require("body-parser");
const dotenv =require("dotenv");
const cors =require('cors')
dotenv.config();
const path =require("path")
const app =express();
const dbConnect =require("./init/mongodb")
const { authRoute, categoryRoute, fileRoute, PostRoute, ReviewRouter } =require("./routes")
const morgan =require("morgan")
const {errorHandler} =require('./middleware');
const notfound = require("./controllers/notfound");
//init app 

//connect to mongodb
dbConnect();
//third party middleware 
app.use(cors({origin:"*"}))
app.use(express.json({limit:"500mb"}));
app.use(bodyparser.urlencoded({limit:"500mb",extended:true}));
app.use(morgan('dev'));

//route section 
//server static files 
app.use(express.static('public'))
//home route
app.get("/",(req,res)=>{
res.sendFile(path.join("public","index.html"))
})
app.use("/api/v1/auth",authRoute);
app.use("/api/v1/category",categoryRoute);
app.use("/api/v1/file",fileRoute);
app.use("/api/v1/posts",PostRoute);
app.use("/api/v1/review",ReviewRouter);

app.use("*",notfound);
app.use(errorHandler)
module.exports=app

//https://github.com/amani387/API_FOR_ARMPE.git