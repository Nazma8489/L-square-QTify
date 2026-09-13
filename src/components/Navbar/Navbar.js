import React, { useState } from 'react';
import Logo from '../Logo/Logo';
import Search from '../Search/Search';
import Button from '../Button/Button';
import FeedbackModal from '../Modal/FeedbackModal';
import './Navbar.css';

const Navbar = ({ albums = [] }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <nav className="qtify-navbar">
      <Logo />
      <Search albums={albums} />
      <Button text="Give Feedback" onClick={() => setModalOpen(true)} />
      <FeedbackModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </nav>
  );
};

export default Navbar;