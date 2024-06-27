const Campground = require("../models/campgrounds");
const Review = require("../models/review");

module.exports.createReview = async(req,res,next) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review({body:req.body.review.body,rating:req.body.review.rating});
    campground.reviews.push(review);
    review.author = req.user;
    await campground.save();
    await review.save();
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deleteReview = async(req,res,next) => {
    const {id,reviewId} = req.params;
    const campGround = await Campground.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${id}`);

}