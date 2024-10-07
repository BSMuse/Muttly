import React from 'react';
import '../views/mobilestylesheets/MobileAboutUs.scss';

const MobileAboutUs = () => {

  return (
    <main className="about-us-content">
    <h2>About us...</h2>
    <div className="section">
      <div className="aboutus-header-ctn">
        <img src= "../icons/paws_pink.png"/>
        <h3>Our Tail Begins Here...</h3>
        <img src= "../icons/paws_pink.png"/>
      </div>
        <p>At Muttly, we're the Picasso of Paws, the Da Vinci of Doggos. We're not just a dog company; we're barkitects of the highest pedigree...</p>
        <p>Ever wondered what a Dalmatian and a Husky would look like combined? We did too.</p>
        <p>Our AI wizards work tirelessly merging breeds with the precision of a doggy jigsaw puzzle.</p>
        <p>From Beagle-Bernese to Shih Tzu-Shepherd, we’re the matchmakers for mutts.</p>
        <p>Unleash your imagination, create your own breed, and join us in the symphony of barks – where every mutt has its day!</p>
      </div>
    </main>
  )
}

export default MobileAboutUs