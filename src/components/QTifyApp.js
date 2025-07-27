import React, { useState, useEffect } from 'react';
import Navbar from './Navbar/Navbar';
import Hero from './Hero/Hero';
import Section from './Section/Section';
import FAQ from './FAQ/FAQ';
import '../App.css';

const QTifyApp = () => {
  const [topAlbums, setTopAlbums] = useState([]);
  const [newAlbums, setNewAlbums] = useState([]);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [topResponse, newResponse, songsResponse] = await Promise.all([
        fetch('https://qtify-backend-labs.crio.do/albums/top'),
        fetch('https://qtify-backend-labs.crio.do/albums/new'),
        fetch('https://qtify-backend-labs.crio.do/songs')
      ]);

      const topData = await topResponse.json();
      const newData = await newResponse.json();
      const songsData = await songsResponse.json();

      setTopAlbums(topData);
      setNewAlbums(newData);
      setSongs(songsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="qtify-app">
      <Navbar />
      <Hero />
      <Section title="Top Albums" data={topAlbums} type="album" />
      <Section title="New Albums" data={newAlbums} type="album" />
      <Section title="Songs" data={songs} type="song" />
      <FAQ />
    </div>
  );
};

export default QTifyApp;
