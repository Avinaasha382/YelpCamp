const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utilities/errorClass");
const wrapError = require("./utilities/wrapError");
const {CampgroundSchema} = require("./schemas.js")
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
.then(() => {
    console.log("Connection Successful!!")
})
.catch((err) => {
    console.log("Error",err)
})

const Campground = require("./models/campgrounds");
let methodOverride = require('method-override');
app.use(methodOverride('_method'));


app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");

app.engine("ejs",ejsMate);

const validateCampground = function(req,res,next) {
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

app.get("/campgrounds",async (req,res) => {
    const campgrounds = await Campground.find({});
    res.render("./campgrounds/index",{campgrounds});
})

app.get("/campgrounds/new",(req,res) => {
    res.render("./campgrounds/new");
})

app.post("/campgrounds",validateCampground,wrapError(async (req,res,next) => {
    
    const camp_location = req.body.campground.location;
    const camp_title = req.body.campground.title;
    const camp_url = req.body.campground.url;
    const camp_price = req.body.campground.price;
    const camp_description = req.body.campground.description;

    const newCamp = new Campground({title:camp_title,location:camp_location,price:camp_price,image:camp_url,description:camp_description});
    await newCamp.save();

    res.redirect(`/campgrounds/${newCamp._id}`);
    
}))

app.get("/campgrounds/:id",wrapError(async (req,res) => {
    const campground = await Campground.findById(req.params.id);
    res.render("./campgrounds/show",{campground});
}))

app.get("/campgrounds/:id/edit",wrapError(async (req,res) => {
    const campground = await Campground.findById(req.params.id);
    res.render("./campgrounds/edit",{campground});
}))

app.put("/campgrounds/:id",validateCampground,wrapError(async (req,res) => {
    const camp_location = req.body.campground.location;
    const camp_title = req.body.campground.title;
    const camp_url = req.body.campground.url;
    const camp_price = req.body.campground.price;
    const camp_description = req.body.campground.description;
    const campground = await Campground.findByIdAndUpdate(req.params.id,{title:camp_title,location:camp_location,price:camp_price,description:camp_description,image:camp_url});
    res.redirect(`/campgrounds/${campground._id}`);
}))

app.delete("/campgrounds/:id",wrapError(async (req,res) => {
    await Campground.findByIdAndDelete(req.params.id);
    res.redirect("/campgrounds");
}))

app.all("*",(req,res,next) => {
    return next(new ExpressError("Cannot Find Page",404));
})

app.use((err,req,res,next) => {
    console.log("Ok");
    const {statusCode = 500, message = "Error"} = err;
    console.log(message);
    res.status(statusCode).render("error",{err});
})

app.listen(3000,() => {
    console.log("Listening from port 3000")
})