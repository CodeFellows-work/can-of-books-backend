'use strict'; 

const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String},
    status: {type: String} 
})

const BookModel = mongoose.model('books', bookSchema);

mongoose.connect(process.env.MONGO_URI , {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log('DB connection Success for /books')

let firstBook = new BookModel({
    name: 'Cracking The Coding Interview', 
    description: 'Founder and CEO of CareerCup.com, goes in-depth with coding interviews.',
    status: 'available'
}); 
await firstBook.save();
let secondBook = new BookModel({
    name:'Nier Automata',
    description:'Aliens and machines have taken over and all within a post-apocolyptic city. After a brutal mission to stop invading forces of machine enemies, 2A - an andorid is the only one left to survive.    ',
    status: 'available',
}) 
await secondBook.save();
let thirdBook = new BookModel({
    name: 'Penetration Testing: A Hands-on Introduction to Hacking',
    description: 'Georgia Weildman, goes through the process of cyberattacks as well as how do do them yourself... legally.',
    status: 'available'
})  
await thirdBook.save();
})

module.exports = BookModel; 
