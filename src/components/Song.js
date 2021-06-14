import React from "react";

function Song({ currSong }) {
  return (
    <div className="song-container">
      <img src={currSong.cover} alt={currSong.name} />
      <h2>{currSong.name}</h2>
      <h3>{currSong.artist}</h3>
    </div>
  );
}

export default Song;
