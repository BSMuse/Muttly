

require('dotenv').config();

const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

const breedDetails = require('../../database/queries/retrieve_dog_breed');
const validateSession = require('../helpers/sessionValidation')



router.get('/:id', async (req, res) => {

try {

  const userId = req.session.user.id;


  const dogBreedId = req.params.id;

  if (!dogBreedId) {
    return res.status(400).json({ error: 'Missing dogBreedId in the request' });
  }

  const dogBreedDetails = await breedDetails(dogBreedId);

  console.log('Fetched data dog details:', dogBreedDetails);


  res.json(dogBreedDetails);

} catch (error) {
  console.error('Error executing SQL query:', error);
  res.status(500).json({ error: 'Internal Server Error' });
}
});


module.exports = router;