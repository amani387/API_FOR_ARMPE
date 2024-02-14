const express = require("express");
const CreateReview = require("../controllers/ReviewCRTL");
const isAuth = require("../middleware/isAuth");
const router =express.Router();
router.post("/:id",isAuth,CreateReview)
module.exports =router;