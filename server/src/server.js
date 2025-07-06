require('dotenv').config();

// Polyfill for TransformStream in older Node.js versions
if (typeof globalThis.TransformStream === 'undefined') {
  const { TransformStream } = require('stream/web');
  globalThis.TransformStream = TransformStream;
}

// Polyfill for Blob in Node.js environments
if (typeof globalThis.Blob === 'undefined') {
  const { Blob } = require('buffer');
  globalThis.Blob = Blob;
}

// Polyfill for FormData in Node.js environments
if (typeof globalThis.FormData === 'undefined') {
  const FormData = require('form-data');
  globalThis.FormData = FormData;
}

const fs = require('fs');
const express = require("express");
const uniqid = require('uniqid');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 8088; 

const pool = require('./database/connect');


const corsOptions = {
  credentials: true,
  origin: process.env.NODE_ENV ? process.env.DB_NAME : 'http://localhost:5173',
};

app.use(cors(corsOptions)); 

app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: true,
  name: 'muttly',
  cookie: {
    secure: false,
    sameSite: 'Lax',
  },
}));

// serve static files from ../build (needed for React)
const cwd = process.cwd();
const public = path.join(cwd, '..', 'public');
app.use(express.static(public));
// Note: Do Not make a route for "/" below or it will override our static public

// So we can read JSON body requests
app.use(express.json());
app.use(morgan('dev'));


const generateBreed              = require('./routes/generateNewDogObject');
const dogBreedNames              = require('./routes/retrieveAllDogBreeds')
const dogBreedById               = require('./routes/breedById')
const generatedBreedById         = require('./routes/generatedBreedById')
const generatedBreedsByUserId    = require('./routes/generatedBreedIdByUser')
const deleteDogBreed             = require('./routes/deleteBreed')
const mostLikedBreeds            = require('./routes/retrieveMostLikedBreeds')
const mostRecentBreeds           = require('./routes/mostRecentBreeds')
const breedsUserLiked            = require('./routes/breedsUserLiked')
const addNewUser                 = require('./routes/addNewUser')
const login                      = require('./routes/userAuthorization')
const validate                   = require('./routes/verification')
const changeLikeStatus           = require('./routes/likeStatusUpdate')
const logout                     = require('./routes/userLogout')
const likedByUserAndBreed        = require('./routes/likedBreedByUserAndBreedId')
const mostRecentBig              = require('./routes/mostRecentBig')
const userLikedBig               = require('./routes/mostLikedBig')

// const breedDetails    = require('../database/queries/retrieve_dog_breed');


app.use('/mostliked', mostLikedBreeds);
app.use('/mostrecent', mostRecentBreeds);

app.use('/mostliked/big', userLikedBig);
app.use('/mostrecent/big', mostRecentBig);


app.use('/allbreednames', dogBreedNames);
app.use('/breedbyid', dogBreedById);
app.use('/userliked', breedsUserLiked);

app.use('/generatebreed', generateBreed);

app.use('/generated/breedbyid', generatedBreedById);
app.use('/generated/breedbyuserid', generatedBreedsByUserId);
app.use('/generated/delete', deleteDogBreed);
app.use('/generated/likestatus', changeLikeStatus)

app.use('/addnewuser', addNewUser);
app.use('/login', login);
app.use('/logout', logout);
app.use('/validate', validate);
app.use('/generated/genlikebyuserandbreed', likedByUserAndBreed);

app.get('/usertest', (req, res) => {
  res.sendFile(path.join(__dirname, './testpages/newUserTestRoute.html'));
});

app.get('/userlogintest', (req, res) => {
  res.sendFile(path.join(__dirname, './testpages/authorizeUserTest.html'));
});

app.get('/validlogin', (req, res) => {
  res.sendFile(path.join(__dirname, './testpages/validCookie.html'));
});

app.get('/testlogout', (req, res) => {
  res.sendFile(path.join(__dirname, './testpages/logouttest.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(public, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

