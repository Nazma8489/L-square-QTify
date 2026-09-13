import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar/Navbar';
import Hero from './Hero/Hero';
import Section from './Section/Section';
import FAQ from './FAQ/FAQ';
import '../App.css';

const API_BASE_URL = 'https://qtify-backend.labs.crio.do';

const RETRY_INTERVAL = 2000;
const MAX_RETRIES = 25;

const QTifyApp = () => {
  const [topAlbums, setTopAlbums] = useState([]);
  const [newAlbums, setNewAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedTab, setSelectedTab] = useState('all');

  useEffect(() => {
    let cancelled = false;
    let retryTimer = null;
    let attempt = 0;

    const fetchData = async () => {
      if (cancelled) {
        return;
      }
      try {
        const [topResponse, newResponse, songsResponse, genresResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/albums/top`),
          axios.get(`${API_BASE_URL}/albums/new`),
          axios.get(`${API_BASE_URL}/songs`),
          axios.get(`${API_BASE_URL}/genres`)
        ]);

        if (!cancelled) {
          const genresData = Array.isArray(genresResponse.data)
            ? genresResponse.data
            : genresResponse.data.data;
          setTopAlbums(topResponse.data);
          setNewAlbums(newResponse.data);
          setSongs(songsResponse.data);
          setGenres(genresData);
        }
      } catch (error) {
        attempt += 1;
        if (attempt < MAX_RETRIES && !cancelled) {
          retryTimer = setTimeout(fetchData, RETRY_INTERVAL);
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
      if (retryTimer) {
        clearTimeout(retryTimer);
      }
    };
  }, []);

  const filteredSongs =
    selectedTab === 'all'
      ? songs
      : songs.filter((song) => song.genre && song.genre.key === selectedTab);

  return (
    <div className="qtify-app">
      <Navbar />
      <Hero />
      <Section title="Top Albums" data={topAlbums} type="album" />
      <Section title="New Albums" data={newAlbums} type="album" />
      <Section
        title="Songs"
        data={filteredSongs}
        type="song"
        tabs={genres}
        tabValue={selectedTab}
        onTabChange={setSelectedTab}
      />
      <FAQ />
    </div>
  );
};

export default QTifyApp;
