const express = require("express");
const router = express.Router();
const Campground = require("../models/campgrounds");
const wrapError = require("../utilities/wrapError");
const ExpressError = require("../utilities/errorClass");
const {CampgroundSchema} = require("../schemas.js");


const validateCampground = function(req,res,next) {
    console.log("Hi")
    console.log(req.body)
    const result = CampgroundSchema.validate(req.body);
    if(result.error)
    {
      return next(new ExpressError(result.error,400));
    }
    else
    {
     next();
    }
}



router.get("/",async (req,res) => {
    const campgrounds = await Campground.find({});
    res.render("./campgrounds/index",{campgrounds});
})

router.get("/new",(req,res) => {
    res.render("./campgrounds/new");
})

router.post("/",validateCampground,wrapError(async (req,res,next) => {
    
    const camp_location = req.body.campground.location;
    const camp_title = req.body.campground.title;
    const camp_url = req.body.campground.url;
    const camp_price = req.body.campground.price;
    const camp_description = req.body.campground.description;

    const newCamp = new Campground({title:camp_title,location:camp_location,price:camp_price,image:camp_url,description:camp_description});
    await newCamp.save();
    req.flash("success","Successfully created a campground");
    res.redirect(`/campgrounds/${newCamp._id}`);
    
}))

router.get("/:id",wrapError(async (req,res) => {
    console.log("Hi");
    const campground = await Campground.findById(req.params.id).populate("reviews");
    if(!campground)
    {
        req.flash("error","Cannot find campground");
        res.redirect("/campgrounds");
    }
    else
    res.render("./campgrounds/show",{campground});
}))

router.get("/:id/edit",wrapError(async (req,res) => {
    const campground = await Campground.findById(req.params.id);
    res.render("./campgrounds/edit",{campground});
}))

router.put("/:id",validateCampground,wrapError(async (req,res) => {
    const camp_location = req.body.campground.location;
    const camp_title = req.body.campground.title;
    const camp_url = req.body.campground.url;
    const camp_price = req.body.campground.price;
    const camp_description = req.body.campground.description;
    const campground = await Campground.findByIdAndUpdate(req.params.id,{title:camp_title,location:camp_location,price:camp_price,description:camp_description,image:camp_url});
    req.flash("success","Successfully updated campground");
    res.redirect(`/campgrounds/${campground._id}`);
}))

router.delete("/:id",wrapError(async (req,res) => {
    await Campground.findByIdAndDelete(req.params.id).populate("reviews");
    req.flash("success","Successfully deleted campground");
    res.redirect("/campgrounds");
}))

module.exports = router;