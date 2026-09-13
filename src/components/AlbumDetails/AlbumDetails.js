import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Chip from '@mui/material/Chip';
import Pagination from '@mui/material/Pagination';
import './AlbumDetails.css';

const API_BASE_URL = 'https://qtify-backend.labs.crio.do';
const PAGE_SIZE = 13;

const AlbumDetails = () => {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const [album, setAlbum] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let cancelled = false;
    const fetchAlbum = async () => {
      try {
        const [topResponse, newResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/albums/top`),
          axios.get(`${API_BASE_URL}/albums/new`)
        ]);
        const allAlbums = [...topResponse.data, ...newResponse.data];
        const found = allAlbums.find(
          (item) => item.slug === albumId || item.id === albumId
        );
        if (!cancelled) {
          setAlbum(found || null);
          setPage(1);
        }
      } catch (error) {
        if (!cancelled) {
          setAlbum(null);
        }
      }
    };
    fetchAlbum();

    return () => {
      cancelled = true;
    };
  }, [albumId]);

  if (!album) {
    return (
      <div className="qtify-details">
        <button type="button" className="qtify-details-back" onClick={() => navigate('/')}>
          &#8592; Back to home
        </button>
        <p className="qtify-details-loading">Loading album...</p>
      </div>
    );
  }

  const totalPages = Math.max(1, Math.ceil(album.songs.length / PAGE_SIZE));
  const pageSongs = album.songs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="qtify-details">
      <button type="button" className="qtify-details-back" onClick={() => navigate(-1)}>
        &#8592; Back
      </button>

      <div className="qtify-details-header">
        <img className="qtify-details-image" src={album.image} alt={album.title} />
        <div className="qtify-details-info">
          <h1 className="qtify-details-title">{album.title}</h1>
          <Chip
            label={`${album.follows} follows`}
            className="qtify-details-chip"
            size="small"
            sx={{
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              color: 'var(--color-white)',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 500,
              fontSize: 12,
              height: 24
            }}
          />
          {album.description && (
            <p className="qtify-details-description">{album.description}</p>
          )}
        </div>
      </div>

      <h2 className="qtify-details-subtitle">Songs</h2>
      <div id="songs" className="qtify-details-songs">
        {pageSongs.map((song) => (
          <div key={song.id} className="qtify-details-song">
            <img className="qtify-details-song-image" src={song.image} alt={song.title} />
            <span className="qtify-details-song-title">{song.title}</span>
            <span className="qtify-details-song-artists">
              {song.artists ? song.artists.join(', ') : ''}
            </span>
            <Chip
              label={`${song.likes} Likes`}
              size="small"
              sx={{
                marginLeft: 'auto',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                color: 'var(--color-white)',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 500,
                fontSize: 11,
                height: 22
              }}
            />
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="qtify-details-pagination">
          <Pagination
            count={totalPages}
            page={page}
            onChange={(event, value) => {
              setPage(value);
              window.scrollTo({ top: document.getElementById('songs').offsetTop - 20, behavior: 'smooth' });
            }}
            sx={{
              '& .MuiPaginationItem-root': {
                color: 'var(--color-white)',
                fontFamily: 'Poppins, sans-serif'
              },
              '& .Mui-selected': {
                backgroundColor: 'var(--color-primary) !important',
                color: 'var(--color-black) !important'
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AlbumDetails;