const multer = require("multer");
const path = require("path");
const generateCode = require("../utils/generateCode");
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./uploads")
    },
    filename: (req, file, callback) => {

        const originalName = file.originalname;
        const extension = path.extname(originalName);
        // iam on the 137 5:28
        const filename = originalName.replace(extension, "");
        const compressedFileaname = filename.split(" ").join("_");
        const lowerCaseFilename = compressedFileaname.toLocaleLowerCase();
        const code = generateCode(12);
        const finalFile = `${lowerCaseFilename}_${code}${extension}`
        callback(null, finalFile)

    }
})
const upload = multer({
    storage,
    fileFilter: (req, file, callback) => {
        const mimetype = file.mimetype;
        if (
            mimetype === "image/jpg" ||
            mimetype === "image/png" ||
            mimetype === "image/jpeg" ||
            mimetype === "application/pdf")
             {
                callback(null,true)
        }else{
            callback( new Error("Sorry only .jpg  .jpeg .png .pdf file format is allowed "))
        }
        
}
})
module.exports = upload;