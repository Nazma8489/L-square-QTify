import React from 'react';
import LeftArrow from '../../assets/LeftArrow.svg';

const ArrowLeft = ({ onClick }) => (
  <button
    type="button"
    className="qtify-carousel-arrow qtify-carousel-arrow-left"
    onClick={onClick}
    aria-label="Previous"
  >
    <img src={LeftArrow} alt="" />
  </button>
);

export default ArrowLeft;