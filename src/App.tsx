import { useEffect, useState } from "react";
import "./App.css";
import "./App.css";
import { getAccessToken } from "./utils/getAccessToken";
import { getArtistData } from "./utils/getArtistData";
import Artist from "./components/artist";

const App = () => {
  return (
    <div className="App">
      <Artist />
    </div>
  );
};

export default App;
