import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";

import Card from './Card'; 

import '../views/stylesheets/CardPage.scss';

const CardPage = () => {
  const { id } = useParams();
  const [ card, setCard ] = useState(null);

  const fetchGeneratedDog = async () => {
    try {
      if (id) {
        const response = await fetch(`https://muttly.onrender.com/generated/breedbyid/${id}`, {
          credentials: 'include',
        });
        const data = await response.json();

        const newDogData = data.dogBreedDetails[0];

        console.log("here is the new dog from card", newDogData)

        const mateData = data.extraStats;

        const dogCard = (
          <Card 
            image={newDogData.generated_photo_link} 
            shedding={{shedding: newDogData.shedding}} 
            drooling={{drooling: newDogData.drooling}}
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
            dog1 = {mateData.breedOne}
            dog2 = {mateData.breedTwo}
          />
        );
  
        setCard(dogCard);
      }
    } 
    catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    console.log("useEffect triggered with id:", id);
    fetchGeneratedDog(); 
  }, [id]);


  return (
    <div className="solo-card-container">
      {card}
    </div>
  )
}

export default CardPage;