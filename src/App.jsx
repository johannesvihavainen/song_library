import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Navbar';
import SearchFunctionality from './SearchFunctionality';
import ResetSearchBarInput from './ResetSearchBarInput';
import PhotoOfJohannes from './assets/photos/photo_of_johannes.png';
import InstagramLogo from './assets/logos/instagram_logo.png';
import HandleContactInfo from './HandleContactInfo';
import EmailLogo from './assets/logos/email_logo.png';
import SongCover from './assets/photos/song_cover.png';
import loveHurts from './assets/audio/love-hurts.wav';
import AudioPlayer from './AudioPlayer';


function App() {
  const [activeSection, setActiveSection] = useState('about-me');

  const changeSection = (section) => {
    setActiveSection(section);
  }

  return (
    <div>

      {/* Navbar */}
      <Navbar changeSection={changeSection} />

      {activeSection === 'about-me' && (
        <div className="introduction">
          <div className="introduction-shadow">
            <img className='photo-of-johannes' src={PhotoOfJohannes} alt="" />
            <div className="introduction-hero">
              <h1>Hi! I'm Johannes</h1>
              <p>I'm a soon-to-be computer science student studying front-end development, including HTML, CSS, and JavaScript.</p>
              <p>My favorite hobby is music, so I decided to create a website where I can store all of my songs without any upload limits.</p>
            </div>
          </div>

          <div className="more-info">
            <h2>How did I get into music?</h2>
            <p>I have been passionate about music since a young age, but when I was 16, a friend introduced me to creating music using a DAW (Digital Audio Workstation), which is software for producing music. Ever since then, making music has been my coping mechanism for navigating emotions and life’s challenges. Storytelling through music has helped me immensely, as I am a big dreamer. Music allows me to dream and escape into those dreams, where I can create a new world for myself.</p>
          </div>

          {/* renders the contact info section with images that link to specific websites */}
          <HandleContactInfo />

        </div>


      )}

      {activeSection === 'song-library' && (
        <div className="library-container">
          <div className="search-bar">
            <SearchFunctionality />
            <ResetSearchBarInput />
            <input className="search-box" type="text" id="myInput" placeholder="Search" />
          </div>

          <p className='all-tracks'>All Tracks</p>

          <div className="song-container">
            {/* <img className='song-cover' src={SongCover} alt="" /> */}
            <div className="song-content">
              <div className="song-description">
                <p className='song-title'>Love Hurts</p>
                <p className='song-creator'>Johannes Vihavainen</p>

                <AudioPlayer />
                {/* <audio controls>
                  <source src={loveHurts} type="audio/wav" />
                </audio> */}
              </div>
            </div>
          </div>
        </div>


      )}



    </div>
  )
}

export default App
