import React, { useEffect } from 'react';
import InstagramLogo from './assets/logos/instagram_logo.png';
import EmailLogo from './assets/logos/email_logo.png';

function HandleContactInfo() {
    const handleInstagramClick = () => {
        window.open('https://www.instagram.com/johannesvihavainen/', '_blank');
    };

    const handleEmailClick = () => {
        window.open('mailto:johannesvihavainen@outlook.com');
    };

    return (
        <div className="contact-section">
            <h3>How can you get a hold of me?</h3>
            <div className="instagram-section">
                <img
                    id="instagram-button"
                    className="instagram-logo"
                    src={InstagramLogo}
                    alt="Instagram Logo"
                    onClick={handleInstagramClick}
                />
                <p>Hit my line over IG! Let's follow each other! DM's are probably the fastest way to reach me!</p>
            </div>

            <div className="email-section">
                <img
                    id="email-button"
                    className="email-logo"
                    src={EmailLogo}
                    alt="Email Logo"
                    onClick={handleEmailClick}
                />
                <p>Hit my line over IG! Let's follow each other! DM's are probably the fastest way to reach me!</p>
            </div>
        </div>
    );

}

export default HandleContactInfo;