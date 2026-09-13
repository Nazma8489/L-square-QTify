import React from 'react';
import './Card.css';

const AlbumCard = ({ album }) => {
  return (
    <div className="qtify-card">
      <img className="qtify-card-image" src={album.image} alt={album.title} />
      <h3 className="qtify-card-title">{album.title}</h3>
      <p className="qtify-card-follows">{album.follows} follows</p>
    </div>
  );
};

const SongCard = ({ song }) => {
  return (
    <div className="qtify-card qtify-song-card">
      <img className="qtify-card-image" src={song.image} alt={song.title} />
      <h3 className="qtify-card-title">{song.title}</h3>
    </div>
  );
};

export { AlbumCard, SongCard };