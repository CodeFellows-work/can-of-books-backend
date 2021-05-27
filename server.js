
'use strict';

require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json()); 


const mongoose = require('mongoose');
const { verify } = require('crypto');

const PORT = process.env.PORT || 3050;


const Book = require('./modules/Book');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

const db = mongoose.connection; 

db.on('error', (error) => console.error(error))
db.once('open', () => {
    console.log('Mongoose is Connected!');
});

app.get('/books', Book.getAllBooks);
app.post('/books', Book.addABook);
app.delete('/books/:index', Book.deleteABook);
app.put('./books/:index', Book.updateABook);

app.listen(PORT, () => console.log(`SERVER IS UP on ${PORT}`));