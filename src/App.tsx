import { useEffect, useState } from "react";
import "./App.css";

import { getArtistData } from "./utils/getArtistData";
import Artist from "./components/artist";
import UserProfile from "./components/userProfile";
import {
  fetchProfile,
  getAccessToken,
  redirectToAuthCodeFlow,
} from "./utils/script";
import { TopTracks } from "./components/topItems";

export interface Profile {
  country: string;
  name: string;
  email: string;
  urls: {
    [key: string]: string;
  };
  followers: number;
  images: string;
  product: string;
  type: string;
}

const App: React.FC = () => {
  const [details, setDetails] = useState<Profile>();
  const [logged, setLogged] = useState<boolean>(false);
  const [code, setCode] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string>("");

  const clientId = process.env.REACT_APP_CLIENT_ID!;

  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams(window.location.search);
      const paramsCode = params.get("code");
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken === null) {
        if (paramsCode !== null) {
          setCode(paramsCode);
        }

        if (code !== null) {
          const accessTokenRes = await getAccessToken(clientId, code);
          localStorage.clear();
          localStorage.setItem("accessToken", accessTokenRes);
          setAccessToken(accessTokenRes);
        }
      } else {
        setLogged(true);
      }
    };
    fetchData();
  }, [code, accessToken]);

  const handleLogin = async () => {
    await redirectToAuthCodeFlow(clientId);
  };

  const handleProfile = async () => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      const profile = await fetchProfile(accessToken);
      console.log(profile, "response from fetch profile");
      setDetails((prev) => ({
        ...prev,
        country: profile.country,
        name: profile.display_name,
        email: profile.email,
        urls: profile.external_urls,
        followers: profile.followers.total,
        images: profile.images.url,
        product: profile.product,
        type: profile.type,
      }));
    }
  };

  return (
    <div className="App">
      <h1>Your Spotify Profile</h1>

      {!logged ? (
        <>
          <h1>Please Login:</h1>
          <button
            className="btn"
            onClick={handleLogin}
          >
            Login
          </button>
        </>
      ) : (
        <button
          className="btn"
          onClick={handleProfile}
        >
          Profile
        </button>
      )}
      {details && (
        <>
          <UserProfile details={details} />
          <TopTracks />
        </>
      )}
    </div>
  );
};

export default App;
