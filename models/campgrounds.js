const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Review = require("./review");

const CampgroundSchema = new Schema(
    {
        title:String,
        price:Number,
        description:String,
        location:String,
        image:String,
        reviews:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Review"
            }
        ]
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