


const db = require('../connection');


const dogBreed = (dogBreedId) => {
  return db.query (
    'SELECT good_with_children, good_with_other_dogs,	shedding,	grooming, drooling,	coat_length,	good_with_strangers,	playfulness,	protectiveness,	trainability,	energy,	barking,	max_height_male,	max_height_female,	max_weight_male,	max_weight_female,	min_height_male,	min_height_female,	min_weight_male,	min_weight_female,	name FROM dog_breeds WHERE id = $1;', [dogBreedId])
    .then(data => {
      const dogBreed = data.rows;
      return dogBreed;
    })
    .catch (error => {
      console.error(`An error has occured while fetching the details of authorized to vote poll_id ${dogBreedId}.`, error);
      throw error;
    });

};

module.exports = dogBreed;