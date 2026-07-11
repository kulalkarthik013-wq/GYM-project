import React, { createContext, useContext, useRef, useEffect } from "react";
import gymMusic from "../assets/gym1.mp3";

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const audioRef = useRef(new Audio(gymMusic));

  const playMusic = () => {
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;
    audioRef.current.play().catch(() => {});
  };

  const stopMusic = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0; // 🔥 reset
  };

  // ✅ STOP MUSIC WHEN TAB CHANGES
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        audioRef.current.pause(); // ⛔ tab inactive
      } else {
        audioRef.current.play().catch(() => {}); // ▶️ resume
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <MusicContext.Provider value={{ playMusic, stopMusic }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => useContext(MusicContext);