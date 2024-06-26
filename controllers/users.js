const User = require("../models/user");

module.exports.createUser = async (req,res) => {
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
}

module.exports.renderLoginForm = (req,res) => {
    res.render("./users/login");
}

module.exports.login = (req,res) => {
    req.flash("success","Welcome to YelpCamp!");
    res.redirect("/campgrounds");
}

module.exports.logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/campgrounds');
    });
}