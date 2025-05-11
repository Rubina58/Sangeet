import React, { useState, useRef, useEffect } from 'react';

const SongPlayer = ({ songUrl, title, artist, imageUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  // Log the song URL to ensure it's correct
  console.log('Playing song:', songUrl); // Add this line

  // Update current time as the song plays
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
          audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
        }
      };
    }
  }, []);

  // Handle play/pause button click
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Handle the song time update
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  // Get the duration when metadata is loaded
  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  // Seek to a specific time in the song
  const handleSeek = (event) => {
    const seekTime = (event.target.value / 100) * duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  return (
    <div className="song-player-container">
      <div className="song-info">
        {/* Display song image */}
        <img
          src={imageUrl || 'https://via.placeholder.com/150'}
          alt="Song Thumbnail"
          className="song-image"
        />
        <div>
          <h3>{title}</h3>
          <p>{artist}</p>
        </div>
      </div>

      <div className="controls">
        <button onClick={togglePlayPause} className="play-pause-button">
          {isPlaying ? 'Pause' : 'Play'}
        </button>

        {/* Seek bar */}
        <input
          type="range"
          value={(currentTime / duration) * 100}
          onChange={handleSeek}
          className="seek-bar"
        />
        <div className="time">
          <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
        </div>
      </div>

      {/* Audio Player */}
      <audio ref={audioRef} src={songUrl} />
    </div>
  );
};

// Format time in minutes and seconds
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
};

export default SongPlayer;
