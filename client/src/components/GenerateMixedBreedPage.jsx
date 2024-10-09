import React, { useState, useEffect } from 'react';
import WaitOnGenerateModal from './WaitOnGenerateModal';
import DogBreedCardModal from './DogBreedCardModal';
import Card from './Card';

import '../views/stylesheets/GenerateMixedBreedPage.scss';

const GenerateMixedBreedPage = () => {

  const [ dogOptions, setOptions ] = useState([]);
  const [ selectedBreedOne, setDogOneBreed ] = useState(null);
  const [ selectedBreedTwo, setDogTwoBreed ] = useState(null);
  const [ optionsList, setOptionsList ] = useState([]);
  const [ firstDog, setFirstDog ]= useState(null);
  const [ secondDog, setSecondDog ]= useState(null);
  const [ dogOneId, setIdOne ] = useState(null);
  const [ dogTwoId, setIdTwo ] = useState(null);
  const [ dogModal, setdogModal ] = useState(null);
  const [ waitModal, setWaitModal ] = useState(null);

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
            const newDogData = data[0];
      
            const dogCard = (
              <Card 
                num={1} 
                image={newDogData.image_link} 
                shedding={{shedding: newDogData.shedding}} 
                drooling={ {drooling:newDogData.drooling}}
                protectiveness={{protectiveness: newDogData.protectiveness}} 
                energy={{energy:newDogData.energy}} 
                barking={{barking: newDogData.barking}} 
                height={[
                  newDogData.max_height_female,
                  newDogData.max_height_male,
                  newDogData.min_height_female,
                  newDogData.min_height_male,
                ]} 
                weight={[ 
                  newDogData.max_weight_female,
                  newDogData.max_weight_male,
                  newDogData.min_weight_female,
                  newDogData.min_weight_male
                ]}
                name={newDogData.name} 
                description={newDogData.description} 
              />
            );
      
            setFirstDog(dogCard);
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
            const newDogData = data[0];

            const dogCard = (
              <Card 
                num={2} 
                image={newDogData.image_link} 
                shedding={{shedding: newDogData.shedding}} 
                drooling={{drooling:newDogData.drooling}}
                protectiveness={{protectiveness: newDogData.protectiveness}} 
                energy={{energy:newDogData.energy}} 
                barking={{barking: newDogData.barking}} 
                height={[
                  newDogData.max_height_female,
                  newDogData.max_height_male,
                  newDogData.min_height_female,
                  newDogData.min_height_male,
                ]} 
                weight={[ 
                  newDogData.max_weight_female,
                  newDogData.max_weight_male,
                  newDogData.min_weight_female,
                  newDogData.min_weight_male
                ]}
                name={newDogData.name} 
                description={newDogData.description} 
              />
            );

            setSecondDog(dogCard);
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
    if (dogOneId && dogTwoId && (dogOneId != dogTwoId)) {
      let modal = null;
      setdogModal(null);
      setWaitModal(true);
      const fetchFusion = async () => {
        try {
          const response = await fetch(`${ import.meta.env.VITE_NODE_ENV ? import.meta.env.VITE_APP_API_BASE_URL : 'api' }/generatebreed?dogOneId=${dogOneId}&dogTwoId=${dogTwoId}`, {
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

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <div className="generate-mixed-breed-container">
        <div className="page-body-generate">
          <div className="left-container">
            <select id="leftDropdown" placeholder= "Pick a Dog" onChange={(e) => handleDogOneSelection(e.target.value)}>
              <option value="" disabled selected>Pick a Dog</option>
              {optionsList}
            </select>
            {firstDog || <Card num = {1}/>}
          </div>
          <div className="middle-container">
            <div className="generate-container">
              <img className='generate-button' src='../icons/paw_button.png' onClick={handleClickToGenerate}/>
              <p>Go Fetch that Mutt !</p>
              <img className ='merge-icon' src='../icons/merger.png'/>
            </div>
        </div>
        <div className="right-container">
          <select id="rightDropdown" onChange={(e) => handleDogTwoSelection(e.target.value)}>
          <option value="" disabled selected>Pick a Dog</option>
            {optionsList}
          </select>
          {secondDog || <Card num = {2}/>}
        </div>
      </div>
      {waitModal && <WaitOnGenerateModal/>}
      {dogModal}
  </div>
  );
};

export default GenerateMixedBreedPage; 

