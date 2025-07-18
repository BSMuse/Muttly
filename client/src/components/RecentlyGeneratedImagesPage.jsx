import React, { useState, useEffect } from 'react';
import DogBreedCardModal from './DogBreedCardModal';

import '../views/stylesheets/RecentlyGeneratedImagesPage.scss';

const RecentlyGeneratedImagesPage = () => {
  const [ recentlyGeneratedImages, setRecentlyGeneratedImages ] = useState([]);
  const [ selectedImage, setSelectedImage ] = useState(null);
  const [ isOpen, setDogBreedCardModalOpen ] = useState(false);


  const openDogBreedCardModal = (event, image) => {
    console.log('Click Mv!ent:', event);

    if (image && image.generated_photo_link && image.id) {

      setSelectedImage(image)
      setDogBreedCardModalOpen(true)
      
      console.log('Image clicked!', image);
      console.log('Clicked image ID:', image.id);
      console.log('Selected image:', image.generated_photo_link)
      console.log('Clicked image element:', event.target)
    } else {
      console.error('Image object is undefined');
    }
  };

  useEffect(() => {
    const fetchRecentlyGeneratedImages = async () => {
      try {
        const response = await fetch(`${ import.meta.env.VITE_NODE_ENV ? import.meta.env.VITE_APP_API_BASE_URL : 'api' }/mostrecent/big`, {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          const recentlyGen = data.result
          const recentExtraDetails = data.extraDetails

          recentExtraDetails.forEach(detail => {
            const indexToUpdate = recentlyGen.findIndex(image => image.id === detail.genid);
          
            if (indexToUpdate !== -1) {
              recentlyGen[indexToUpdate].dog1 = detail.breedone;
              recentlyGen[indexToUpdate].dog2 = detail.breedtwo;
            }
          });
          setRecentlyGeneratedImages(recentlyGen);
          // console.log('Recently Generated Images:', data);
        } else {
          console.error('Failed to fetch recently generated images:', response.status);
        };
      } catch (error) {
        console.error('Error fetching recently generated images:', error);
      };
    };

    fetchRecentlyGeneratedImages();
  }, []);

  const openDogBreedModal = (image) => {
    setSelectedImage(image);
  };

  const closeDogBreedModal = () => {
    setSelectedImage(null);
  };

  return (
      <div className="page-body">
        {/* Header and Subheader */}
        <div className="header">
          <h1>Most Recently Generated Images</h1>
          <h3>We fetched the most recently generated images for you! Check-out the pack...</h3>
        </div>

        {/* Grid Layout of Images */}
        <div className="image-grid">
          {/* Render a grid of clickable images */}
          {recentlyGeneratedImages.map((image) => (
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
         className="customModalStyle"
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
  );
};

export default RecentlyGeneratedImagesPage;