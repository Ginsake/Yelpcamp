
const mongoose = require('mongoose');

const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers')
const Campground = require('../models/campground');
 
mongoose.connect('mongodb://192.168.68.117:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Database connected")
})
 
const sample = (array) => array[Math.floor(Math.random() * array.length)]


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
         const random1000 = Math.floor(Math.random() * 1000);
         const price = Math.floor(Math.random() * 20) + 10;
         const camp = new Campground({
            author: '661ea4fbd16085b11edd7ebf',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title:  `${sample(descriptors)} ${sample(places)}`,
            description: 'SPLATOON',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dyvbduscr/image/upload/v1714780066/YelpCamp/lptgxovss97wik616lwa.jpg',
                    filename: 'YelpCamp/lptgxovss97wik616lwa',
                  },
            ]
        })
        await camp.save();
    }
} 

 
seedDB().then(() => {
    mongoose.connection.close();
})
