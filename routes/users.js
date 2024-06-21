const express = require("express");
const router = express.Router({mergeParams:true});
const User = require("../models/user");
const wrapError = require("../utilities/wrapError");
const ExpressError = require("../utilities/errorClass");
const passport = require("passport");
const {isLoggedIn} = require("../middleware");
router.get("/register",(req,res) => {
    res.render("./users/register");
})

router.post("/register",wrapError(async (req,res) => {
    try {
    const {username,email,password} = req.body;
    const user = new User({email,username});
    const registeredUser = await User.register(user,password);
    console.log(registeredUser);
    req.flash("success","Welcome to YelpCamp!");
    res.redirect("/campgrounds");
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

module.exports = router;