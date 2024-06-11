const listing = require("../models/listen");
const Review = require("../models/reviews");

module.exports.createReview = (async (req,res)=>{
    console.log(req.params.id);
    let Listing = await listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    Listing.reviews.push(newReview);
    await newReview.save();
    await Listing.save();
    req.flash("success","New Review Created!");
    res.redirect(`/listings/${Listing._id}`);
});

module.exports.deleteReview = (async (req,res)=>{
    let {id,reviewId}= req.params;
    await listing.findByIdAndUpdate(id,{$pull : {reviews : reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted!");
    res.redirect(`/listings/${id}`);
});