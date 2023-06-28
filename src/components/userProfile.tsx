import { useEffect, useState } from "react";
import { getUserProfile } from "../utils/getUserProfile";
import { useAppSelector } from "../redux/hooks";
import { fetchProfile } from "../utils/auth";
import { useDispatch } from "react-redux";
import { setLogin } from "../redux/features/loginSlice";
import { useNavigate } from "react-router-dom";

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

const UserProfile: React.FC = () => {
  const dispatch = useDispatch();
  const accessTokenStore = useAppSelector((state) => state.accessToken);
  const loginState = useAppSelector((state) => state.login);
  const accessTokenStorage = sessionStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [details, setDetails] = useState<Profile>();
  const imgUrl = `https://flagsapi.com/${details?.country}/flat/64.png`;

  useEffect(() => {
    (async () => {
      if (accessTokenStorage !== null && accessTokenStorage.length > 0) {
        const profile = await fetchProfile(accessTokenStorage);

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
    })();
  }, [accessTokenStore]);

  const handleLogOut = () => {
    sessionStorage.clear();
    localStorage.clear();
    dispatch(setLogin(false));
    navigate("/");
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center p-2">
      {loginState && (
        <div>
          <h1 className="pt-4">Hello {details?.name}</h1>
          <img
            src={imgUrl}
            className="align-self-center"
          />
          <ul>
            <li>Email: {details?.email}</li>
            <li>Plan: {details?.product}</li>
            <li>
              Spotify URI: {details?.urls.spotify}
              {/* <a
            id="uri"
            href="#"
          ></a> */}
            </li>
            <li>followers: {details?.followers}</li>
            {/* <li>
          Profile Image: <span id="imgUrl"></span>
        </li> */}
          </ul>
        </div>
      )}
      {loginState && (
        <button
          className="btn btn-success"
          onClick={() => handleLogOut()}
        >
          Log out
        </button>
      )}
    </div>
  );
};

export default UserProfile;
