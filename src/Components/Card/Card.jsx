import React from 'react';
import LazyImage from '../LazyLoadImage';

function Card({data}) {
  const {name,description,image} = data;
  return (
    <div className="card">
      <div className="card__image">
        <LazyImage src={image} alt="logo"/> 
      </div>
      <div className="card__content">
      <div className="card__name">
        {name}
      </div>
      <div className="card__description">
        {description}
      </div>
      </div>
    </div>
  );
}

export default Card;