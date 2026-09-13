import React, { useState } from 'react';
import Carousel from '../Carousel/Carousel';
import { AlbumCard, SongCard } from '../Card/Card';
import './Section.css';

const Section = ({ title, data = [], type }) => {
  const [collapsed, setCollapsed] = useState(true);
  const sectionRef = React.useRef(null);

  const handleCollapseToggle = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <section className="qtify-section" ref={sectionRef}>
      <div className="qtify-section-header">
        <h2 className="qtify-section-title">{title}</h2>
        {type === 'album' && data.length > 0 && (
          <button
            type="button"
            className="qtify-section-toggle"
            onClick={handleCollapseToggle}
          >
            {collapsed ? 'Show All' : 'Collapse'}
          </button>
        )}
      </div>
      {type === 'album' ? (
        data.length > 0 &&
        (collapsed ? (
          <Carousel
            data={data}
            renderCard={(album) => <AlbumCard key={album.id} album={album} />}
          />
        ) : (
          <div className="qtify-section-grid">
            {data.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        ))
      ) : (
        <div className="qtify-section-grid">
          {data.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Section;