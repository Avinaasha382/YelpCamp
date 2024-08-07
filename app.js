const mongoSanitize = require('express-mongo-sanitize');

if(process.env.NODE_ENV!=="production")
{
    require("dotenv").config();
}



const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utilities/errorClass");
const session  = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const campgrounds = require("./routes/campgrounds");
const reviews = require("./routes/reviews");
const users = require("./routes/users");
const MongoDBStore = require("connect-mongo")(session);

const dbUrl = process.env.DB_URL;
mongoose.connect(dbUrl)
.then(() => {
    console.log("Connection Successful!!")
})
.catch((err) => {
    console.log("Error",err)
})


const User = require("./models/user");
let methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.use(mongoSanitize());

app.use(express.urlencoded({extended:true}));

const store = new MongoDBStore({
    url:dbUrl,
    secret:"This is a secret",
    touchAfter:24*60*60
})

app.use(session({store,secret:"This is a secret",resave:false,saveUninitialized:true,cookie:{
    expires:Date.now() + 1000*60*60*24*7,
    maxAge:7*24*60*60*1000,
    httpOnly:true
}}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(flash());

app.set("view engine","ejs");
app.use(express.static("public"));
app.engine("ejs",ejsMate);

app.use((req,res,next) => {
   
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    
    next();
})

app.use("/campgrounds/:id/reviews",reviews); 
app.use("/campgrounds",campgrounds);
app.use("/",users);

app.get("/",(req,res,next) => {
    res.render("home.ejs");
})



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