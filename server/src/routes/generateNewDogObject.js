
require('dotenv').config();

const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');



router.use(bodyParser.json());

const muttyAssistent = require('../helpers/openAiApiCall');
const muttyPhotoGen = require('../helpers/leonardoApiCall');
const muttyPhotoFetch = require('../helpers/leonardoApiGetPhoto');
const validateSession = require('../helpers/sessionValidation')


const newGeneratedDog = require('../../database/queries/add_new_generated_dog'); 
const dogBreed = require('../../database/queries/retrieve_breed_for_generation');
const queryRecord = require('../../database/queries/add_generation_record')


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

router.get("/", validateSession, async (req, res) => {
  try {

    const userId = req.session.user.id;
    const dogOneId = req.query.dogOneId;
    const dogTwoId = req.query.dogTwoId;

    // console.log("here is the second dog req", dogTwoId)
    const resultOne = await dogBreed(dogOneId);
    const resultTwo = await dogBreed(dogTwoId);

    // console.log('Result for dog two:', resultTwo);


    const combinedResults = {
      resultOne: resultOne,
      resultTwo: resultTwo
    };

    const dogOneName = resultOne[0].name;
    const dogTwoName = resultTwo[0].name;

    const dogPhotoId = await muttyPhotoGen(dogOneName, dogTwoName);

    console.log("photo ide gen record", dogPhotoId)

    const {jsonObject, threadId} = await muttyAssistent(combinedResults.resultOne, combinedResults.resultTwo);
    console.log("muttyAssistent returned:", jsonObject, "with threadId:", threadId);

    let dogBreedData = jsonObject
    const thread = threadId
    

    while (!dogBreedData.description || dogBreedData.description.trim() === '') {
      console.log('Description is missing or empty. Rerunning the function.');
      dogBreedData = await muttyAssistent(combinedResults.resultOne, combinedResults.resultTwo);
    }

    const parsedDogBreedData = parseNumericalValuesToIntegers(dogBreedData);

    // console.log("here is the pre parsing for special charachters", parsedDogBreedData)

    parsedDogBreedData.description = parsedDogBreedData.description.replace(/[\n+\[\]]/g, '');

    const generationId = dogPhotoId.sdGenerationJob.generationId;


    let dogPhotoUrl;

    while (!dogPhotoUrl || dogPhotoUrl === undefined || dogPhotoUrl === null || dogPhotoUrl === '') {
      dogPhotoUrl = await muttyPhotoFetch(generationId);
      console.log("Current dog URL:", dogPhotoUrl);
    }

    console.log("Final dog URL:", dogPhotoUrl);

    parsedDogBreedData.generated_photo_link = dogPhotoUrl;

    parsedDogBreedData.userId = userId;

    const dogBreedDetails = await newGeneratedDog(parsedDogBreedData);

    const updatedBreed = {
      genId: dogBreedDetails[0].id,
      userId: userId,
      breedOne: dogOneId,
      breedTwo: dogTwoId,
      openAiThread: thread,
      leoGenRecord: generationId
    };

    const extraStats = {
      genId: dogBreedDetails[0].id,
      userId: userId,
      breedOne: dogOneName,
      breedTwo: dogTwoName
    };

    

    await queryRecord(updatedBreed);

    // console.log("last by not least lets work on my query table", updatedBreed)


    console.log('Generated Breed Details:', dogBreedDetails, extraStats);
    res.json({ dogBreedDetails, extraStats });
  } catch (error) {
    console.error('Error in route handler:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;