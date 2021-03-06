
'use strict';

const mongoose = require('mongoose'); 

const bookSchema = new mongoose.Schema({
        name: {type: String, required: true},
        description: {type: String},
        status: {type: String} 
    });

const userSchema = new mongoose.Schema({
    email: {type: String, required: true}, 
    books:  [bookSchema], 
})
const UserModel = mongoose.model('Users', userSchema);

module.exports= UserModel;


