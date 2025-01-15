import React, { useState, useRef, useEffect } from 'react';
import './AudioPlayer.css';

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const progressRef = useRef(null);
  const volumeRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (audioRef.current) {
      const audioElement = audioRef.current;
      audioElement.addEventListener('timeupdate', updateProgress);
      audioElement.addEventListener('loadedmetadata', () => setDuration(audioElement.duration));

      return () => {
        audioElement.removeEventListener('timeupdate', updateProgress);
      };
    }
  }, []);

  const togglePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const updateProgress = () => {
    setCurrentTime(audioRef.current.currentTime);
    const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
    if (progressRef.current) progressRef.current.value = progress;
  };

  const handleProgressChange = (e) => {
    const value = e.target.value;
    audioRef.current.currentTime = (value / 100) * audioRef.current.duration;
  };

  const handleVolumeChange = (e) => {
    const value = e.target.value;
    audioRef.current.volume = value;
    setVolume(value);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  return (
    <div className="audio-player">
      <audio ref={audioRef} src="your-audio-file.mp3" preload="metadata"></audio>

      <div className="controls">
        

        <div className="progress-bar">
          <input
            ref={progressRef}
            type="range"
            className="progress"
            value={(currentTime / duration) * 100}
            onChange={handleProgressChange}
            min="0"
            max="100"
          />
        </div>

        <div className="time-info">
        <span className="current-time">{formatTime(currentTime)}</span> /{' '}
        <span className="duration">{formatTime(duration)}</span>
      </div>

        <div className="volume-control">
          <input
            ref={volumeRef}
            type="range"
            className="volume"
            value={volume}
            onChange={handleVolumeChange}
            min="0"
            max="1"
            step="0.01"
          />
        </div>
      </div>

      <button className="play-pause-btn" onClick={togglePlayPause}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      
    </div>
  );
};

export default AudioPlayer;