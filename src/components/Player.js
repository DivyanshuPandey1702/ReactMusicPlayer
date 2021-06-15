import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
  faRandom,
  faVolumeUp,
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
  shuffleStatus,
  setShuffleStatus,
}) {
  const [volOn, setVolOn] = useState(true);
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
      if (shuffleStatus) {
        const n = Math.floor(Math.random() * length);
        await setCurrSong(songs[n]);
        getNewSongs(songs, songs[n], setSongs);
      } else {
        await setCurrSong(songs[currIndex !== 0 ? currIndex - 1 : length - 1]);
        getNewSongs(
          songs,
          songs[currIndex !== 0 ? currIndex - 1 : length - 1],
          setSongs
        );
      }
    } else {
      if (shuffleStatus) {
        const n = Math.floor(Math.random() * length);
        await setCurrSong(songs[n]);
        getNewSongs(songs, songs[n], setSongs);
      } else {
        await setCurrSong(songs[currIndex !== length - 1 ? currIndex + 1 : 0]);
        getNewSongs(
          songs,
          songs[currIndex !== length - 1 ? currIndex + 1 : 0],
          setSongs
        );
      }
    }
    if (isPlaying) audioRef.current.play();
  };

  const changeVolumeHandler = (e) => {
    audioRef.current.volume = e.target.value / 100;
  };

  const volOnHandler = () => {
    if (volOn === true) {
      setVolOn(false);
    } else {
      setVolOn(true);
    }
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
          icon={faRandom}
          onClick={() => setShuffleStatus(!shuffleStatus)}
          className={`icon-hover ${shuffleStatus ? "shuffle-color" : ""}`}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back icon-hover"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play icon-hover"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-forward")}
          className="skip-forward icon-hover"
          size="2x"
          icon={faAngleRight}
        />
        <FontAwesomeIcon
          icon={faVolumeUp}
          onClick={volOnHandler}
          className={`icon-hover ${volOn ? "" : "shuffle-color"}`}
        />
      </div>
      <div className={`volume-control ${volOn ? "vol-on" : ""}`}>
        <input
          type="range"
          onChange={changeVolumeHandler}
          min="0"
          max="100"
          placeholder="Volume Control"
        />
      </div>
    </div>
  );
}

export default Player;
