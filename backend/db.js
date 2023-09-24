//this file is used to connect mongo db with express js .The String we are passing mongoUri of our system localhost

const mongoose = require('mongoose');  //like importing

//const mongoURI = "mongodb://127.0.0.1:27017/inotebook" //mongodb://localhost:3000
const mongoURI = "mongodb+srv://ashish:111111As@cluster0.bf0shcd.mongodb.net/inotebook?retryWrites=true&w=majority" //mongodb://localhost:3000

const connectToMongo = () => {                  //this function should in index js but to increase readbilit of our project we create separate component and 
                                                //calling this function from index.js
    mongoose.connect(mongoURI);
    console.log("connected to mongo successfully");

}

module.exports = connectToMongo; 