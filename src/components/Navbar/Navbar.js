import React from 'react';
import Logo from '../Logo/Logo';
import Search from '../Search/Search';
import Button from '../Button/Button';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="qtify-navbar">
      <Logo />
      <Search />
      <Button text="Give Feedback" />
    </nav>
  );
};

export default Navbar;
