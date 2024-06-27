const Campground = require("./models/campgrounds");
const Review = require("./models/review");

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

module.exports.isLoggedIn = isLoggedIn;
module.exports.isAuthor = isAuthor;
module.exports.isReviewAuthor = isReviewAuthor;