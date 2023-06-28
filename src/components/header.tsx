import chartDark from "../assets/icons/chartDark.svg";
import chartLight from "../assets/icons/chartLight.svg";
import "../App.css";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setDarkmode } from "../redux/features/darkmodeSlice";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const Header: React.FC = () => {
  const darkmodeStore = useAppSelector((state) => state.darkmode);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleToggleDarkmode = () => {
    dispatch(setDarkmode(!darkmodeStore));
  };

  const [collapseOpen, setCollapseOpen] = useState(false);

  const handleToggle = () => {
    setCollapseOpen(!collapseOpen);
  };

  return (
    <div
      className={`navbar navbar-expand-md navbar-light ${
        darkmodeStore ? "bg-black" : "bg-white"
      } sticky-top border-bottom p-2`}
    >
      <div className="container">
        <div
          className={`navbar-brand d-flex align-items-center ${
            darkmodeStore ? "text-white" : "text-dark"
          }`}
        >
          <img
            src={`${darkmodeStore ? chartLight : chartDark}`}
            alt="logo"
            className="logo me-2"
          />
          Your Spotify Stats
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={handleToggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${
            collapseOpen ? "show" : ""
          } justify-content-between`}
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav d-flex">
            <Link
              className={`nav-item nav-link ${
                darkmodeStore ? "text-light" : "text-dark"
              }`}
              to="/top-tracks"
              onClick={() => navigate("/top-tracks")}
            >
              Top Tracks
            </Link>

            <a
              className={`nav-item nav-link ${
                darkmodeStore ? "text-light" : "text-dark"
              }`}
              href="#"
            >
              Top Artists
            </a>

            <a
              className={`nav-item nav-link ${
                darkmodeStore ? "text-light" : "text-dark"
              }`}
              href="#"
            >
              Top Albums
            </a>
          </div>
          <div className="navbar-nav ml-auto">
            {/* <div className="nav-item darkmode-ctn">
              <input
                type="checkbox"
                id="darkmode-toggle"
                onClick={() => handleToggleDarkmode()}
              />
              <label htmlFor="darkmode-toggle"></label>
            </div> */}
            <Link
              className={`nav-item nav-link ${
                darkmodeStore ? "text-light" : "text-dark"
              }`}
              to="/profile"
              onClick={() => navigate("/profile")}
            >
              Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
