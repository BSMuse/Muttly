require('dotenv').config();

const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

const userLikedBreedsById = require('../../database/queries/get_user_liked_by_breed_id')
const validateSession = require('../helpers/sessionValidation')
const parentNames = require('../../database/queries/get_breed_name_extra_details')




router.get('/:id', validateSession, async (req, res) => {

try {

  const userId = req.session.user.id;
  const genBreedId = req.params.id


  // console.log("here is my userId attempt to validate:", userId)

  if (!userId) {
    return res.status(400).json({ error: 'Missing dogBreedId in the request' });
  }

  const userLiked = await userLikedBreedsById(userId, genBreedId);

  // console.log('Fetched data dog details:', userLiked);
  const extraDetails = await parentNames(userLiked);

  res.json(userLiked, extraDetails);

} catch (error) {
  console.error('Error executing SQL query:', error);
  res.status(500).json({ error: 'Internal Server Error' });
}
});


module.exports = router;