const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Review = require("./review");

const ImageSchema = new Schema({
    url:String,
    filename:String
})

ImageSchema.virtual("thumbnail").get(function() {
   return this.url.replace("/upload","/upload/w_200");
})

const CampgroundSchema = new Schema(
    {
        title:String,
        price:Number,
        description:String,
        location:String,
        images:[ImageSchema],
        reviews:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Review"
            }
        ],
        author:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    }
)

CampgroundSchema.post("findOneAndDelete",async function(data) {
    console.log(data.reviews);
    if(data)
    {
        await Review.deleteMany({
            _id:{
                $in:data.reviews
            }

        })
    }
})

const Campground = mongoose.model("Campground",CampgroundSchema);

module.exports = Campground;