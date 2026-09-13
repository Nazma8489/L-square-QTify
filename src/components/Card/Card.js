import React from 'react';
import Chip from '@mui/material/Chip';
import './Card.css';

const chipSx = {
  position: 'absolute',
  bottom: 8,
  left: 8,
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  color: 'var(--color-white)',
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 500,
  fontSize: 12,
  height: 24,
};

const AlbumCard = ({ album }) => {
  return (
    <div className="qtify-card">
      <div className="qtify-card-image-wrap">
        <img className="qtify-card-image" src={album.image} alt={album.title} />
        <Chip label={`${album.follows} follows`} size="small" className="qtify-card-chip" sx={chipSx} />
      </div>
      <h3 className="qtify-card-title">{album.title}</h3>
    </div>
  );
};

const SongCard = ({ song }) => {
  return (
    <div className="qtify-card">
      <div className="qtify-card-image-wrap">
        <img className="qtify-card-image" src={song.image} alt={song.title} />
        <Chip label={`${song.likes} Likes`} size="small" className="qtify-card-chip" sx={chipSx} />
      </div>
      <h3 className="qtify-card-title">{song.title}</h3>
    </div>
  );
};

export { AlbumCard, SongCard };