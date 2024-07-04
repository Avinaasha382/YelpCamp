const Campground = require("./models/campgrounds");
const Review = require("./models/review");
const {campgroundSchema,reviewSchema} = require("./schemas");
const ExpressError = require("./utilities/errorClass");

function isLoggedIn(req,res,next) {
    if(req.isAuthenticated())
    {
        next();
    }
    else
    {
        req.flash("error","You must be logged in");
        res.redirect("/login")
    }
}

async function isAuthor(req,res,next) {
    const camp = await Campground.findById(req.params.id);
    if(!camp.author.equals(req.user._id))
    {
        req.flash("error","You do not own this campground");
        return res.redirect(`/campgrounds/${req.params.id}`);
    }
    next();
}

async function isReviewAuthor(req,res,next) {
    const review = await Review.findById(req.params.reviewId);
    if(!review.author.equals(req.user._id))
    {
        req.flash("error","You do not own this review");
        return res.redirect(`/campgrounds/${req.params.id}`);
    }
    next();
}

function validateCampground(req,res,next) {
    const result = campgroundSchema.validate(req.body);
    if(result.error)
    {
      return next(new ExpressError(result.error,400));
    }
    else
    {
     next();
    }
}

function validateReview(req,res,next) {
    const result = reviewSchema.validate(req.body);
    if(result.error)
    {
        return next(new ExpressError(result.error,400));
    }
    else
    {
        next();
    }
}

module.exports.isLoggedIn = isLoggedIn;
module.exports.isAuthor = isAuthor;
module.exports.isReviewAuthor = isReviewAuthor;
module.exports.validateCampground = validateCampground;
module.exports.validateReview = validateReview;