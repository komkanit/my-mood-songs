import axios from "axios";
import { getCookie, setCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const spotifyClientId = process.env.SPOTIFY_CLIENT_ID || '';
    const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET || '';
    const refreshToken = getCookie('refreshToken', { req, res }) as string;

    const params = new URLSearchParams({});
    params.append("grant_type", "refresh_token");
    params.append("refresh_token", refreshToken);
    params.append("client_id", spotifyClientId);
    try {
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
            res.status(403).json({ error: "Something went wrong" });
        }
        const accessToken = response.data.access_token;

        res.status(200).json({ accessToken, refreshToken });
    } catch(error) {
        res.status(403).json({ error: "Something went wrong" });
    }


}
