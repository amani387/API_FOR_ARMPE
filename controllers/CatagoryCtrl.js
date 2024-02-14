
const { User, Category } = require("../modals");
const addCategory = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const { _id } = req.user;
        const categoryExist = await Category.findOne({ title })
        if (categoryExist) {
            res.code = 400;
            throw new Error("category title already exist")
        }
        const user = await User.findById(_id);
        if (!user) {
            res.code = 404;
            throw new Error("User not Found")
        }

        const newCategory = new Category({
            title,
            description,
            updatedBy: _id
        })
        await newCategory.save();
        res.status(200).json({ code: 200, status: true, message: "Catagory added succssfully " })
    } catch (error) {
        next(error)
    }
}
const uppdateCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { _id } = req.user;
        const { title, description } = req.body;

        const category = await Category.findById(id);
        if (!category) {
            res.code = 404;
            throw new Error("Category not found")
        }
        const isCategoryExist = await Category.findOne({ title })
        //checking if the new category and the existing category are the same i mean handling the category that the user enterd
        if (isCategoryExist && isCategoryExist.title === title && String(isCategoryExist._id) !== String(category._id)) {
            res.code = 404;
            throw new Error("category title already exist ")
        }
        category.title = title ? title : category.title;
        category.description = description;
        category.updatedBy = _id;
        await category.save();

        res.status(200).json({
            code: 200,
            status: true,
            message: "Category updated",
            data: { category },
        })

    } catch (error) {
        next(error)
    }
}
const deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const categoryfound = await Category.findById(id);
        if (!categoryfound) {
            res.code = 404;
            throw new Error("category not found");

        }

        await Category.findByIdAndDelete(id);
        res.status(200).json({
            code: 200,
            status: true,
            message: "catagory deleted succesfully",

        })
    } catch (error) {
        next(error)
    }
}
const getCategory = async (req, res, next) => {
    try {
        const { q, size, page } = req.query;
        let query = {};
        const sizeNumber = parseInt(size);
        const pageNumber = parseInt(page);

        if (q) {
            const search = RegExp(q, "i");
            query = { $or: [{ title: search }, { description: search }] }

        }
        const total = await Category.countDocumens(query);
        const pages = Math.ceil(total / sizeNumber);

        const catagoryList = await Category.find(query).skip((pageNumber - 1) * sizeNumber).limit(sizeNumber).sort({ updatedBy: -1 });
        res.status(200).json({
            code: 200,
            status: true,
            message: "catagory fetched successfully",
            data: { catagoryList, total, pages }
        })
    } catch (error) {
        next(error)
    }
}
/*
 productQuery =Category.find();

 if(req.qurey.name){
   productQuery =productQuery.find({
    name:{
        $regex:req.query.name,$options:"i"
    }
   })
    
}

*/
const getSingleCategory =async (req,res,next)=>{
    try {
        const {id} = req.params;
        const categoryfound =await Category.findById(id)
        if(!categoryfound){
            res.code =404;
            throw new Error("no catagoy found")
        }
        res.status(200).json({
            code:200,
            status:true,
            message:"catagory found successfully",
            data:{categoryfound}

        })
    } catch (error) {
        next(error)
    }
}

module.exports = { addCategory, uppdateCategory, deleteCategory, getCategory ,getSingleCategory}