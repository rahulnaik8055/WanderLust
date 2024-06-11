const listing = require("./models/listen");
const Review = require("./models/reviews");
const ExpressError = require("./utils/ExpressError");
const {listingSchema , reviewSchema} = require("./schema");

module.exports.isLoggedIn = (req,res,next) =>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You must be logged in to create a listing");
        return res.redirect("/login");
       }
       next();
};

module.exports.saveRedirectUrl = (req,res,next) =>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req,res,next) =>{
    let {id}=req.params;
      let Listing = await listing.findById(id);
      if(!Listing.owner[0]._id.equals(res.locals.currUser._id)){
        req.flash("error","You are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
      };
      next();
};

module.exports.validateError = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        throw new ExpressError(400,error);
    }else{
        next();
    }
};

module.exports.validateReview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        throw new ExpressError(400,error);
    }else{
        next();
    }
};

module.exports.isAuthor = async (req,res,next) =>{
    let {id ,reviewId}=req.params;
      let review = await Review.findById(reviewId);
      if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash("error","You are not the owner of this review");
        return res.redirect(`/listings/${id}`);
      };
      next();
};
