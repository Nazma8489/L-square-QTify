import React from 'react';
import './Button.css';

const Button = ({ text, onClick, variant = 'primary' }) => {
  return (
    <button 
      className={`qtify-button qtify-button-${variant}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
