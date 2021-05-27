
'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const jwksClient = require('jwks-rsa');
app.use(cors());
app.use(express.json()); 

const Book = require('./modules/Book');
const Users = require('./model/Users');

const mongoose = require('mongoose');
const { verify } = require('crypto');


const PORT = process.env.PORT || 3050;

const client = jwksClient ({
    jwksUri: 'http://dev-nt37xvb0.us.auth0.com/.well-known/jwks.json'
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
console.log('Mongoose is connected')
});

function getKey(header, callback) {
    client.getSigningKey(header.kid, function(err, key) {
        const signInKey = key.publicKey || key.rsaPublicKey; 
        callback(null,signInKey); 
    });
}
function verifyToken(token, callback) {
    jwt.verify(token, getKey, {}, (err, user) => {
        if(err){
            console.error('Something Went Wrong');
            return callback(err); 
        }
        callback(user); 
    }
    )};

app.get('/books', (request, response) => {
    const token = request.headers.authorization.split(' ')[1]; 
    let bookData = Book.getAllBooks
    verifyToken(token, bookData);
    response.send(bookData); 
});

app.post('/books', (request, response) => {
    const token = request.headers.authorization.split(' ')[1];
    let bookAdd = Book.addABook; 
    verifyToken(token, bookAdd);
    response.send(bookAdd);  
});

app.delete('/books/:index', (request, response) => {
    const token = request.headers.authorization.split(' ')[1];
    let bookDelete = Book.deleteABook; 
    verifyToken(token, bookDelete);
    response.send(bookDelete); 
})

app.listen(PORT, () => console.log(`listening on ${PORT}`));

// require('dotenv').config(); 
// const express = require('express'); 
// const app = express(); 
// const cors = require('cors');
// app.use(cors()); 
// app.use(express.json()); 

// const Book = require('./modules/books'); 
// const Users = require('./model/Users');

// const PORT = process.env.PORT || 3050;
// const client = jwksClient ({
//     jwksUri: 'http://dev-nt37xvb0.us.auth0.com/.well-known/jwks.json'
// });

// const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }); 



// const db = mongoose.connection; 
// db.on('error', console.error.bind(console, 'connection error')); 
// db.once('open', function() {
//     console.log('Mongoose is connected')
// });






// function getKey(header, callback) {
//     client.getSigningKey(header.kid, function(err, key) {
//         const signInKey = key.publicKey || key.rsaPublicKey; 
//         callback(null,signInKey); 
//     });
// }
// function verifyToken(token, callback) {
//     jwt.verify(token, getKey, {}, (err, user) => {
//         if(err){
//             console.error('Something Went Wrong');
//             return callback(err); 
//         }
//         callback(user); 
//     }
//     )};

// app.get('/books', (request, response) => {
//     const token = request.headers.authorization.split(' ')[1];
//     verifyToken(token, findBooks); 
//     async function findBooks(user) {
//         let Users = await Users.userModel.find({email: user.email});
//         if(!Users.length) {
//             response.send([]);
//         }
//         response.send(Users[0].books);
//     }
// });
// app.post('/books', Book.addBook, ); 

// app.delete('/book/:index', Book.deleteABook); 

// app.listen(PORT, () => console.log(`listening on ${PORT}`));

// const express = require('express');
// require('dotenv').config();
// const cors = require('cors');
// const jwt = require('jsonwebtoken');
// const jwksClient = require('jwks-rsa');
// const { request, response } = require('express');
// const Users = require('./modules/user.js'); 
// const Books = require('./modules/books.js'); 
// const { lutimesSync } = require('fs');

// const mongoose = require('mongoose');
// MONGO_URI = process.env.MONGO_URI; 

// const client = jwksClient ({
//     jwksUri: 'http://dev-nt37xvb0.us.auth0.com/.well-known/jwks.json'
// });

// const app = express();
// app.use(cors());    
    
// app.get('/books', (request, response) => {
//     const token = request.headers.authorizarition.split(' ')[1]; 
//     verifyToken(token, addBook);
//     async function addBook(user){
//         let Users 
//     }
// });

// app.post('/books', (request, response) => {
//     const bookData = request.body; 
//     const token = request.headers.authorization.split(' ')[1]; 
//     verifyToken(token, addBook); 

//     async function addBook(user) {
//         console.log(user); 
//         let userFromDB = await Users.UserModel.find({email: user.email});
//         let newBook = await Books.BookModel.create({bookData}); 
//         userFromDB[0].books.push(newBooks); 
//         await userFromDB[0].save();
//         response.send(userFromDB[0].books);
//     }
// });




// app.get('/user', (request, response) => {
//     const token = request.headers.authorization.split(' ')[1]; 
//     console.log(token);
//     jwt.verify(token, getKey, {}, (err, user) => {
//         if(err){ 
//             response.send("Uh Oh... Something Went Wrong"); 
//         }
//             response.send(user);
//     });
// });


