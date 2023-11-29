const db = require('../connection');

const addNewGeneratedBreed = (dogBreedData) => {
  const { name, good_with_children, good_with_other_dogs, shedding, grooming, drooling, coat_length, good_with_strangers, protectiveness, trainability, energy, barking, max_height_male, max_height_female, max_weight_male, max_weight_female, min_height_male, min_height_female, min_weight_male, min_weight_female, description, generated_photo_link } = dogBreedData;

  return db.query (
    'INSERT INTO generated_breeds (name, good_with_children, good_with_other_dogs, shedding, grooming, drooling, coat_length, good_with_strangers, protectiveness, trainability, energy, barking, max_height_male, max_height_female, max_weight_male, max_weight_female, min_height_male, min_height_female, min_weight_male, min_weight_female, description, generated_photo_link) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22) RETURNING *;',
    [name, good_with_children, good_with_other_dogs, shedding, grooming, drooling, coat_length, good_with_strangers, protectiveness, trainability, energy, barking, max_height_male, max_height_female, max_weight_male, max_weight_female, min_height_male, min_height_female, min_weight_male, min_weight_female, description, generated_photo_link]
  )
    .then(data => {
      console.log('Returned Data:', data);

      const generatedBreedDetails = data.rows;
      return generatedBreedDetails;
    })
    .catch (error => {
      console.error(`An error has occurred while inserting a new dog breed.`, error);
      throw error;
    });
};

module.exports = addNewGeneratedBreed;