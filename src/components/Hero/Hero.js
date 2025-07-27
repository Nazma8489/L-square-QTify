import React from 'react';
import heroImage from '../../assets/hero_headphones.png';
import './Hero.css';

const Hero = () => {
  return (
    <section className="qtify-hero">
      <div className="qtify-hero-content">
        <div className="qtify-hero-text">
          <h1 className="qtify-hero-title">100 Thousand Songs, ad-free</h1>
          <h2 className="qtify-hero-subtitle">Over thousands podcast episodes</h2>
        </div>
        <div className="qtify-hero-image">
          <img src={heroImage} alt="Headphones" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
