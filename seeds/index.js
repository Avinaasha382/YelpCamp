const mongoose = require("mongoose");
const cities = require("./cities");
const {descriptors,places} = require("./seedHelpers");
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
.then(() => {
    console.log("Connection Successful!!")
})
.catch((err) => {
    console.log("Error",err)
})




const Campground = require('../models/campgrounds');


const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author:"667d327acde0fa55a732beab",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images:[
                {
                    url: 'https://res.cloudinary.com/dcjazqtmf/image/upload/v1719588987/YelpCamp/zdhdwzqdwkiisigbouom.png',
                    filename:'YelpCamp/zdhdwzqdwkiisigbouom',
                },
                {
                    url: 'https://res.cloudinary.com/dcjazqtmf/image/upload/v1719591863/YelpCamp/tm2juokezvnfidhjcygu.png',
                    filename: 'YelpCamp/tm2juokezvnfidhjcygu'
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})















