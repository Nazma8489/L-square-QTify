import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Carousel from '../Carousel/Carousel';
import { AlbumCard, SongCard } from '../Card/Card';
import './Section.css';

const tabStyle = {
  color: 'rgba(255, 255, 255, 0.6)',
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 600,
  fontSize: 16,
  textTransform: 'uppercase',
  minWidth: 'auto',
  padding: '0 12px',
};

const renderAlbumLink = (album, children) => (
  <Link key={album.id} className="qtify-card-link" to={`/album/${album.slug || album.id}`}>
    {children}
  </Link>
);

const Section = ({ title, data = [], type, tabs = [], tabValue, onTabChange }) => {
  const [collapsed, setCollapsed] = useState(true);

  const renderCard = type === 'song'
    ? (song) => <SongCard key={song.id} song={song} />
    : (album) => renderAlbumLink(album, <AlbumCard album={album} />);

  return (
    <section className="qtify-section">
      <div className="qtify-section-header">
        <h2 className="qtify-section-title">{title}</h2>
        {type === 'album' && data.length > 0 && (
          <button
            type="button"
            className="qtify-section-toggle"
            onClick={() => setCollapsed((prev) => !prev)}
          >
            {collapsed ? 'Show All' : 'Collapse'}
          </button>
        )}
      </div>

      {type === 'song' ? (
        data.length > 0 && (
          <>
            <Tabs
              value={tabValue}
              onChange={(event, value) => onTabChange && onTabChange(value)}
              sx={{
                minHeight: 40,
                marginBottom: '24px',
                '& .MuiTabs-indicator': {
                  backgroundColor: 'var(--color-primary)',
                },
                '& .MuiTab-root': tabStyle,
                '& .MuiTab-root.Mui-selected': {
                  color: 'var(--color-white)',
                },
              }}
            >
              <Tab value="all" label="All" />
              {tabs.map((genre) => (
                <Tab key={genre.key} value={genre.key} label={genre.label} />
              ))}
            </Tabs>
            <Carousel key={tabValue} data={data} renderCard={renderCard} />
          </>
        )
      ) : (
        data.length > 0 &&
        (collapsed ? (
          <Carousel data={data} renderCard={renderCard} />
        ) : (
          <div className="qtify-section-grid">
            {data.map((album) => renderAlbumLink(album, <AlbumCard album={album} />))}
          </div>
        ))
      )}
    </section>
  );
};

export default Section;