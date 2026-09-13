import React, { useEffect, useRef, useState } from 'react';
import './SongPlayer.css';

const DEMO_AUDIO = (index) =>
  `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(index % 16) + 1}.mp3`;

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds)) {
    return '0:00';
  }
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
};

const SongPlayer = ({ songs = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  const currentSong = songs[currentIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return undefined;
    }
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentIndex((index) => Math.min(songs.length - 1, index + 1));
    };

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
    };
  }, [songs.length]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) {
      return;
    }
    audio.src = DEMO_AUDIO(currentIndex);
    setCurrentTime(0);
    if (isPlaying) {
      audio.play();
    }
  }, [currentIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!currentSong) {
    return null;
  }

  const duration = currentSong.durationInMs ? currentSong.durationInMs / 1000 : audioRef.current?.duration || 0;
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleToggle = () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  const handleSeek = (event) => {
    const audio = audioRef.current;
    if (!audio || !duration) {
      return;
    }
    audio.currentTime = (Number(event.target.value) / 100) * duration;
  };

  return (
    <section className="qtify-player">
      <img className="qtify-player-image" src={currentSong.image} alt={currentSong.title} />
      <div className="qtify-player-info">
        <h3 className="qtify-player-title">{currentSong.title}</h3>
        <p className="qtify-player-artist">
          {currentSong.artists ? currentSong.artists.join(', ') : ''}
        </p>
      </div>
      <div className="qtify-player-controls">
        <div className="qtify-player-buttons">
          <button
            type="button"
            className="qtify-player-btn"
            aria-label="Previous song"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((index) => Math.max(0, index - 1))}
          >
            &#8249;
          </button>
          <button
            type="button"
            className="qtify-player-btn qtify-player-btn-main"
            aria-label={isPlaying ? 'Pause' : 'Play'}
            onClick={handleToggle}
          >
            {isPlaying ? '\u275A\u275A' : '\u25B6'}
          </button>
          <button
            type="button"
            className="qtify-player-btn"
            aria-label="Next song"
            disabled={currentIndex === songs.length - 1}
            onClick={() => setCurrentIndex((index) => Math.min(songs.length - 1, index + 1))}
          >
            &#8250;
          </button>
        </div>
        <div className="qtify-player-progress">
          <span className="qtify-player-time">{formatTime(currentTime)}</span>
          <input
            type="range"
            className="qtify-player-range"
            min="0"
            max="100"
            value={progress || 0}
            onChange={handleSeek}
          />
          <span className="qtify-player-time">{formatTime(duration)}</span>
        </div>
      </div>
      <audio ref={audioRef} preload="none" />
    </section>
  );
};

export default SongPlayer;