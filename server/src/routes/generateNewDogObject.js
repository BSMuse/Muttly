require('dotenv').config();

const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');



router.use(bodyParser.json());

const muttyAssistent = require('../helpers/textGenerationApi');
const replicatePhotoGen = require('../helpers/imageGenerationApi');
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
    const resultOne = await dogBreed(dogOneId);
    const resultTwo = await dogBreed(dogTwoId);
    const combinedResults = {
      resultOne: resultOne,
      resultTwo: resultTwo
    };
    const dogOneName = resultOne[0].name;
    const dogTwoName = resultTwo[0].name;
    // Generate the image using Replicate and get the Supabase public URL
    const dogPhotoId = await replicatePhotoGen(dogOneName, dogTwoName);
    console.log("photo ide gen record", dogPhotoId);
    const {jsonObject, threadId} = await muttyAssistent(combinedResults.resultOne, combinedResults.resultTwo);
    console.log("muttyAssistent returned:", jsonObject, "with threadId:", threadId);
    let dogBreedData = jsonObject;
    const thread = threadId;
    while (!dogBreedData.data.description || dogBreedData.data.description.trim() === '') {
      console.log('Description is missing or empty. Rerunning the function.');
      dogBreedData = await muttyAssistent(combinedResults.resultOne, combinedResults.resultTwo); 
    }
    const { blend, description } = dogBreedData.data;
    let parsedDogBreedData = parseNumericalValuesToIntegers(blend); 
    parsedDogBreedData.description = description;
    if (typeof parsedDogBreedData.description === 'string') {
      parsedDogBreedData.description = parsedDogBreedData.description.replace(/[\n+\[\]]/g, '');
    } else {
      console.error('Description is not a string:', parsedDogBreedData.description);
    }
    parsedDogBreedData.generated_photo_link = dogPhotoId.publicUrl;
    parsedDogBreedData.userId = userId;
    // Decide if this dog should be holographic (10% chance)
    const isHolo = Math.random() < 0.1;
    const holoVariant = isHolo ? Math.floor(Math.random() * 3) + 1 : 0;
    parsedDogBreedData.is_holo = isHolo;
    parsedDogBreedData.holo_variant = holoVariant;
    console.log("parsedDogBreedData:", parsedDogBreedData);
    const dogBreedDetails = await newGeneratedDog(parsedDogBreedData);
    const updatedBreed = {
      genId: dogBreedDetails[0].id,
      userId: userId,
      breedOne: dogOneId,
      breedTwo: dogTwoId,
      openAiThread: thread,
      replicateOutputUrl: dogPhotoId.replicateOutputUrl
    };
    const extraStats = {
      genId: dogBreedDetails[0].id,
      userId: userId,
      breedOne: dogOneName,
      breedTwo: dogTwoName
    };
    await queryRecord(updatedBreed);
    console.log('Generated Breed Details:', dogBreedDetails, extraStats);
    res.json({ dogBreedDetails, extraStats });
  } catch (error) {
    console.error('Error in route handler:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;