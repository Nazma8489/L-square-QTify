import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import QTifyApp from './components/QTifyApp';
import AlbumDetails from './components/AlbumDetails/AlbumDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<QTifyApp />} />
        <Route path="/album/:albumId" element={<AlbumDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;