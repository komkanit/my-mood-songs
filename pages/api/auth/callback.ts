import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { setCookie } from "cookies-next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const code = req.query.code as string;
    const spotifyClientId = process.env.SPOTIFY_CLIENT_ID || "";
    const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET || '';
    const spotifyRedirectUri = process.env.SPOTIFY_REDIRECT_URI || '';

  const params = new URLSearchParams({ code });
  params.append("redirect_uri", spotifyRedirectUri);
  params.append("grant_type", "authorization_code");

  const response = await axios.post('https://accounts.spotify.com/api/token', params, {
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(spotifyClientId + ":" + spotifyClientSecret).toString(
          "base64"
        ),
      "Content-Type": "application/x-www-form-urlencoded",
    }
  })
  if (response.status !== 200) {
    res.status(500).json({ error: "Something went wrong" });
  }
  const accessToken = response.data.access_token;
  const refreshToken = response.data.refresh_token;
  setCookie('accessToken', accessToken, { maxAge: 3600, req, res });
  setCookie('refreshToken', refreshToken, { maxAge: 3600 * 24 * 2, req, res });
  res.redirect("/");
}
