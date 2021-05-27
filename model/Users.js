
'use strict';

const mongoose = require('mongoose'); 

const bookSchema = new mongoose.Schema({
        name: {type: String, required: true},
        description: {type: String},
        status: {type: String} 
    });
const BookModel = mongoose.model('books', bookSchema);

const userSchema = new mongoose.Schema({
    email: {type: String, required: true}, 
    books: {type: Array}, 
})
const UserModel = mongoose.model('Users', userSchema);

module.exports= {UserModel, BookModel}


