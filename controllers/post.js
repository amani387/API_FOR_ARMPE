const { File, Category, Post } = require("../modals");

const addPost = async (req, res, next) => {
    try {
        //converted images is another image upploading middle ware from the config folder
       const convertedImages =req.files.map((file)=>
        file.path
    )
        const { title, description, file, category } = req.body;
        const { _id } = req.user;
        if (file) {
            const isFileExist = await File.findById(file);
            if (!isFileExist) {
                res.code = 404;
                throw new Error("File not Found")
            }
        }
        const isCategoryExist = await Category.findById(category);
        if (!isCategoryExist) {
            res.code = 404;
            throw new Error("Category not found")
        }
        const newPost = new Post({
            title, description, file:convertedImages, category, updatedBy: _id
        })
        await newPost.save();
        res.status(201).json({ code: 201, status: true, message: "Post added successfully" })
    } catch (error) {
        next(error)
    }
}

const updatePost = async (req, res, next) => {
    try {
        const { title, description, file, category } = req.body;
        const { id } = req.params;
        const { _id } = req.user;
        if (file) {
            const isFileExist = await File.findById(file);
            if (!isFileExist) {
                res.code = 404;
                throw new Error("File not Found")
            }
        }
        if (category) {
            const isCategoryExist = await Category.findById(category);
            if (!isCategoryExist) {
                throw new Error("catagory not found ");
            }
        }
        const post = await Post.findById(id);
        if (!post) {
            res.code = 404;
            throw new Error("no post found");

        }

        post.title = title ? title : post.title;
        post.description = description;
        post.file = file;
        post.category = category ? category : post.category;
        post.updatedBy = _id;
        await post.save();
        res.status(200).json({
            code: 200,
            status: true,
            message: "Post updatd successfully"
            , data: { post }
        })
    } catch (error) {
        next(error)
    }
}

const deletePost = async (req, res, net) => {
    try {

        const { id } = req.params;
        const PostExist = await Post.findById(id);
        if (!PostExist) {
            res.code = 404;
            throw new Error("post not found ")
        }
        await Post.findByIdAndDelete(id)
        res.status(200).json({
            code: 200, status: true, message: "post deleted successfully "

        })

    } catch (error) {
        next(error)
    }
}

const getPosts = async (req, res, next) => {

    try {
        const { page, size, q,category } = req.query;
        const pageNumber = parseInt(page) || 1;
        const sizeNumber = parseInt(size) || 10;
        let query = {};
//storage if u cant 
        if (q) {
            const search = new RegExp(q, "i");
            query = {
                $or: [{ title: search }]
            }
        }
        if(category){
            query={...query,category}
        }
        console.log(
            "the qurery is ",query
        )
        
        const total = await Post.countDocuments(query);
        const pages = Math.ceil(total / sizeNumber);
        //check the populate method
        const posts = await Post.find(query).populate('reviews').sort({ updatedBy: -1 }).skip((pageNumber - 1) * sizeNumber).limit(sizeNumber);
            

        res.status(200).json({
            code: 200, status: true, message: "Get Post List Succssfully ",
            data: { posts, pages, total }
        })


    } catch (error) {
        
        next(error)
         
    }
}

const getPost =async(req,res,next)=>{
    
    try {
        const {id} =req.params;
         const post =await Post.findById(id)?.populate('reviews');
if(!post){
    res.code =404;
    throw new Error("no such post exist ");
}

res.status(200).json({
    code:200,status:true,message:"Post successfully fetched",data:{post}
})
    } catch (error) {
        next(error)
    }
}


module.exports = { addPost, updatePost, deletePost ,getPosts,getPost}