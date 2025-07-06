import React from "react";

import '../views/stylesheets/Card.scss';

const Card = (props) => {
  const {
    num, 
    image, 
    shedding, 
    drooling, 
    protectiveness, 
    energy, 
    barking, 
    height, 
    weight, 
    name, 
    description, 
    dog1, 
    dog2, 
    is_holo,
    holo_variant
  } = props

  const avgStat = array => {
    if (!array || array.length === 0) {
      return null;
    }
    return array.reduce((x, y) => x + y) / array.length;
  }

  const avgWeight = weight && Array.isArray(weight) && weight.length > 0 ? `${avgStat(weight)} lbs` : null;

  const avgHeight = height && Array.isArray(height) && height.length > 0 ? avgStat(height) : null;

  const inchesToFeetAndInches = (inches) => {
    const feet = Math.floor(inches / 12);
    const remainingInches = inches % 12;
    return `${feet}' ${remainingInches}"`;
  }

  const symbolGenerator = (statObj) => {
    if (!statObj || Object.keys(statObj).length === 0) {
      return null; 
    }
    const type = Object.keys(statObj)[0];
    const value = statObj[type];

    const fullFunct = () => {
      const elements = [];
      for (let i = 1; i <= value; i++) {
        elements.push (
          <td key={i} className="typesign">
            <img className="energy_symbol" src={`/icons/${type}.png`} />
          </td>
        );
      }

      return elements;
    };

    const halfFunct = () => {
      const newValue = value + 0.5;
      const elements = [];
        for (let i = 1; i <= newValue; i++) {
          elements.push (
            i === newValue ? (
              <td key={i} className="typesign">
                <img className="energy_symbol" src={`./icons/${type}_half.png`} />
              </td>
            ) : (
              <td key={i} className="typesign">
                <img className="energy_symbol" src={`./icons/${type}.png`} />
              </td>
            )
          );
        }

        return elements;
      };

    return value % 1 === 0.5 ? halfFunct() : fullFunct() 
  };

  return (
    <div className={`nameimageinfo color-${num || 'fusion'}`}>
      <table className="nameheaders">
        <tbody>
          <tr className="extra-info-row">
            <td className="basic" colSpan="3">{num ? "Base Breed" : `${dog1}/${dog2}`}</td>
            {is_holo && <td className="holo-label-cell" style={{ textAlign: "right" }}><span className="holo-label">HOLOGRAPHIC</span></td>}
          </tr>
          <tr className='top_stat_container'>
            <td className='top_stats'>
              <p className="nameofanimal" colSpan="3">{name}</p>
              <div className='protect_container'>
                <div className="attackdesc"><span className="label">Protectiveness</span></div>
                {symbolGenerator(protectiveness) || symbolGenerator({'protectiveness':0}) }
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="shimmer-wrapper">
          <img
            className="card_img"
            src={image}
            alt={name || null}
            title={image && "Click for full image"}
            onClick={() => image && window.open(image, '_blank')}
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
          {is_holo && <div className="holo-shimmer" style={{ backgroundImage: `url(/assets/holo-${holo_variant}.gif)` }} />} 
      </div>
      <br />
      <div className='below_image_container'>
        <div className="description">
          <span className='height'>Average Height {inchesToFeetAndInches(avgHeight)} inches</span>
          <span className='weight'>Average Weight {avgWeight || `0 lbs`}</span>
        </div>
        <img className='set_logo' src="/icons/paws_pink.png" alt="Logo" />
      </div>
      <div className='stat_container'>
        <table className="stats">
          <tbody>
            <tr className="symbol_container">
              <td className="attackdesc"><span className="label">Shedding</span></td>
              {symbolGenerator(shedding) || symbolGenerator({'shedding':0})}
            </tr>
          </tbody>
        </table>
        <table className="stats">
          <tbody>
            <tr className="symbol_container">
              <td className="attackdesc"><span className="label">Energy</span></td>
              {symbolGenerator(energy) || symbolGenerator({'energy':0})}
            </tr>
          </tbody>
        </table>
      </div>
      <div className='stat_container'>
        <table className="stats">
          <tbody>
            <tr className="symbol_container">
              <td className="attackdesc"><span className="label">Drooling</span></td>
              {symbolGenerator(drooling) || symbolGenerator({'drooling':0})}
            </tr>
          </tbody>
        </table>
        <table className="stats">
          <tbody>
            <tr className="symbol_container">
              <td className="attackdesc"><span className="label">Barking</span></td>
              {symbolGenerator(barking) || symbolGenerator({'barking':0})}
            </tr>
          </tbody>
        </table>
      </div>
      <ul>
        <p className='breed_facts'>Breed Facts</p>
        <li className="italicize">{description || 'No Facts for No Breeds! Pick a Pup!'}</li>
        <li className="copyrights">
          <span className="medium">©2023 - Muttly Inc - BREEDMIXER Ltd - AlChGr Designs</span>
        </li>
      </ul>
    </div>
  );
}

export default Card;

