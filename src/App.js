import React, { useState, useRef } from "react";
// Import Styles
import "./styles/app.scss";
// music data
import data from "./data";

// Adding Components
import Song from "./components/Song";
import Player from "./components/Player";
import Library from "./components/Library";
import Nav from "./components/Nav";

function App() {
  // State
  const [songs, setSongs] = useState(data());
  const [currSong, setCurrSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [shuffleStatus, setShuffleStatus] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(true);

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    // Calculate Percentage
    const roundedCurr = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animationPercent = Math.round((roundedCurr * 100) / roundedDuration);
    setSongInfo({
      currentTime: current,
      duration,
      animationPercentage: animationPercent,
    });
  };

  const onSongEndHandler = async () => {
    const length = songs.length;
    const currIndex = songs.findIndex((song) => song.id === currSong.id);
    if (shuffleStatus) {
      await setCurrSong(songs[Math.floor(Math.random() * length)]);
    } else {
      await setCurrSong(songs[currIndex !== length - 1 ? currIndex + 1 : 0]);
    }
    if (isPlaying) audioRef.current.play();
  };

  window.addEventListener("load", () => {
    setLoadingStatus(false);
  });

  return (
    <div
      className={`App ${libraryStatus ? "library-active" : ""}`}
      style={{
        background: `linear-gradient(to bottom right, ${currSong.color[0]}, ${currSong.color[1]})`,
        height: "100vh",
        transition: "all .5s ease",
      }}
    >
      <div style={{ background: "rgba(41, 45, 62, .8)", height: "100vh" }}>
        <Nav
          libraryStatus={libraryStatus}
          setLibraryStatus={setLibraryStatus}
        />
        <Song currSong={currSong} />
        <Player
          currSong={currSong}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          songInfo={songInfo}
          setSongInfo={setSongInfo}
          audioRef={audioRef}
          songs={songs}
          setCurrSong={setCurrSong}
          setSongs={setSongs}
          shuffleStatus={shuffleStatus}
          setShuffleStatus={setShuffleStatus}
        />
        <Library
          songs={songs}
          currSong={currSong}
          setCurrSong={setCurrSong}
          isPlaying={isPlaying}
          audioRef={audioRef}
          libraryStatus={libraryStatus}
          setSongs={setSongs}
        />
        <audio
          onTimeUpdate={timeUpdateHandler}
          onLoadedMetadata={timeUpdateHandler}
          ref={audioRef}
          src={currSong.audio}
          onEnded={onSongEndHandler}
        ></audio>
      </div>
      <div
        className={`${
          loadingStatus ? "loader-animation" : "hide-loading-animation"
        }`}
      >
        <div className="dot-pulse"></div>
      </div>
    </div>
  );
}

export default App;
