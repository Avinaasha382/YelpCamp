const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utilities/errorClass");

const campgrounds = require("./routes/campgrounds");
const reviews = require("./routes/reviews");
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
.then(() => {
    console.log("Connection Successful!!")
})
.catch((err) => {
    console.log("Error",err)
})

const Campground = require("./models/campgrounds");
const Review = require("./models/review");
let methodOverride = require('method-override');
app.use(methodOverride('_method'));


app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.use(express.static("public"));
app.engine("ejs",ejsMate);

app.use("/campgrounds/:id/reviews",reviews);
app.use("/campgrounds",campgrounds);










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