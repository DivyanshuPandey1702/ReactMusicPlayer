import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import { getNewSongs } from "../util";

function Player({
  currSong,
  isPlaying,
  setIsPlaying,
  songInfo,
  setSongInfo,
  audioRef,
  songs,
  setCurrSong,
  setSongs,
}) {
  // Event Handler
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo }, { currentTime: e.target.value });
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const skipTrackHandler = async (direction) => {
    const currIndex = songs.findIndex((song) => song.id === currSong.id);
    const length = songs.length;
    if (direction === "skip-back") {
      await setCurrSong(songs[currIndex !== 0 ? currIndex - 1 : length - 1]);
      getNewSongs(
        songs,
        songs[currIndex !== 0 ? currIndex - 1 : length - 1],
        setSongs
      );
    } else {
      await setCurrSong(songs[currIndex !== length - 1 ? currIndex + 1 : 0]);
      getNewSongs(
        songs,
        songs[currIndex !== length - 1 ? currIndex + 1 : 0],
        setSongs
      );
    }
    if (isPlaying) audioRef.current.play();
  };

  window.addEventListener("keypress", (e) => {
    if ((e.key === " " || e.key === "Spacebar") && audioRef.current != null) {
      playSongHandler();
    }
  });

  // Add Styles
  const trackAnimation = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  return (
    <div className="player">
      <div className="time-control">
        <div
          style={{
            background: `linear-gradient(to right, ${currSong.color[0]}, ${currSong.color[1]})`,
          }}
          className="track"
        >
          <input
            onChange={dragHandler}
            min={0}
            value={songInfo.currentTime}
            max={Math.floor(parseInt(songInfo.duration) || 0)}
            type="range"
            placeholder="Music Drag Control"
          />
          <div style={trackAnimation} className="animate-track"></div>
        </div>

        <div>
          <p>{getTime(songInfo.currentTime)}</p>
          <p>{getTime(parseInt(songInfo.duration) || 0)}</p>
        </div>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-forward")}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  );
}

export default Player;
