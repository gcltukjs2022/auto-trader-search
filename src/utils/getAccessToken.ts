import axios from "axios";

export const getAccessToken = async () => {
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
  try {
    const body =
      "grant_type=client_credentials&client_id=" +
      CLIENT_ID +
      "&client_secret=" +
      CLIENT_SECRET;

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };

    const res = await axios.post(
      "https://accounts.spotify.com/api/token",
      body,
      { headers },
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
