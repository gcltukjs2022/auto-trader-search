import { useEffect, useState } from "react";
import { getArtistData } from "../utils/getArtistData";

interface iArtist {
  name: string;
  genres: string[];
  followers: number | null;
  popularity: number | null;
  imgUrl: string;
  url: string;
}

const Artist = () => {
  const [artist, setArtist] = useState<iArtist>({
    name: "",
    genres: [],
    followers: null,
    popularity: null,
    imgUrl: "",
    url: "",
  });

  const handleClick = async () => {
    const id = "06HL4z0CvFAxyc27GXpf02?si=_fzhIEZHQ9SDk3arGxbGdw";
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      const artistRes = await getArtistData(accessToken, id);
      console.log(artistRes);
      setArtist((prev) => ({
        ...prev,
        name: artistRes.name,
        genres: artistRes.genres,
        followers: artistRes.followers.total,
        popularity: artistRes.popularity,
        imgUrl: artistRes.images[1].url,
        url: artistRes.external_urls,
      }));
    }
  };

  useEffect(() => {
    console.log(artist);
  }, [artist]);

  return (
    <section className="section">
      <h1>Your Spotify Stats</h1>
      <button onClick={() => handleClick()}>Click to get artist details</button>
      <h2>Name: </h2>
      <h2>{artist.name}</h2>
      <img src={artist.imgUrl} />
      <h2>Genres:</h2>
      <ul>
        {artist.genres.map((genre, index) => (
          <li key={index}>{genre}</li>
        ))}
      </ul>
      <h2>Popularity: {artist.popularity}</h2>
      <h2>Followers: {artist.followers}</h2>
    </section>
  );
};

export default Artist;
