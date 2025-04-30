/* PlayerContext.jsx */

import { createContext, useState } from "react";

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [videoId, setVideoId] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  return (
    <PlayerContext.Provider value={{ videoId, setVideoId, isVisible, setIsVisible }}>
      {children}
    </PlayerContext.Provider>
  );
};

