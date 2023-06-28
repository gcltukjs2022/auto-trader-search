import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { getAccessToken, redirectToAuthCodeFlow } from "../utils/auth";
import { useDispatch } from "react-redux";
import { setAccessTokenStore } from "../redux/features/accessTokenSlice";
import { setLogin } from "../redux/features/loginSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const darkmodeStore = useAppSelector((state) => state.darkmode);
  const [accessToken, setAccessToken] = useState<string>("");
  const accessTokenStore = useAppSelector((state) => state.accessToken);
  const clientId = process.env.REACT_APP_CLIENT_ID!;
  const loginState = useAppSelector((state) => state.login);

  const accessTokenStorage = sessionStorage.getItem("accessToken");
  const code = sessionStorage.getItem("code");
  const [codeNew, setCodeNew] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    await redirectToAuthCodeFlow(clientId);
  };

  useEffect(() => {
    if (code !== null && accessTokenStorage === null) {
      const getToken = async () => {
        const accessTokenRes = await getAccessToken(clientId, code);
        sessionStorage.setItem("accessToken", accessTokenRes);
        setAccessToken(accessTokenRes);
        dispatch(setAccessTokenStore(accessTokenRes));
        dispatch(setLogin(true));
        navigate("/top-tracks");
      };
      getToken();
    } else {
      const params = new URLSearchParams(window.location.search);

      if (params.has("code")) {
        const paramsCode = params.get("code");

        if (paramsCode !== null) {
          sessionStorage.setItem("code", paramsCode);
          setCodeNew(paramsCode);
        }
      }
    }
  }, [codeNew]);

  useEffect(() => {
    setTimeout(() => {
      sessionStorage.clear();
      localStorage.clear();
      dispatch(setLogin(false));
    }, 3600000);
  }, [accessTokenStorage, code]);

  return (
    <div
      className={`d-flex flex-column ${
        darkmodeStore ? "bg-black text-white" : "bg-white text-black"
      } `}
    >
      {!loginState && (
        <div className="Container d-flex flex-column align-items-center p-2">
          <h1>Please Login:</h1>
          <button
            type="button"
            className="btn btn-success"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
