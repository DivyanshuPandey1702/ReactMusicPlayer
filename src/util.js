export const getNewSongs = (songs, song, setSongs) => {
  const newSongs = songs.map((s) => {
    if (s.id === song.id) {
      return {
        ...s,
        active: true,
      };
    } else {
      return {
        ...s,
        active: false,
      };
    }
  });
  setSongs(newSongs);
};
