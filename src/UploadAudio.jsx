// UploadAudio.jsx
import React, { useState } from 'react';
import './UploadAudio.css';

const UploadAudio = ({ addSong }) => {
    const [audioFile, setAudioFile] = useState(null);
    const [songTitle, setSongTitle] = useState('');
    const [songCreator, setSongCreator] = useState('');
    const [fileName, setFileName] = useState('');

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setAudioFile(fileURL);
            setFileName(file.name);  // Store the name of the uploaded file
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

    return (
        <div className="upload-audio">
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
                    <p>Selected File: {fileName}</p>
                </div>
            )}
        </div>
    );
};

export default UploadAudio;
