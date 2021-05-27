'use strict'; 

// const cors = require('cors');
// const express = require('express');
const jwksClient = require('jwks-rsa');
const jwt = require('jsonwebtoken');
const UserModel = require('../model/Users');  
const { verify } = require('crypto');

const client = jwksClient ({
    jwksUri: 'https://dev-nt37xvb0.us.auth0.com/.well-known/jwks.json'
});

function verifyToken(token, callback) {
    jwt.verify(token, getKey, {}, (err, user) => {
        if(err){
        console.error('Something Went Wrong');
        return callback(err); 
        }
        
        console.log({user});
        callback(user); 
    }
)};
function getKey(headers, callback) {
    client.getSigningKey(headers.kid, function(err, key) {
        const signingKey = key.publicKey || key.rsaPublicKey; 
        callback(null, signingKey); 
    });
}

// const app = express();
// app.use(cors());
// app.use(express.json());
const Book = {};

Book.getAllBooks = async function(request, response) {
    const token = request.headers.authorization.split(' ')[1];
    verifyToken(token, getBooks);
    
    async function getBooks(user){
    const email = user.email;
    
    await UserModel.find({ email }, (err, person) => {
        if(err) console.error(err);
            if(!person.length){
                person[0] = { email, books: [] }
                const newUser = new UserModel(person[0])
                newUser.save();  
            }
            response.send(person[0].books);
        });
    }
}

Book.addABook = async function(request, response) {
    const token = request.headers.authorization.split(' ')[1];
    console.log(token);
    verifyToken(token, addBook);

    async function addBook(user) {
        const email = user.email;
        const {nameOfBook, descriptionOfBook, statusOfBook} = request.query; 
        
        await UserModel.find({ email }, (err, person) => {
            if(err) console.error(err);
                person[0].books.push({name: nameOfBook, description: descriptionOfBook, status: statusOfBook });
                person[0].save();
                response.send(person[0].books);
        });
    }
}

Book.deleteABook = async function(request, response) {
    const token = request.headers.authorization.split(' ')[1];
    verifyToken(token, deleteBook);
    
    async function deleteBook(user) {
        const indexNum = request.params.index;
        console.log(indexNum);
        const index = parseInt(indexNum);
        const email = user.email;
        
        await UserModel.find({email}, (err, person) => {
            if(err) console.log(err)
            const newBookArray = person[0].books.filter((book, i) => i !== index);
            person[0].books = newBookArray;
            person[0].save();
            response.send('success!');
        })
    }
}

Book.updateABook = async function(request, repsonse) { 
    const token = request.headers.authroization.split(' ')[1]; 
    verifyToken(token, updateBook(user));

    async function updateBook(user) {
        const indexNum = request.params.index;
        const newBook = request.body.newBook;
        const email = user.email; 
        console.log({indexNum, newBook, email})

        await UserModel.find({ email }, (err, person) => {
            if(err) console.error(err);
            person[0].books.splice(indexNum, 1, newBook);
            person[0].save();
            response.send(person[0].books);
        })
    }
}

module.exports = Book;
