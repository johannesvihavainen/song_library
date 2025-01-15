import React from 'react';

function Navbar({ changeSection }) {
    return (
        <nav className="navbar">
            <ul>
                <li onClick={() => changeSection('about-me')} className='about-me'>About Me</li>
                <li onClick={() => changeSection('song-library')} className='song-library'>Library</li>
                <li onClick={() => changeSection('upload')} className='upload'>Upload</li>
            </ul>
        </nav>
    )
}


export default Navbar;