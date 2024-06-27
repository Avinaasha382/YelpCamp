const Campground = require("../models/campgrounds");

module.exports.index = async (req,res) => {
    const campgrounds = await Campground.find({});
    res.render("./campgrounds/index",{campgrounds});
}

module.exports.renderNewForm = (req,res,next) => {
    res.render("./campgrounds/new");
}

module.exports.createCampground = async (req,res,next) => {
    
    const camp_location = req.body.campground.location;
    const camp_title = req.body.campground.title;
    const camp_url = req.body.campground.url;
    const camp_price = req.body.campground.price;
    const camp_description = req.body.campground.description;
    const camp_author = req.user;
    const newCamp = new Campground({title:camp_title,location:camp_location,price:camp_price,image:camp_url,description:camp_description,author:camp_author});
    await newCamp.save();
    req.flash("success","Successfully created a campground");
    res.redirect(`/campgrounds/${newCamp._id}`);
    
}

module.exports.getCampground = async (req,res) => {
    console.log("Hi");
    const campground = await Campground.findById(req.params.id).populate(
        {
            path:"reviews",
            populate:{
                path:"author"
            }
        }
    ).populate("author");
    console.log(campground);
    if(!campground)
    {
        req.flash("error","Cannot find campground");
        res.redirect("/campgrounds");
    }
    else
    res.render("./campgrounds/show",{campground});
}

module.exports.updateCampground = async (req,res) => {
    const camp_location = req.body.campground.location;
    const camp_title = req.body.campground.title;
    const camp_url = req.body.campground.url;
    const camp_price = req.body.campground.price;
    const camp_description = req.body.campground.description;
    const campground = await Campground.findByIdAndUpdate(req.params.id,{title:camp_title,location:camp_location,price:camp_price,description:camp_description,image:camp_url});
    req.flash("success","Successfully updated campground");
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.renderUpdateForm = async (req,res) => {
    const campground = await Campground.findById(req.params.id);
    res.render("./campgrounds/edit",{campground});
}

module.exports.deleteCampground = async (req,res) => {
    await Campground.findByIdAndDelete(req.params.id).populate("reviews");
    req.flash("success","Successfully deleted campground");
    res.redirect("/campgrounds");
}