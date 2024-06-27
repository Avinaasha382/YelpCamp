const express = require("express");
const router = express.Router({mergeParams:true});
const wrapError = require("../utilities/wrapError");
const {isLoggedIn,isAuthor,isReviewAuthor,validateReview} = require("../middleware");
const reviews = require("../controllers/reviews");

router.post("/",isLoggedIn,validateReview,wrapError(reviews.createReview));
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapError(reviews.deleteReview))

module.exports = router;