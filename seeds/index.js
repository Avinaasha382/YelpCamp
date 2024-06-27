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


const img = ['https://images.unsplash.com/photo-1504851149312-7a075b496cc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MjI1NTV8MHwxfHNlYXJjaHwxfHxjYW1wfGVufDB8fHx8MTcxODM2MzU5Mnww&ixlib=rb-4.0.3&q=80&w=400',
'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MjI1NTV8MHwxfHNlYXJjaHwyfHxjYW1wfGVufDB8fHx8MTcxODM2MzU5Mnww&ixlib=rb-4.0.3&q=80&w=400',
'https://images.unsplash.com/photo-1471115853179-bb1d604434e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MjI1NTV8MHwxfHNlYXJjaHwzfHxjYW1wfGVufDB8fHx8MTcxODM2MzU5Mnww&ixlib=rb-4.0.3&q=80&w=400',
'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MjI1NTV8MHwxfHNlYXJjaHw0fHxjYW1wfGVufDB8fHx8MTcxODM2MzU5Mnww&ixlib=rb-4.0.3&q=80&w=400',
'https://images.unsplash.com/photo-1528892677828-8862216f3665?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MjI1NTV8MHwxfHNlYXJjaHw1fHxjYW1wfGVufDB8fHx8MTcxODM2MzU5Mnww&ixlib=rb-4.0.3&q=80&w=400',
'https://images.unsplash.com/photo-1525811902-f2342640856e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MjI1NTV8MHwxfHNlYXJjaHw2fHxjYW1wfGVufDB8fHx8MTcxODM2MzU5Mnww&ixlib=rb-4.0.3&q=80&w=400',
'https://images.unsplash.com/photo-1470246973918-29a93221c455?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MjI1NTV8MHwxfHNlYXJjaHw3fHxjYW1wfGVufDB8fHx8MTcxODM2MzU5Mnww&ixlib=rb-4.0.3&q=80&w=400',
'https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MjI1NTV8MHwxfHNlYXJjaHw4fHxjYW1wfGVufDB8fHx8MTcxODM2MzU5Mnww&ixlib=rb-4.0.3&q=80&w=400',
'https://images.unsplash.com/photo-1594495894542-a46cc73e081a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MjI1NTV8MHwxfHNlYXJjaHw5fHxjYW1wfGVufDB8fHx8MTcxODM2MzU5Mnww&ixlib=rb-4.0.3&q=80&w=400',
'https://images.unsplash.com/photo-1571687949921-1306bfb24b72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MjI1NTV8MHwxfHNlYXJjaHwxMHx8Y2FtcHxlbnwwfHx8fDE3MTgzNjM1OTJ8MA&ixlib=rb-4.0.3&q=80&w=400']










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
            image: img[Math.floor(Math.random()*img.length)],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})















