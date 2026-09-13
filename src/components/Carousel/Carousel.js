import React, { useEffect, useRef, useState } from 'react';
import ArrowLeft from './ArrowLeft';
import ArrowRight from './ArrowRight';
import './Carousel.css';

const getVisibilityCount = () => {
  const width = window.innerWidth;
  if (width >= 1200) {
    return 6;
  }
  if (width >= 900) {
    return 5;
  }
  if (width >= 600) {
    return 4;
  }
  return 3;
};

const Carousel = ({ data, renderCard }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [renderStart, setRenderStart] = useState(0);
  const [visibility, setVisibility] = useState(() => getVisibilityCount());
  const timerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const next = getVisibilityCount();
      const maxIndex = Math.max(data.length - next, 0);
      setVisibility(next);
      setStartIndex((index) => Math.min(index, maxIndex));
      setRenderStart((start) => Math.min(start, maxIndex));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [data.length]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

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
    const next = Math.min(startIndex + 1, Math.max(data.length - visibility, 0));
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
      <ArrowLeft onClick={handlePrev} />
      <div
        className="qtify-carousel-track"
        style={{ transform: `translateX(-${(startIndex - renderStart) * cardWidth}px)` }}
      >
        {visibleItems.map((item) => renderCard(item))}
      </div>
      <ArrowRight onClick={handleNext} />
    </div>
  );
};

export default Carousel;