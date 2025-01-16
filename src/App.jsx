import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './Navbar';
import SearchFunctionality from './SearchFunctionality';
import ResetSearchBarInput from './ResetSearchBarInput';
import PhotoOfJohannes from './assets/photos/photo_of_johannes.png';
import HandleContactInfo from './HandleContactInfo';
import UploadAudio from './UploadAudio';
import AudioPlayer from './AudioPlayer';

function App() {
  const [activeSection, setActiveSection] = useState(() => {
    // Retrieve the last active section from localStorage or default to 'about-me'
    return localStorage.getItem('activeSection') || 'about-me';
  });

  const [songs, setSongs] = useState([]); // State to store uploaded songs
  const [currentSong, setCurrentSong] = useState(null); // State to store the currently selected song
  const [isPlaying, setIsPlaying] = useState(false); // State to track if the audio is playing

  // Retrieve songs from localStorage when the component mounts
  useEffect(() => {
    const storedSongs = JSON.parse(localStorage.getItem('songs'));
    if (storedSongs) {
      setSongs(storedSongs);
    }
  }, []);

  // Save songs to localStorage whenever the songs state changes
  useEffect(() => {
    if (songs.length > 0) {
      localStorage.setItem('songs', JSON.stringify(songs));
    }
  }, [songs]);

  // Save the active section to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('activeSection', activeSection);
  }, [activeSection]);

  const changeSection = (section) => {
    setActiveSection(section);
  };

  // Function to add a song to the list
  const addSong = (title, creator, fileURL) => {
    const newSong = {
      title,
      creator,
      fileURL,
    };
    setSongs((prevSongs) => {
      const updatedSongs = [...prevSongs, newSong];
      localStorage.setItem('songs', JSON.stringify(updatedSongs)); // Save updated songs to localStorage
      return updatedSongs;
    });
  };

  // Function to handle the song click and play it
  const handleSongClick = (song) => {
    if (currentSong && currentSong.fileURL === song.fileURL) {
      // If the song is already selected, toggle play/pause
      setIsPlaying(!isPlaying);
    } else {
      // If a new song is clicked, play the new song and reset play state
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar changeSection={changeSection} />

      {activeSection === 'about-me' && (
        <div className="introduction">
          <div className="introduction-shadow">
            <img className="photo-of-johannes" src={PhotoOfJohannes} alt="" />
            <div className="introduction-hero">
              <h1>Hi! I'm Johannes</h1>
              <p>I'm a soon-to-be computer science student studying front-end development, including HTML, CSS, and JavaScript.</p>
              <p>My favorite hobby is music, so I decided to create a website where I can store all of my songs without any upload limits.</p>
            </div>
          </div>

          <div className="more-info">
            <h2>How did I get into music?</h2>
            <p>
              I have been passionate about music since a young age, but when I was 16, a friend introduced me to creating music using a DAW (Digital Audio Workstation), which is software for producing music. Ever since then, making music has been my coping mechanism for navigating emotions and life’s challenges. Storytelling through music has helped me immensely, as I am a big dreamer. Music allows me to dream and escape into those dreams, where I can create a new world for myself.
            </p>
          </div>

          {/* renders the contact info section with images that link to specific websites */}
          <HandleContactInfo />
        </div>
      )}

      {activeSection === 'song-library' && (
        <div className="library-container">
          {/* Render the AudioPlayer if a song is selected */}
          {currentSong && <AudioPlayer src={currentSong.fileURL} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />}

          <p className="all-tracks">All tracks</p>
          <div className="search-bar">
            <SearchFunctionality />
            <ResetSearchBarInput />
            <input className="search-box" type="text" id="myInput" placeholder="Search" />
          </div>

          {/* Render uploaded songs */}
          <div className="song-list">
            {songs.map((song, index) => (
              <div
                key={index}
                className="song-container"
                onClick={() => handleSongClick(song)} // When clicked, play/pause the song
              >
                <div className="song-content">
                  <img className="song-cover" src={PhotoOfJohannes} alt="" />
                  <div className="song-description">
                    <p className="song-title">{song.title}</p>
                    <p className="song-creator">{song.creator}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === 'upload' && <UploadAudio addSong={addSong} />}
    </div>
  );
}

export default App;
