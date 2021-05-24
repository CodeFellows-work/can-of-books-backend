
'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

// Follows along with Lab tutorial 
const client = jwksClient ({
    jwksUri: 'http://dev-nt37xvb0.us.auth0.com/.well-known/jwks.json'
})
function getKey(header, callback) {
    client.getSigningKey(header.kid, function(err, key) {
        const signInKey = key.publicKey || key.rsaPublicKey; 
        callback(null,signInKey); 
    } )
}

app.get('/user', (request, response) => {
    const token = request.headers.authorization.split(' ')[1]; 
    jwt.verify(token, getKey, {}, (err, user) => {
        if(err){ 
            response.send("Uh Oh... Something Went Wrong"); 
        }
            response.send(user);
    });

  // TODO: 
  // STEP 1: get the jwt from the headers
  // STEP 2. use the jsonwebtoken library to verify that it is a valid jwt
  // jsonwebtoken dock - https://www.npmjs.com/package/jsonwebtoken
  // STEP 3: to prove that everything is working correctly, send the opened jwt back to the front-end

})

app.listen(PORT, () => console.log(`listening on ${PORT}`));

//Domain
//dev-nt37xvb0.us.auth0.com
// ClientID 
//xq8PHihp3RkyWMdVkjvU5hA92Wb9PrTf