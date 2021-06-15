import React from "react";

function Song({ currSong, isPlaying }) {
  return (
    <div className="song-container">
      <img
        className={`${isPlaying ? "rotate-img-animation" : ""}`}
        src={currSong.cover}
        alt={currSong.name}
      />
      <h2>{currSong.name}</h2>
      <h3>{currSong.artist}</h3>
    </div>
  );
}

export default Song;
