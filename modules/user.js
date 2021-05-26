'use strict'; 

const mongoose = require('mongoose');
const express = require('express');
const BookModel = require('./books');

const app = express();

const userSchema = new mongoose.Schema({
    email: {type: String, required: true}, 
    books: {type: Array}, 
})

const UserModel = mongoose.model('user', userSchema);

mongoose.connect(process.env.MONGO_URI , {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log('DB connection Success for /user')
    let books = await BookModel.find({});
    let newUser = new UserModel({
    email: 'sunnylee3712@gmail.com', 
    books: books  
}); 
    await newUser.save(); 
});  


    

module.exports = UserModel;