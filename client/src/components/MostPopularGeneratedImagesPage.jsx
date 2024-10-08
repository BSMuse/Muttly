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
        const response = await fetch(`${ import.meta.env.VITE_NODE_ENV ? import.meta.env.VITE_APP_API_BASE_URL : 'api' }/mostliked/big`, {
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
      <div className="page-body">
        <div className="header">
          <h1>Most Popular Generated Images</h1>
          <h3>Check-out the generated images that have everyone barking about...</h3>
        </div>

        <div className="image-grid">
          {mostPopularImages.map((image) => (
            <img
              key={image.id}
              src={image.generated_photo_link}               
              alt={`Image ${image.id}`}
              onClick={(event) => openDogBreedCardModal(event, image)}
            />
            ))}
        </div>

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