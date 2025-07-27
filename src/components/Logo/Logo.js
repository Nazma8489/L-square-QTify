import React from 'react';
import logoImage from '../../assets/logo.png';
import './Logo.css';

const Logo = () => {
  return (
    <div className="qtify-logo-container">
      <img src={logoImage} alt="QTify" className="qtify-logo" />
    </div>
  );
};

export default Logo;
