import React, { useState, useRef, useEffect } from 'react';
import './AudioPlayer.css';
import PlayLogo from './assets/logos/play_logo.png';
import PauseButton from './assets/logos/pause_button.png';

const AudioPlayer = ({ src, title, creator, isPlaying, setIsPlaying }) => {
    const audioRef = useRef(null);
    const progressRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        if (audioRef.current) {
            const audioElement = audioRef.current;
            audioElement.addEventListener('timeupdate', updateProgress);
            audioElement.addEventListener('loadedmetadata', () => {
                setDuration(audioElement.duration);
                setCurrentTime(0);
            });

            return () => {
                audioElement.removeEventListener('timeupdate', updateProgress);
            };
        }
    }, []);

    useEffect(() => {
        // Reset the audio player when the song changes
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.load(); // Reloads the new source
            setCurrentTime(0);
        }
    }, [src]);

    useEffect(() => {
        // Play or pause the audio based on the isPlaying prop
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    const togglePlayPause = () => {
        setIsPlaying(prevState => !prevState); // Toggle play/pause from parent
    };

    const updateProgress = () => {
        setCurrentTime(audioRef.current.currentTime);
        if (progressRef.current) {
            progressRef.current.value = (audioRef.current.currentTime / audioRef.current.duration) * 100;
        }
    };

    const handleProgressChange = (e) => {
        const value = e.target.value;
        audioRef.current.currentTime = (value / 100) * audioRef.current.duration;
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    };

    return (
        <div className="audio-player">
            <audio ref={audioRef} src={src} preload="metadata"></audio>
            <div className="controls">
                {/* Song Title and Creator */}
                <div className="song-info">
                    <p className="song-title">{title}</p>
                    <p className="song-creator">{creator}</p>
                </div>

                {/* Play/Pause and Progress */}
                <div className="progress-and-time">
                    <img
                        src={isPlaying ? PauseButton : PlayLogo}
                        alt={isPlaying ? 'Pause' : 'Play'}
                        className="play-pause-btn"
                        onClick={togglePlayPause} // Toggle play/pause on click
                    />
                    <div className="time-info">
                        <span className="current-time">{formatTime(currentTime)}</span> /{' '}
                        <span className="duration">{formatTime(duration)}</span>
                    </div>
                    <div className="progress-bar">
                        <input
                            ref={progressRef}
                            type="range"
                            className="progress"
                            value={(currentTime / duration) * 100 || 0}
                            onChange={handleProgressChange}
                            min="0"
                            max="100"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AudioPlayer;
