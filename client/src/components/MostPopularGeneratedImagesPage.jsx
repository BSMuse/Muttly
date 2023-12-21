import React, { useState, useEffect } from 'react';
import DogBreedCardModal from './DogBreedCardModal';

import '../views/stylesheets/MostPopularGeneratedImagePage.scss';

const MostPopularGeneratedImagesPage = () => {
  const [ mostPopularImages, setMostPopularImages ] = useState([]);
  const [ selectedImage, setSelectedImage ] = useState(null);
  const [ isDogBreedCardModalOpen, setDogBreedCardModalOpen ] = useState(false);


  const openDogBreedCardModal = (event, image) => {
    console.log('Click Mv!ent:', event);

    if (image && image.generated_photo_link && image.id) {

      setSelectedImage(image);
      setDogBreedCardModalOpen(true);
      
      console.log('Image clicked!', image);
      console.log('Clicked image ID:', image.id);
      console.log('Selected image:', image.generated_photo_link);
      console.log('Clicked image element:', event.target);
    } else {
      console.error('Image object is undefined');
    }
  };

  useEffect(() => {
    const fetchMostPopularImages = async () => {
      try {
        const response = await fetch('https://muttley.onrender.com/mostliked/big', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          const mostPopular = data.topLikedDetailsResult;
          const popularExtraDetails = data.extraDetails;

          popularExtraDetails.forEach(detail => {
            const indexToUpdate = mostPopular.findIndex(image => image.id === detail.genid);
          
            if (indexToUpdate !== -1) {
              mostPopular[indexToUpdate].dog1 = detail.breedone;
              mostPopular[indexToUpdate].dog2 = detail.breedtwo;;
            };
          });
          console.log("here is the most popular", mostPopular)
          setMostPopularImages(mostPopular);
          // console.log('Most Popular Images state:', mostPopularImages);
          // console.log('Most Popular Images', data);
        } else {
          console.error('Failed to fetch most popular images:', response.status);
        };
      } catch (error) {
        console.error('Error fetching most popular images:', error);
      };
    };

    fetchMostPopularImages();
  }, []);

  const closeDogBreedModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="most-popular-generated-images-page-container">
      {/* Body of the Page */}
      <div className="page-body">
        {/* Header and Subheader */}
        <div className="header">
          <h1>Most Popular Generated Images</h1>
          <h3>Check-out the generated images that have everyone Barking about...</h3>
        </div>

        {/* Grid Layout of Images */}
        <div className="image-grid">
          {/* Render a grid of clickable images */}
          {mostPopularImages.map((image) => (
            <img
              key={image.id}
              src={image.generated_photo_link}               
              alt={`Image ${image.id}`}
              onClick={(event) => openDogBreedCardModal(event, image)}
            />
            ))}
        </div>

        {/* Dog Breed Card Modal */}
        {selectedImage && (
          <DogBreedCardModal 
            id={selectedImage.id}
            image={selectedImage.generated_photo_link}
            shedding={{shedding : selectedImage.shedding}}
            drooling={{drooling : selectedImage.drooling}}
            protectiveness={{protectiveness : selectedImage.protectiveness}}
            energy={{energy : selectedImage.energy}}
            barking={{barking : selectedImage.barking}}
            height={[
              selectedImage.max_height_female,
              selectedImage.max_height_male,
              selectedImage.min_height_female,
              selectedImage.min_height_male,
            ]} 
            weight={[ 
              selectedImage.max_weight_female,
              selectedImage.max_weight_male,
              selectedImage.min_weight_female,
              selectedImage.min_weight_male
            ]}
            name={selectedImage.name}
            description={selectedImage.description}
            dog1={selectedImage.dog1}
            dog2={selectedImage.dog2}
            onClose={closeDogBreedModal}
            isOpen={isDogBreedCardModalOpen} 
            feed = {true}
          />
        )}
      </div>
    </div>
  );
};

export default MostPopularGeneratedImagesPage;