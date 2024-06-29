const Campground = require("../models/campgrounds");
const {cloudinary} = require("../cloudinary/index");

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
    for(let f of req.files)
    {
        console.log(f.path)
        console.log(f.filename);
        newCamp.images.push({url:f.path,filename:f.filename});
    }
    await newCamp.save();
    console.log(newCamp);
    req.flash("success","Successfully created a campground");
    res.redirect(`/campgrounds/${newCamp._id}`);
    
}

module.exports.getCampground = async (req,res) => {
    //console.log("Hi");
    const campground = await Campground.findById(req.params.id).populate(
        {
            path:"reviews",
            populate:{
                path:"author"
            }
        }
    ).populate("author");
   // console.log(campground);
    if(!campground)
    {
        req.flash("error","Cannot find campground");
        res.redirect("/campgrounds");
    }
    else
    {
        for(let i=0;i<campground.images.length;i++)
        {
            console.log(campground.images[i].url);
        }
    res.render("./campgrounds/show",{campground});
    }
}

module.exports.updateCampground = async (req,res) => {
    const camp_location = req.body.campground.location;
    const camp_title = req.body.campground.title;
    const camp_url = req.body.campground.url;
    const camp_price = req.body.campground.price;
    const camp_description = req.body.campground.description;
    const campground = await Campground.findByIdAndUpdate(req.params.id,{title:camp_title,location:camp_location,price:camp_price,description:camp_description,image:camp_url});
    console.log(req.body);
    for(let f of req.files)
    {
        campground.images.push({url:f.path,filename:f.filename});
    }
    await campground.save();

    if(req.body.deleteImages)
    {
        for(let filename of req.body.deleteImages)
        {
            await cloudinary.uploader.destroy(filename);  
        }
        await campground.updateOne({$pull:{images:{filename:{$in:req.body.deleteImages}}}});
        console.log(campground);
    }

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