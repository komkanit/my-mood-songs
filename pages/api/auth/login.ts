import axios from "axios";
import { getCookie, setCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const scope = "streaming user-read-email user-read-private user-top-read"
    const spotifyClientId = process.env.SPOTIFY_CLIENT_ID || '';
    const spotifyRedirectUri = process.env.SPOTIFY_REDIRECT_URI || '';
    const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET || '';
    const accessToken = getCookie('accessToken', { req, res });
    const refreshToken = getCookie('refreshToken', { req, res }) as string;

    if (!accessToken && refreshToken) {
        const params = new URLSearchParams({});
        params.append("grant_type", "refresh_token");
        params.append("refresh_token", refreshToken);
        params.append("client_id", spotifyClientId);

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
        const refreshTokenResponse = response.data.refresh_token;
        setCookie('accessToken', accessToken, { maxAge: 3600, req, res });
        if (refreshTokenResponse) {
            setCookie('refreshToken', refreshTokenResponse, { maxAge: 3600 * 24, req, res });
        }
        res.redirect("/");
    } else {
        const auth_query_parameters = new URLSearchParams({
            response_type: "code",
            client_id: spotifyClientId,
            scope: scope,
            redirect_uri: spotifyRedirectUri,
        });
        
        res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
    }

}
