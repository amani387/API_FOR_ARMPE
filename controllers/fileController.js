// fileController.js

const cloudinary = require('../utils/cloudinary');
const {File }= require('../modals'); 
const upload = require('../middleware/upoad');
const path = require("path")
const uploadPdf = async (req, res) => {
  try {
      // Assuming the 'files' field is being handled by Multer middleware
      const filePromises = req.files.map(async (file) => {
          const result = await cloudinary.uploader.upload(file.path, {
              resource_type: 'auto', // Let Cloudinary auto-detect the resource type
          });

          // Save file information to MongoDB
          const newFile = new File({
              filename: file.originalname,
              cloudinaryUrl: result.url,
              createdBy: req.user._id,
              cloudinaryPublicId: result.public_id,
          });

          await newFile.save();

          return { filename: file.originalname, url: result.url };
      });

      // Wait for all uploads to complete
      const cloudinaryResults = await Promise.all(filePromises);

      // Return the Cloudinary URLs to the client
      res.json({ files: cloudinaryResults });
  } catch (error) {
      console.error('Error uploading files:', error);
      res.status(500).json({ error: 'Failed to upload files' });
      next(error)
  }
};
const deleteFile =async(req,res,next)=>{

    try{
const {id} = req.params;
console.log("the id is ",id)
        const file = await File.findById(id);
        console.log("the fil is ",file)
      if(!file){
        res.code =404;
        throw new Error("file not found")
      }
       // Delete the file from Cloudinary using its public ID
       await cloudinary.uploader.destroy(file.cloudinaryPublicId)
 // Remove the file record from MongoDB
       await File.findByIdAndDelete(id);
      res.json({ message: 'File deleted successfully' });
    }catch(error){
        
        next(error);
        
    }
  }

module.exports = { uploadPdf,deleteFile };
