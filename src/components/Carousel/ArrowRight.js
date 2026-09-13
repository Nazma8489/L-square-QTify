import React from 'react';
import RightArrow from '../../assets/RightArrow.svg';

const ArrowRight = ({ onClick }) => (
  <button
    type="button"
    className="qtify-carousel-arrow qtify-carousel-arrow-right"
    onClick={onClick}
    aria-label="Next"
  >
    <img src={RightArrow} alt="" />
  </button>
);

export default ArrowRight;