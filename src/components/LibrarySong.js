import React from "react";
import { getNewSongs } from "../util";

function LibrarySong({
  song,
  currSong,
  setCurrSong,
  songs,
  setSongs,
  isPlaying,
  audioRef,
}) {
  const updateCurrSongHandler = async () => {
    await setCurrSong(song);
    getNewSongs(songs, song, setSongs);
    if (isPlaying) audioRef.current.play();
  };
  return (
    <div
      onClick={updateCurrSongHandler}
      className={`library-song ${song.active ? "selected" : ""}`}
    >
      <img src={song.cover} alt={song.name} />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
}

export default LibrarySong;
