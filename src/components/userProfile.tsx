import { useEffect, useState } from "react";
import { getUserProfile } from "../utils/getUserProfile";
import { Profile } from "../App";

interface UserProfileProps {
  details: Profile;
}

const UserProfile: React.FC<UserProfileProps> = ({ details }) => {
  const imgUrl = `https://flagsapi.com/${details.country}/flat/64.png`;

  return (
    <div className="profile">
      <h1>Hello {details.name}</h1>
      <img src={imgUrl} />
      <ul>
        <li>Email: {details.email}</li>
        <li>Plan: {details.product}</li>
        <li>
          Spotify URI: {details.urls.spotify}
          {/* <a
            id="uri"
            href="#"
          ></a> */}
        </li>
        <li>followers: {details.followers}</li>
        {/* <li>
          Profile Image: <span id="imgUrl"></span>
        </li> */}
      </ul>
    </div>
  );
};

export default UserProfile;
