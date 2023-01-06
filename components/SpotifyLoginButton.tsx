import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

export default function SpotifyLoginButton() {
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        const accessToken = getCookie("accessToken");
        setLoggedIn(!!accessToken);
    }, [])
    return (
        loggedIn ? (
            <button>Logged in</button>
        )
        : (
            <a href="/api/auth/login">
                <button>Login with Spotify</button>
            </a>
        )
    );
}
