// UploadAudio.jsx
import React, { useState, useRef } from 'react';
import './UploadAudio.css';

const UploadAudio = ({ addSong }) => {
    const [audioFile, setAudioFile] = useState(null);
    const [songTitle, setSongTitle] = useState('');
    const [songCreator, setSongCreator] = useState('');
    const [fileName, setFileName] = useState('');
    const audioRef = useRef(null);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setAudioFile(fileURL);
            setFileName(file.name); // Store the name of the uploaded file
        }
    };

    const handleAddSong = () => {
        if (audioFile && songTitle && songCreator) {
            addSong(songTitle, songCreator, audioFile, fileName);
            setSongTitle('');
            setSongCreator('');
            setAudioFile(null);
            setFileName('');
        }
    };

    const handleContainerClick = () => {
        if (audioRef.current) {
            // If the song is already playing, pause it; otherwise, play it
            if (audioRef.current.paused) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    };

    return (
        <div className="upload-audio">
            <div className="container" onClick={handleContainerClick}>
                <p className="upload-title">Want to upload a song?</p>
                <input
                    type="file"
                    accept="audio/*"
                    onChange={handleFileUpload}
                    className="file-upload"
                />
                <input
                    type="text"
                    placeholder="Song Title"
                    value={songTitle}
                    onChange={(e) => setSongTitle(e.target.value)}
                    className="song-title-input"
                />
                <input
                    type="text"
                    placeholder="Song Creator"
                    value={songCreator}
                    onChange={(e) => setSongCreator(e.target.value)}
                    className="song-creator-input"
                />
                <button onClick={handleAddSong}>Add Song</button>

                {/* Displaying the selected audio file */}
                {audioFile && (
                    <div className="audio-info">
                        <p>Selected File: <span>{fileName}</span></p>
                        {/* Hidden audio element to play the uploaded song */}
                        <audio ref={audioRef} src={audioFile} preload="metadata"></audio>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UploadAudio;
