const db = require('../connection');

const addNewGeneratedBreed = (dogBreedData) => {
  const { good_with_children, good_with_other_dogs, shedding, grooming, drooling, coat_length, good_with_strangers, protectiveness, trainability, energy, barking, max_height_male, max_height_female, max_weight_male, max_weight_female, min_height_male, min_height_female, min_weight_male, min_weight_female, description, generated_photo_link, userId, name } = dogBreedData;

  return db.query (
    'INSERT INTO generated_breeds (good_with_children, good_with_other_dogs, shedding, grooming, drooling, coat_length, good_with_strangers, protectiveness, trainability, energy, barking, max_height_male, max_height_female, max_weight_male, max_weight_female, min_height_male, min_height_female, min_weight_male, min_weight_female, description, generated_photo_link, user_id, name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23) RETURNING *;',
    [good_with_children, good_with_other_dogs, shedding, grooming, drooling, coat_length, good_with_strangers, protectiveness, trainability, energy, barking, max_height_male, max_height_female, max_weight_male, max_weight_female, min_height_male, min_height_female, min_weight_male, min_weight_female, description, generated_photo_link, userId, name]
  )
    .then(data => {
      console.log(data)
      const generatedBreedDetails = data.rows;
      return generatedBreedDetails;
    })
    .catch (error => {
      console.error(`An error has occurred while inserting a new dog breed.`, error);
      throw error;
    });
};

module.exports = addNewGeneratedBreed;