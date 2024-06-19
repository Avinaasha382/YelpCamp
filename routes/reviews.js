const express = require("express");
const router = express.Router({mergeParams:true});
const Campground = require("../models/campgrounds");
const Review = require("../models/review");
const wrapError = require("../utilities/wrapError");
const ExpressError = require("../utilities/errorClass");
const {ReviewSchema} = require("../schemas.js");


const validateReview = function(req,res,next) {
    const result = ReviewSchema.validate(req.body);
    if(result.error)
    {
        return next(new ExpressError(result.error,400));
    }
    else
    {
        next();
    }
}


router.post("/",validateReview,wrapError(async(req,res,next) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review({body:req.body.review.body,rating:req.body.review.rating});
    campground.reviews.push(review);
    await campground.save();
    await review.save();
    res.redirect(`/campgrounds/${campground._id}`);
}))



router.delete("/:reviewId",wrapError(async(req,res,next) => {
    console.log("INSIDE DELETE!!")
    const {id,reviewId} = req.params;
    const campGround = await Campground.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${id}`);

}))

module.exports = router;