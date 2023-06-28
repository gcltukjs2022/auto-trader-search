import { useEffect, useState } from "react";
import { getTopTracks } from "../utils/getTopItems";
import "../App.css";
import { useAppSelector } from "../redux/hooks";

interface iTopTracks {
  image: string;
  name: string;
  artist: string;
  preview: string;
}

export const TopTracks = () => {
  const [topTracks, setTopTracks] = useState<iTopTracks[]>([]);
  const accessToken = sessionStorage.getItem("accessToken");
  const loginState = useAppSelector((state) => state.login);

  useEffect(() => {
    (async () => {
      if (accessToken !== null && loginState) {
        const res = await getTopTracks(accessToken);
        const tracksArr = res.map((item: any) => ({
          image: item.album.images[1].url,
          name: item.name,
          artist: item.artists[0].name,
          preview_url: item.preview_url,
        }));
        setTopTracks(tracksArr);
      } else {
        setTopTracks([]);
      }
    })();
  }, [accessToken, loginState]);

  return (
    <div className="container ">
      <div className="p-1 p-sm-2 p-md-3 p-lg-4 p-xl-5">
        <h1 className="text-center">Top Tracks</h1>

        <div className="row">
          {topTracks.map((track: any, index: number) => {
            return (
              <div className="col-12">
                <div className="row">
                  <div className="rank-number col-2 border d-flex align-items-center justify-content-center ">
                    <h1
                      id="track_number"
                      className="text-white text-center fs-4 fs-md-3 fs-lg-1"
                    >
                      {index + 1}
                    </h1>
                  </div>
                  <div
                    className="col-10 border"
                    key={index}
                  >
                    <div
                      className="list-group-item d-flex align-items-center"
                      id="items_song"
                    >
                      <div className="container d-flex flex-column align-items-center mt-3">
                        <p
                          id="track_name"
                          className="text-center fs-6 fs-md-3 fs-lg-4"
                        >
                          {track.name}
                        </p>
                        <p
                          id="track_artist"
                          className="text-center fs-6  fs-md-5 fs-lg-6"
                        >
                          {track.artist}
                        </p>
                      </div>
                      <img
                        src={track.image}
                        alt="track"
                        id="track_img"
                        className="img-fluid m-6 img-md m-3"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
