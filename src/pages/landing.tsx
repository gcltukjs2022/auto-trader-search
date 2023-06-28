import { useState } from "react";
import Header from "../components/header";
import { useAppSelector } from "../redux/hooks";
import Login from "../components/login";
import UserProfile from "../components/userProfile";
import { TopTracks } from "../components/topTracks";

const Landing = () => {
  const accessTokenStore = useAppSelector((state) => state.accessToken);

  return (
    <div className="landing">
      <Header />
      {/* {accessTokenStore.length > 0 ? <UserProfile /> : <Login />} */}
      <Login />
      <UserProfile />
      <TopTracks />
    </div>
  );
};

export default Landing;
