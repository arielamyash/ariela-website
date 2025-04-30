/*  Home.jsx */

import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayerContext } from '../PlayerContext';
import SpinningVisual from '../components/SpinningVisual';
import './Home.css'; 
import confused from "/public/confused.png";
import fake_friends from "/public/fake_followers_trans.png";
import insta_logo from "/public/insta_logo.png";
import duck_heart from "/public/doodles/duck_heart.jpg";
import bagged_apples from "/public/doodles/bagged_apples.jpg";
import corndog from "/public/doodles/corndog.jpg";
import butterfly from "/public/doodles/butterfly_friend.jpg"
import flower from "/public/doodles/flower_cactus.jpg";
import turtle from "/public/doodles/turtle_stack.jpg";
import slippers from "/public/doodles/duck_slippers.jpg";
import froot from "/public/doodles/froot.jpg";
import cowboy from "/public/doodles/cowboy.jpg";
import cowboy_dog from "/public/doodles/cowboy_dog.jpg";
import tomater from "/public/doodles/tomater.jpg";

const doodles = [
  duck_heart,
  bagged_apples,
  corndog,
  butterfly,
  flower,
  turtle,
  slippers,
  froot,
  cowboy,
  cowboy_dog,
  tomater
];


function Home() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const lastInteractionRef = useRef(Date.now());
  const { setVideoId, setIsVisible } = useContext(PlayerContext);
  const [isSpinnerOpen, setIsSpinnerOpen] = useState(false);
  const handleSpinnerClick = () => setIsSpinnerOpen(true);
  const handleSpinnerClose = () => setIsSpinnerOpen(false);

  const playlist = [
    { title: "Get Down on It - Kool & the Gang", id: "qchPLaiKocI" },
    { title: "Hooked on a Feeling - Blue Swede", id: "bCHvzQnL8kQ" },
    { title: "In Your Eyes - Snoh Aalegra", id: "e8GxfQ3IeCU" },
    { title: "I'm Every Woman - Chaka Khan", id: "DVDCNmdi7QI" },
    { title: "Give It to Me Baby - Rick James", id: "1dNIQVYGXbM" },
  ];
  

  

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
  
      if (now - lastInteractionRef.current >= 60000) {
        setUserInteracted(false); // Resume auto-scroll after 60s
      }
  
      if (!userInteracted) {
        setCurrentIndex(prev => (prev + 1) % doodles.length);
      }
    }, 4000);
  
    return () => clearInterval(interval);
  }, [userInteracted]);

  const prevImage = () => {
    setUserInteracted(true);
    lastInteractionRef.current = Date.now();
    setCurrentIndex((currentIndex - 1 + doodles.length) % doodles.length);
  };

  const nextImage = () => {
    setUserInteracted(true);
    lastInteractionRef.current = Date.now();
    setCurrentIndex((currentIndex + 1) % doodles.length);
  };

  const handleSongClick = (videoId) => {
    setVideoId(videoId);
    setIsVisible(true); // Ensure player is visible when a song is clicked
  };

  

  return (
    <div className="page-container">
      <div className='page-header'>
          <h1 className='page-title'>Home</h1>
        </div>
      <div className="intro-section">
        {/* Working on this section right here to make the spinner clickable
        to open in another page, but thats for after launch
        <div onClick={() => navigate('/SpinnerPage')} style={{ cursor: 'pointer' }}>
          <SpinningVisual />
        </div>*/}
        <SpinningVisual />

        <p>
          Welcome to my website! Feel free to click around, check out my 
          stuff, and get to know me. 
        </p>
        
          
        <button className="contact-button" onClick={() => navigate('/contact')}>
          Contact Me →
        </button>
      </div>

      <div className="content-section">
        <div className="main-column">
          <div className="teaser-card">
            <h3>Who is Ariela?</h3>
            <div className="logo-wrapper">
              <img src={confused} alt="Confused Ariela" className="featured-logo" />
            </div>
            <p>Considering this is her website, this is an important question. 
            </p>
            <button onClick={() => navigate('/about')}>Find out →</button>
          </div>

          <div className="teaser-card">
            <h3>My Featured Project</h3>
            <div className="logo-wrapper">
              <img src={fake_friends} alt="Fake Followers Logo" className="featured-logo" />
            </div>
            <p>Check out my latest project Fake Instagram Friends! </p>
            <button onClick={() => navigate('/projects')}>See Project →</button>
          </div>
        </div>

        <div className="sidebar">
          <h4>Ariela's Corner</h4>
          <p>Here's some of my doodles I've 
            drawn over the years :0)</p>
            <div className="doodle-carousel">
                <div className="doodle-image-wrapper">
                  <button className="nav-button left" onClick={prevImage}>←</button>
                  <img src={doodles[currentIndex]} alt="Doodle" />
                  <button className="nav-button right" onClick={nextImage}>→</button>
                </div>
            </div>
              <p>
                Wanna see more art? Check out my instagram!
              </p>
              <div className="instagram-link">
                <a href="https://www.instagram.com/arielas_schtick/" target="_blank" rel="noopener noreferrer">
                <img 
                    src={insta_logo}
                    alt="Instagram" 
                    className="instagram-icon" 
                />
                </a>
              </div>
            <hr className="sidebar-divider" />
            <div className="playlist-section">
              <h4>What's Ariela Listening to Lately?</h4>
              <ul className="playlist">
                {playlist.map((song, index) => (
                  <li
                    key={index}
                    className="playlist-item"
                    onClick={() => handleSongClick(song.id)}
                  >
                    {song.title}
                  </li>
                ))}
              </ul>
            

            </div>
        </div>
      </div>
    </div>
  );
}

export default Home;


