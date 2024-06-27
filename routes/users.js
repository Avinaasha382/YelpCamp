const express = require("express");
const router = express.Router({mergeParams:true});
const wrapError = require("../utilities/wrapError");
const passport = require("passport");
const users = require("../controllers/users");
router.get("/register",(req,res) => {
    res.render("./users/register");
})

router.post("/register",wrapError(users.createUser));

router.get("/login",users.renderLoginForm);

router.post("/login",passport.authenticate("local",{failureFlash:true,failureRedirect:"/login"}),users.login);

router.get('/logout', users.logout);

module.exports = router;