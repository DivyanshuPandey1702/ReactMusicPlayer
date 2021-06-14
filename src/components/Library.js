import React from "react";
import LibrarySong from "./LibrarySong";

function Library({
  songs,
  currSong,
  setSongs,
  setCurrSong,
  isPlaying,
  audioRef,
  libraryStatus,
}) {
  return (
    <div className={`library ${libraryStatus ? "active-library" : ""}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            song={song}
            currSong={currSong}
            setCurrSong={setCurrSong}
            songs={songs}
            setSongs={setSongs}
            isPlaying={isPlaying}
            audioRef={audioRef}
            key={song.id}
          />
        ))}
      </div>
    </div>
  );
}

export default Library;
