const express = require("express");
const router = express.Router({mergeParams:true});
const User = require("../models/user");
const wrapError = require("../utilities/wrapError");
const ExpressError = require("../utilities/errorClass");
const passport = require("passport");
const {isLoggedIn,isReviewAuthor} = require("../middleware");
router.get("/register",(req,res) => {
    res.render("./users/register");
})

router.post("/register",wrapError(async (req,res) => {
    try {
    const {username,email,password} = req.body;
    const user = new User({email,username});
    const registeredUser = await User.register(user,password);
    console.log(registeredUser);
    res.redirect("/login");
    }
    catch(e) {
        req.flash("error",e.message);
        res.redirect("/register");
    }
}))

router.get("/login",(req,res) => {
    res.render("./users/login");
})

router.post("/login",passport.authenticate("local",{failureFlash:true,failureRedirect:"/login"}),(req,res) => {
    req.flash("success","Welcome to YelpCamp!");
    res.redirect("/campgrounds");
})

router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/campgrounds');
    });
});

module.exports = router;