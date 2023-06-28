import axios from "axios";

export function generateRandomString(length: number) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

// export async function generateCodeChallenge(codeVerifier: string) {
//   function base64encode(codeVerifier: string) {
//     return btoa(String.fromCharCode.apply(null, new Uint8Array(codeVerifier)))
//       .replace(/\+/g, "-")
//       .replace(/\//g, "_")
//       .replace(/=+$/, "");
//   }

//   const encoder = new TextEncoder();
//   const data = encoder.encode(codeVerifier);
//   const digest = await window.crypto.subtle.digest("SHA-256", data);

//   return base64encode(digest);
// }

export async function generateCodeChallenge(codeVerifier: string) {
  function base64encode(buffer: ArrayBuffer): string {
    return btoa(
      String.fromCharCode.apply(null, Array.from(new Uint8Array(buffer))),
    )
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await crypto.subtle.digest("SHA-256", data);

  return base64encode(digest);
}

const clientId = process.env.REACT_APP_CLIENT_ID;
const redirectUri = process.env.REACT_APP_REDIRECTURL;

let codeVerifier = generateRandomString(128);

generateCodeChallenge(codeVerifier).then((codeChallenge) => {
  let state = generateRandomString(16);
  let scope = "user-read-private user-read-email";
  console.log(codeChallenge);
  //   localStorage.setItem("code_verifier", codeVerifier);

  //   let args = new URLSearchParams({
  //     response_type: "code",
  //     client_id: clientId,
  //     scope: scope,
  //     redirect_uri: redirectUri,
  //     state: state,
  //     code_challenge_method: "S256",
  //     code_challenge: codeChallenge,
  //   });

  //   window.location = "https://accounts.spotify.com/authorize?" + args;
});

export const getUserProfile = async () => {
  const res = await axios.get("https://api.spotify.com/v1/me");
  console.log(res);
};
