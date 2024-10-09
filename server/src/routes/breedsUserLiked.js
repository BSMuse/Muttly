require('dotenv').config();

const express = require('express');
const router = express.Router();

const userLikedBreeds = require('../../database/queries/get_breeds_user_liked');
const validateSession = require('../helpers/sessionValidation');
const breedParentNames = require('../../database/queries/get_breed_name_extra_details');

router.get('/', validateSession, async (req, res) => {
  try {
    const userId = req.session.user.id;

    if (!userId) {
      return res.status(400).json({ error: 'Missing userId in the request' });
    }

    const userLiked = await userLikedBreeds(userId);
    const userLikedIds = userLiked.map((breed) => breed.id); // Convert to an array of IDs

    // Handle case where userLikedIds is empty
    if (userLikedIds.length === 0) {
      return res.json({ userLiked, extraDetails: [] });
    }

    const extraDetails = await breedParentNames(userLiked);

    res.json({ userLiked, extraDetails });
  } catch (error) {
    console.error('Error executing SQL query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
