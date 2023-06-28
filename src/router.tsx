import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Landing from "./pages/landing";
import UserProfile from "./components/userProfile";
import Header from "./components/header";
import { TopTracks } from "./components/topTracks";
import Login from "./components/login";

const AppRouter = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />
        <Route
          path="/callback"
          element={<Login />}
        />
        <Route
          path="/top-tracks"
          element={<TopTracks />}
        />
        <Route
          path="/profile"
          element={<UserProfile />}
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
