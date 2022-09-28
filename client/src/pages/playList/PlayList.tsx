import React from "react";

const PlayList = () => {
  const genres = [
    "Bollywood Songs",
    "Devotional Songs",
    "Ghazals",
    "Bhajan",
    "Patriotic Songs",
    "Kids Songs",
    "Rock Songs",
    "Disco Songs",
    "Sufi Songs",
    "Love Songs",
    "View all",
  ];

  return (
    <div className="container">
      <h1 className="mt-2">Best Playlist</h1>

      <ul className="mt-5">
        {genres.map((genre) => (
          <div>
            <li>{genre}</li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default PlayList;
