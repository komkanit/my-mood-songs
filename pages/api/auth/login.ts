import axios from "axios";
import { getCookie, setCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const scope = "streaming user-read-email user-read-private user-top-read playlist-modify-public playlist-modify-private"
    const spotifyClientId = process.env.SPOTIFY_CLIENT_ID || '';
    const spotifyRedirectUri = process.env.SPOTIFY_REDIRECT_URI || '';

    const auth_query_parameters = new URLSearchParams({
        response_type: "code",
        client_id: spotifyClientId,
        scope: scope,
        redirect_uri: spotifyRedirectUri,
    });
    
    res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());

}
