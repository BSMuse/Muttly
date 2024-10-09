import React, { useState, useEffect } from 'react';
import WaitOnGenerateModal from '../components/WaitOnGenerateModal';
import DogBreedCardModal from '../components/DogBreedCardModal';

import '../views/mobilestylesheets/MobileGenerateMixedBreedPage.scss';

const MobileGenerateMixedBreedPage = () => {

  const [ dogOptions, setOptions ] = useState([]);
  const [ selectedBreedOne, setDogOneBreed ] = useState(null);
  const [ selectedBreedTwo, setDogTwoBreed ] = useState(null);
  const [ optionsList, setOptionsList ] = useState([]);
  const [ firstDog, setFirstDog ]= useState(null);
  const [ secondDog, setSecondDog ]= useState(null);
  const [ cardColor, setColor ] = useState(null)
  const [ dogModal, setdogModal ] = useState(null);
  const [ waitModal, setWaitModal ] = useState(null); 
  const [ selectedImage, setSelectedImage ] = useState(false);
  const [ isDogBreedCardModalOpen, setDogBreedCardModalOpen ] = useState(false);


  useEffect(() => {
    const updatedOptionsList = dogOptions.map((dog) => {
      return <option key ={dog.id} value={dog.name}>
        {dog.name}
      </option>
    })
     setOptionsList(updatedOptionsList)
  },[dogOptions]);

  useEffect(() => {
    if (selectedBreedOne) {
      const dogChoice = dogOptions.find(dog => dog.name === selectedBreedOne);

      setIdOne(dogChoice.id);

      const fetchDataFirstDog = async () => {
        try {
          if (dogChoice) {
            const response = await fetch(`${ import.meta.env.VITE_NODE_ENV ? import.meta.env.VITE_APP_API_BASE_URL : 'api' }/breedbyid/${dogChoice.id}`);
            const data = await response.json();
            setFirstDog(data[0]);
          };
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
  dogChoice && fetchDataFirstDog();
  }}, [selectedBreedOne]);

  useEffect(() => {
    if (selectedBreedTwo) {
      const dogChoice = dogOptions.find(dog => dog.name === selectedBreedTwo);
      setIdTwo(dogChoice.id);
      const fetchDataSecondDog = async () => {
        try {
          if (dogChoice) {
            const response = await fetch(`${ import.meta.env.VITE_NODE_ENV ? import.meta.env.VITE_APP_API_BASE_URL : 'api' }/breedbyid/${dogChoice.id}`);
            const data = await response.json();
            setSecondDog(data[0]);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      
      dogChoice && fetchDataSecondDog();
    }}, [selectedBreedTwo]);

  const handleDogOneSelection = (breed) => {
    setDogOneBreed(breed);
  };

  const handleDogTwoSelection = (breed) => {
    setDogTwoBreed(breed);
  };

  const handleClickToGenerate = () => {
    if (firstDog.id && secondDog.id) {
      let modal = null;
      setdogModal(null);
      setWaitModal(true);
      const fetchFusion = async () => {
        try {
          const response = await fetch(`${ import.meta.env.VITE_NODE_ENV ? import.meta.env.VITE_APP_API_BASE_URL : 'api' }/generatebreed?firstDog.id=${firstDog.id}&secondDog.id=${secondDog.id}`, {
            credentials: 'include',
          });
          const data = await response.json();
          console.log('Data in full',data);
          const dogData = data.dogBreedDetails[0];
          console.log('dogData', dogData);
          const mateData = data.extraStats;
          console.log(mateData);
          modal=
            <DogBreedCardModal
              id={dogData.id}
              image={dogData.generated_photo_link}
              shedding={{shedding: dogData.shedding}}
              drooling={{drooling: dogData.drooling}}
              protectiveness={{protectiveness: dogData.protectiveness}}
              energy={{energy: dogData.energy}}
              barking={{barking: dogData.barking}} 
              height={[
                dogData.max_height_female,
                dogData.max_height_male,
                dogData.min_height_female,
                dogData.min_height_male,
              ]} 
              weight={[ 
                dogData.max_weight_female,
                dogData.max_weight_male,
                dogData.min_weight_female,
                dogData.min_weight_male
              ]}
              name={dogData.name} 
              description={dogData.description} 
              dog1 = {mateData.breedOne}
              dog2 = {mateData.breedTwo}
            />
          setWaitModal(false);
          setdogModal(modal);
        } catch (error) {
          console.error('Error fetching data', error);
          setWaitModal(false);
          alert('There was a mix-up with your mix! Please try again.');
        }
      };
      
      fetchFusion();
    };
  };

  const fetchData = async () => {
    try {
      const responce = await fetch(`${ import.meta.env.VITE_NODE_ENV ? import.meta.env.VITE_APP_API_BASE_URL : 'api' }/allbreednames`)
      const data = await responce.json();
      setOptions(data);
      
    } catch (error) {
      console.error('Error fetch data', error);
    };
  };

  const openDogBreedCardModal = (event, image, num) => {

    if (image && image.generated_photo_link && image.id) {
      setSelectedImage(image);
      setDogBreedCardModalOpen(true);
      setColor(num);
    } else {
      console.error('Image object is undefined');
    };
  };

  const closeDogBreedModal = () => {
    setSelectedImage(null);
  }; 

  const basicDogModal = (dog, num) =>  (
    <DogBreedCardModal 
    className="customModalStyle"
    id={dog.id}
    image={dog.generated_photo_link}
    shedding={{shedding : dog.shedding}}
    drooling={{drooling : dog.drooling}}
    protectiveness={{protectiveness : dog.protectiveness}}
    energy={{energy : dog.energy}}
    barking={{barking : dog.barking}}
    height={[
      dog.max_height_female,
      dog.max_height_male,
      dog.min_height_female,
      dog.min_height_male,
    ]} 
    weight={[ 
      dog.max_weight_female,
      dog.max_weight_male,
      dog.min_weight_female,
      dog.min_weight_male
    ]}
    name={dog.name}
    description={dog.description}
    dog1={dog.dog1}
    dog2={dog.dog2}
    onClose={closeDogBreedModal}
    isOpen={isDogBreedCardModalOpen} 
    num = {num}
  />
   )

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <div className="mobile-generate-mixed-breed-container">
      <div className="generate-dogs-header">
        <h1>Go Fetch that Mutt</h1>
        <img className="paw-button" src="../icons/paw_button.png" alt="paw" onClick={handleClickToGenerate} />
      </div>
      <div className="dog-selection-container">
        <select onChange={(e) => handleDogOneSelection(e.target.value)}>
          <option value="" disabled selected>
            Pick a Dog
          </option>
          {optionsList}
        </select>
        <div className="dog-image-container">
          <img 
            className='first-dog-portrait' 
            src= {firstDog.image_link || '../icons/dog-placeholder.png'}
            alt={`${firstDog.name}`}
            onClick={(event) => openDogBreedCardModal(event, firstDog, 1)}
          />
          {firstDog && <p>Click me to see my stats!</p>}
        </div>
      </div>

      <div className="dog-selection-container">
        <select onChange={(e) => handleDogTwoSelection(e.target.value)}>
          <option value="" disabled selected>
            Pick a Dog
          </option>
          {optionsList}
        </select>
        <div className="dog-image-container">
          <img className='second-dog-portrait' 
          src= {secondDog.image_link || '../icons/dog-placeholder.png'}
          alt={`${secondDog.name}`}
          onClick={(event) => openDogBreedCardModal(event, secondDog, 2)}
        />
          {secondDog && <p>Click me to see my stats!</p>}
        </div>
      </div>
      {selectedImage && basicDogModal(selectedImage, cardColor)}
      {waitModal && <WaitOnGenerateModal />}
      {dogModal}
    </div>
  );
};

export default MobileGenerateMixedBreedPage;

