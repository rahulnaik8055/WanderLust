const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const listing = require("../models/listen");
const Review = require("../models/reviews.js");
const {validateReview, isLoggedIn , isAuthor} = require("../middleware.js");
const reviewController = require("../controllers/review.js");





//Post Review Route
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview));

//Delete Review Route
router.delete("/:reviewId",isLoggedIn,isAuthor,wrapAsync(reviewController.deleteReview));

module.exports = router;