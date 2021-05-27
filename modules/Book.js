'use strict'; 

const User = require('../model/Users');
// User.collection.drop();  

const Book = {};

Book.getAllBooks = async function(request, response) {
    const email = request.query.email;
    await User.find({ email }, (err, person) => {
    if(err) console.error(err);
    if(!person.length){
        person[0] = { email, books: [] }
        const newUser = new User(person[0])
        newUser.save();
    }
    response.send(person[0].books);
    });
}

Book.addABook = async function(request, response) {
    const {newBook, email} = request.body;
    await User.find({ email }, (err, person) => {
    if(err) console.error(err);
    person[0].books.push(newBook);
    person[0].save();
    response.send(person[0].books);
    })
}

Book.deleteABook = async function(request, response) {
    const indexNum = request.params.index;
    const index = parseInt(indexNum);
    const email = request.query.email;
    await User.find({ email }, (err, person) => {
    if(err) console.error(err);
    const newBookwArray = person[0].books.filter((book, i) => i !== index);
    person[0].books = newBookArray;
    person[0].save();
    response.send('success!');
    })
}

module.exports = Book;

// const User = require('../model/Users');

// const Book = {}; 

// Book.getAllBooks = async function(request, response) {
//     const email = request.query.email; 
//     await User.find({email }, (err, person) => {
//         if(err) console.error(err);
//         if(!person.length){
//             person[0] = {email, books: [] }
//             const newUser = new User(person[0])
//             newUser.save();
//         }
//         response.send(person[0].books);
//     })
// }
// Book.addBook = async function(request, respone) {
//     const {newBook, email} = request.body; 
//     await User.find({email}, (err, person) => {
//         if(err) console.error(err);
//         person[0].books.push(newBook);
//         person[0].save();
//         response.send(person[0].gifts); 
//     })
// }
// Book.deleteABook = async function(response, request) {
//     const index = Number(request.params.index); 
//     const email = request.query.email; 
//     await User.find({email}, (err, person) => {
//         if(err) console.error(err);
//         const newBookArray = person[0].books.filter((book, i) => i !== index);
//         response.send('Success!'); 
//     })
// }

// const mongoose = require('mongoose');


// const bookSchema = new mongoose.Schema({
//     name: {type: String, required: true},
//     description: {type: String},
//     status: {type: String} 
// })

// const BookModel = mongoose.model('books', bookSchema);

// mongoose.connect(process.env.MONGO_URI , {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(async () => {
//     console.log('DB connection Success for /books')

// let firstBook = new BookModel({
//     name: 'Cracking The Coding Interview', 
//     description: 'Founder and CEO of CareerCup.com, goes in-depth with coding interviews.',
//     status: 'available'
// }); 
// await firstBook.save();
// let secondBook = new BookModel({
//     name:'Nier Automata',
//     description:'Aliens and machines have taken over and all within a post-apocolyptic city. After a brutal mission to stop invading forces of machine enemies, 2A - an andorid is the only one left to survive.    ',
//     status: 'available',
// }) 
// await secondBook.save();
// let thirdBook = new BookModel({
//     name: 'Penetration Testing: A Hands-on Introduction to Hacking',
//     description: 'Georgia Weildman, goes through the process of cyberattacks as well as how do do them yourself... legally.',
//     status: 'available'
// })  
// await thirdBook.save();
// })


