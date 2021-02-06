import React from 'react';

function Card({data}) {
  const {name,description,image} = data;
  return (
    <div className="card">
      <div className="card__image">
        <img src={image}/> 
      </div>
      <div className="card__name">
        {name}
      </div>
      <div className="card__description">
        {description}
      </div>
    </div>
  );
}

export default Card;