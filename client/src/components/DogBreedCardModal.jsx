import React, {useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useMediaQuery } from 'react-responsive';
import Card from './Card';

import '../views/stylesheets/DogBreedCardModal.scss';

const DogBreedCardModal = (props) => {
  const [ liked, setLike ] = useState(false);
  const [ closeModal, setClose ] = useState(false);
  const { isValid, userId } = useAuth();
  const [favoriteImages, setFavouritedImages ] = useState(null)
  const [usersGeneratedImages, setUsersGeneratedImages] = useState(null)
  const { id, image, shedding, drooling, protectiveness, energy, barking, height, weight, name, description, dog1, dog2, feed, onClose, isOpen } = props;

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });


  useEffect(() => {
    const fetchFavouritedImages = async () => {
      try {
        const response = await fetch(`${ import.meta.env.VITE_NODE_ENV ? import.meta.env.VITE_APP_API_BASE_URL : 'api' }/userLiked`, {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data)
          console.log('user liked these dogs', data.userLiked)
          setFavouritedImages(data.userLiked);
        } else {
          console.error('Failed to fetch favourited images:', response.status);
        };
      } catch (error) {
        console.error('Error fetching favourited images:', error);
      };
    };

    fetchFavouritedImages();
  }, []);

  useEffect(() => {
    const fetchUsersGeneratedImages = async () => {
      try {
        const response = await fetch(`${ import.meta.env.VITE_NODE_ENV ? import.meta.env.VITE_APP_API_BASE_URL : 'api' }/generated/breedbyuserid/${userId}`, {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          const usersGeneratedImages = data.generatedBreeds;
          setUsersGeneratedImages(usersGeneratedImages); 
        } else {
          console.error('Failed to fetch users generated images:', response.status);
        };
      } catch (error) {
        console.error('Error fetching users recently generated images:', error);
      };
    };

    fetchUsersGeneratedImages();
  }, []);


  useEffect(() => {
    if (findLikesForId(id) || (findGeneratedForId(id) && feed)) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, [favoriteImages, usersGeneratedImages, id]);

  const findLikesForId = (id) => {
    if (favoriteImages) {
      const likedDog = favoriteImages.find((dog) => dog.id === id);
      return likedDog !== undefined; 
    }
    return false; 
  };

  const findGeneratedForId = (id) => {
    if (usersGeneratedImages) {
      const generatedDog = usersGeneratedImages.find((dog) => dog.id === id);
      return generatedDog !== undefined; 
    }
    return false; 
  };

  const handleLike = async () => {
    try {
      const response = await fetch(`${ import.meta.env.VITE_NODE_ENV ? import.meta.env.VITE_APP_API_BASE_URL : 'api' }/generated/likestatus/${id}?likeStatus=${!liked}`, {
        credentials: 'include',
      }); 
      if (response.ok) {
        console.log('Breed liked successfully');
        feed && window.location.reload();
      } else {
        console.error('Failed to like breed');
      }
    } catch (error) {
      console.error('Error while liking breed:', error);
    }
  };

  const onLikeClick = async () => {
    if(!feed || !findGeneratedForId(id)){
      try {
        await handleLike(); 
        setLike((prevLiked) => !prevLiked); 
        setTimeout(() => {
          setClose(true);
        }, 2000);
      } catch (error) {
        console.error('Error while liking breed:', error);
      }
    }
  };
  
  const onShareClick = () => {
    navigator.clipboard.writeText(`${ import.meta.env.VITE_NODE_ENV ? import.meta.env.VITE_APP_API_BASE_URL : 'localhost:5173' }/card/${id}`)
      .then(() => {
        alert('Link copied to clipboard!');
      })
      .catch((error) => {
        console.error('Unable to copy link to clipboard:', error);
        alert('Failed to copy link to clipboard');
      });
  };
  
  const onTrashClick = () => {
    alert("I'm trash?! YOU'RE TRASH! GRRRRRRR!");

    const handleDelete = async () => {
      try {
        const response = await fetch(`${ import.meta.env.VITE_NODE_ENV ? import.meta.env.VITE_APP_API_BASE_URL : 'api' }/generated/delete/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', 
        });
  
        if (response.ok) {
          console.log('Breed deleted successfully');
        } else {
          console.error('Failed to delete breed');
        }
      } catch (error) {
        console.error('Error while deleting breed:', error);
      }
    };

    handleDelete();
    setClose(true);
  };

  const onCloseClick = () => {
    onClose()
  };

  return (
    <>
      {(isOpen || !closeModal) && 
      <div className='modal-background'>
        <div className="dog-breed-card">
          <div className='modal-card-mid-container'>
          {isValid && !isMobile && (feed ? <a><img className='modal-card-icons'  onClick={onCloseClick} src='../icons/close.png'></img></a>
            : <a><img className='modal-card-icons'  onClick={onTrashClick} src='../icons/trash-can.png'></img></a>)}
            <Card
              image={image || null}
              shedding={shedding || null}
              drooling={drooling || null}
              protectiveness={protectiveness|| null}
              energy={energy || null}
              barking={barking || null} 
              height={height || null} 
              weight={weight || null}
              name={name || null} 
              description={description || null} 
              dog1 = {dog1}
              dog2 = {dog2}
            />
            {isValid && !isMobile && <a><img className='modal-card-icons' onClick={onLikeClick} src={
              liked ? '../icons/heart.png'
            : '../icons/heart_empty.png'
          }></img></a>}
            </div>
            {isValid && isMobile && <a><img className='modal-card-icons' onClick={onLikeClick} src={
              liked ? '../icons/heart.png'
            : '../icons/heart_empty.png'
          }></img></a>}
            {isValid ? <a><img className='modal-card-icons' onClick={onShareClick} src='../icons/share.png'></img></a>
            : <a><img className='modal-card-icons'  onClick={onCloseClick} src='../icons/close.png'></img></a>}
            {isValid && isMobile && (feed ? <a><img className='modal-card-icons'  onClick={onCloseClick} src='../icons/close.png'></img></a>
            : <a><img className='modal-card-icons'  onClick={onTrashClick} src='../icons/trash-can.png'></img></a>)}
        </div>
      </div>}
    </>
  );
};

export default DogBreedCardModal;