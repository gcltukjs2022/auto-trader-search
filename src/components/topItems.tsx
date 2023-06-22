import { useState } from "react";
import { getTopTracks } from "../utils/getTopItems";

// interface iTopTracks {
//   image: string;
//   name: string;
//   artist: string;
//   preview: string;
// }

export const TopTracks = () => {
  const [topTracks, setTopTracks] = useState<any>([]);
  const accessToken = localStorage.getItem("accessToken");

  const handleClick = async () => {
    if (accessToken !== null) {
      console.log(accessToken);
      const res = await getTopTracks(accessToken);
      const tracksArr = res.map((item: any) => ({
        image: item.album.images[1].url,
        name: item.name,
        artist: item.artists[0].name,
        preview_url: item.preview_url,
      }));
      setTopTracks(tracksArr);
      console.log(tracksArr);
    }
  };
  return (
    <div>
      <h1>Top Tracks</h1>
      <button
        className="btn"
        onClick={handleClick}
      >
        Click to get your top tracks
      </button>
      <ul>
        {topTracks.map((track: any, index: number) => {
          return (
            <li key={index}>
              <div>
                <img src={track.image} />
                <h2>{track.name}</h2>
                <h3>{track.artist}</h3>
                <audio controls>
                  <source
                    src={track.preview_url}
                    type="audio/mpeg"
                  />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
