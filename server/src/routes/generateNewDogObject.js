
require('dotenv').config();

const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');



router.use(bodyParser.json());

const muttyAssistent = require('./openAiApiCall');
const muttyPhotoGen = require('./leonardoApiCall');


const newGeneratedDog = require('../../database/queries/add_new_generated_dog'); 
const dogBreed = require('../../database/queries/retrieve_dog_breed');


const parseNumericalValuesToIntegers = (data) => {
  const result = {};
  for (const key in data) {
    if (!isNaN(data[key])) {
      result[key] = parseInt(data[key]);
    } else {
      result[key] = data[key];
    }
  }
  return result;
};

router.get("/", async (req, res) => {
  try {
  
    // Fetch data for dog one and dog two
    const dogOneId = req.query.dogOneId;
    const dogTwoId = req.query.dogTwoId;

    console.log("here is the second dog req", dogTwoId)
    const resultOne = await dogBreed(dogOneId);
    const resultTwo = await dogBreed(dogTwoId);

    console.log('Result for dog two:', resultTwo);


    // Combine the results into a single object
    const combinedResults = {
      resultOne: resultOne,
      resultTwo: resultTwo
    };

    const dogOneName = resultOne[0].name;
    const dogTwoName = resultTwo[0].name;


    console.log("checking for the damn dog passover", combinedResults.resultOne)
    console.log("checking for the secopnd damn dog passover", combinedResults.resultTwo)

    console.log("here is my attempt to pull the name for my leonardo api", dogOneName);


    let dogBreedData = await muttyAssistent(combinedResults.resultOne, combinedResults.resultTwo);

    while (!dogBreedData.description || dogBreedData.description.trim() === '') {
      console.log('Description is missing or empty. Rerunning the function.');
      dogBreedData = await muttyAssistent(combinedResults.resultOne, combinedResults.resultTwo);
    }

    const parsedDogBreedData = parseNumericalValuesToIntegers(dogBreedData);

    const dogPhotoUrl = await muttyPhotoGen(dogOneName, dogTwoName);

    parsedDogBreedData.generated_photo_link = dogPhotoUrl;
   

    // Insert into the database
    const generatedBreedDetails = await newGeneratedDog(parsedDogBreedData);


    console.log('Generated Breed Details:', generatedBreedDetails);
    res.json({ muttyResult: parsedDogBreedData });
  } catch (error) {
    console.error('Error in route handler:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;