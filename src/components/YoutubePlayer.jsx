/* YoutubePlayer.jsx */

import React, { useContext, useState } from "react";
import YouTube from "react-youtube";
import { PlayerContext } from "../PlayerContext";
import "./YoutubePlayer.css";

const YouTubePlayer = () => {

  const { videoId, setVideoId, isVisible, setIsVisible } = useContext(PlayerContext);
  const [minimized, setMinimized] = useState(false);
  const [showNextPrompt, setShowNextPrompt] = useState(false);
  const [wasMinimizedBeforePrompt, setWasMinimizedBeforePrompt] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const playlist = [
    { title: "Get Down on It - Kool & the Gang", id: "qchPLaiKocI" },
    { title: "Hooked on a Feeling - Blue Swede", id: "bCHvzQnL8kQ" },
    { title: "In Your Eyes - Snoh Aalegra", id: "e8GxfQ3IeCU" },
    { title: "I'm Every Woman - Chaka Khan", id: "DVDCNmdi7QI" },
    { title: "Give It to Me Baby - Rick James", id: "1dNIQVYGXbM" },
  ];


  const opts = {
    height: "180",
    width: "320",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleEnd = () => {
    setWasMinimizedBeforePrompt(minimized);
    setMinimized(false);
    setShowNextPrompt(true);
  };

  const handlePlayNext = () => {
    if (videoId) {
      const currentIndex = playlist.findIndex(song => song.id === videoId);
      const nextIndex = (currentIndex + 1) % playlist.length;
      const nextSong = playlist[nextIndex];
      //setVideoId(nextSong.id);
      setShowNextPrompt(false);
      if (wasMinimizedBeforePrompt) {
        setMinimized(true);
      }
      setVideoId(nextSong.id);
    }
  };
  
  const handleNoThanks = () => {
    setShowNextPrompt(false); 
    setIsVisible(false);
  };


  if (!isVisible || !videoId) return null;

  return (
    <>
        <div className={`youtube-player-wrapper ${minimized ? "minimized" : ""}`}>
        <div className="player-inner-wrapper">
            <YouTube 
                key={videoId} 
                videoId={videoId} 
                opts={opts} 
                onEnd={handleEnd} 
            />
        </div>
        {showNextPrompt && (
            <div className="next-prompt">
                <p>Play next song?</p>
                <div className="next-prompt-buttons">
                <button onClick={handlePlayNext}>Yes</button>
                <button onClick={handleNoThanks}>No Thanks</button>
                </div>
            </div>
            )}

      </div>

      <div
        className={`youtube-player-buttons ${minimized ? "bottom-buttons" : ""} ${isClosing ? "closing" : ""}`}
      >

        <button onClick={() => setMinimized(!minimized)}>
          {minimized ? "↑" : "➖"}
        </button>
        <button
            onClick={() => {
                setIsClosing(true);
                setTimeout(() => {
                setIsVisible(false);
                setIsClosing(false); // reset for next time
                }, 400); // match  CSS transition time
            }}
        >
            ✖️
        </button>
      </div>
    </>
  );
};

export default YouTubePlayer;
