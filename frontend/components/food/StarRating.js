import React from 'react';

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStars = Math.ceil(rating - fullStars);
  const emptyStars = 5 - fullStars - halfStars;

  return (
    <div className='food-starRating'>
      {/* Render full stars */}
      {[...Array(fullStars)].map((_, i) => (
        <span key={i} className='fullStar'>&#9733;</span>
      ))}

      {/* Render half star */}
      {halfStars ? <span className='halfStar'>&#9733;</span> : null}

      {/* Render empty stars */}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={i + fullStars + 1} className='emptyStar'>&#9733;</span>
      ))}
    </div>
  );
};

export default StarRating;
