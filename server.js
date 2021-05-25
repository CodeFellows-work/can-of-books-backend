
'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const { request } = require('express');
const mongoose = require('mongoose');

// MONGO_URI = process.env.MONGO_URI; 

const client = jwksClient ({
    jwksUri: 'http://dev-nt37xvb0.us.auth0.com/.well-known/jwks.json'
});
const app = express();
app.use(cors());
// const bookSchema = new mongoose.Schema({
//     name: {type: String, required: true},
//     description: {type: String},
//     status: {type: String} 
// })
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

let newUser = new UserModel({
    email: 'hello email', 
    books: ['hello books']}); 
    await newUser.save(); 


})

const PORT = process.env.PORT || 3050; 



function getKey(header, callback) {
    client.getSigningKey(header.kid, function(err, key) {
        const signInKey = key.publicKey || key.rsaPublicKey; 
        callback(null,signInKey); 
    
    });
}

app.get('/user', (request, response) => {
    const token = request.headers.authorization.split(' ')[1]; 
    jwt.verify(token, getKey, {}, (err, user) => {
        if(err){ 
            response.send("Uh Oh... Something Went Wrong"); 
        }
            response.send(user);
    });
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
