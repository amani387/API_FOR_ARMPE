const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: String,
  cloudinaryUrl: String,
  createdBy:{
    type:mongoose.Types.ObjectId,ref:"user",required:true
  },
  cloudinaryPublicId:String,
},{
    timestamps:true
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
