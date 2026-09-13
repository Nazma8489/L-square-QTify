import React, { useRef, useState } from 'react';
import LeftArrow from '../../assets/LeftArrow.svg';
import RightArrow from '../../assets/RightArrow.svg';
import './Carousel.css';

const MAX_VISIBILITY = 5;

const Carousel = ({ data, renderCard }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [renderStart, setRenderStart] = useState(0);
  const timerRef = useRef(null);

  const scheduleRenderStart = (targetIndex) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setRenderStart(targetIndex);
    }, 1500);
  };

  const handleNext = () => {
    if (data.length === 0) {
      return;
    }
    const next = Math.min(startIndex + 1, Math.max(data.length - MAX_VISIBILITY, 0));
    setStartIndex(next);
    scheduleRenderStart(next);
  };

  const handlePrev = () => {
    const next = Math.max(startIndex - 1, 0);
    setStartIndex(next);
    setRenderStart((current) => Math.min(current, next));
  };

  if (!data || data.length === 0) {
    return null;
  }

  const visibleItems = data.slice(renderStart);
  const cardWidth = 236;

  return (
    <div className="qtify-carousel">
      <button
        className="qtify-carousel-arrow qtify-carousel-arrow-left"
        onClick={handlePrev}
        aria-label="Previous"
      >
        <img src={LeftArrow} alt="" />
      </button>
      <div
        className="qtify-carousel-track"
        style={{ transform: `translateX(-${(startIndex - renderStart) * cardWidth}px)` }}
      >
        {visibleItems.map((item) => renderCard(item))}
      </div>
      <button
        className="qtify-carousel-arrow qtify-carousel-arrow-right"
        onClick={handleNext}
        aria-label="Next"
      >
        <img src={RightArrow} alt="" />
      </button>
    </div>
  );
};

export default Carousel;