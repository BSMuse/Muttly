require('dotenv').config();
const fs = require('fs');
// const https = require('https');
const express = require("express");
const uniqid = require('uniqid');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const cors = require('cors');



const app = express();

// const httpsOptions = {
//   key: fs.readFileSync('./key.pem'),
//   cert: fs.readFileSync('./cert.pem'),
//   passphrase: process.env.KEY_PASSPHRASE,
// }


app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));

app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: true,
  name: 'Muttley',
  cookie: {
    secure: false,
    sameSite: 'Lax',
  },
}));

const port = process.env.PORT;


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


// const breedDetails    = require('../database/queries/retrieve_dog_breed');


app.use('/api/mostliked', mostLikedBreeds);
app.use('/api/mostrecent', mostRecentBreeds);

app.use('/api/allbreednames', dogBreedNames);
app.use('/api/breedbyid', dogBreedById);
app.use('/api/userliked', breedsUserLiked);

app.use('/api/generatebreed', generateBreed);

app.use('/api/generated/breedbyid', generatedBreedById);
app.use('/api/generated/breedbyuserid', generatedBreedsByUserId);
app.use('/api/generated/delete', deleteDogBreed);
app.use('/api/generated/likestatus', changeLikeStatus)

app.use('/api/addnewuser', addNewUser);
app.use('/api/login', login);
app.use('/api/validate', validate);

app.get('/usertest', (req, res) => {
  res.sendFile(path.join(__dirname, './testpages/newUserTestRoute.html'));
});

app.get('/userlogintest', (req, res) => {
  res.sendFile(path.join(__dirname, './testpages/authorizeUserTest.html'));
});

app.get('/validlogin', (req, res) => {
  res.sendFile(path.join(__dirname, './testpages/validCookie.html'));
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

