import { getCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SpotifyLoginButton() {
    const [loggedIn, setLoggedIn] = useState(false);
    const spotifyIconSize = 20;
    useEffect(() => {
        const accessToken = getCookie("accessToken");
        setLoggedIn(!!accessToken);
    }, [])
    return (
        loggedIn ? (
            <Link href="/moods">
                <button className="animate-bounce text-theme-yellow bg-theme-blue px-8 py-2 rounded-full">Start!</button>
            </Link>
        )
        : (
            <Link href="/api/auth/login">
                <button className="transition duration-150 hover:scale-125 text-theme-yellow bg-theme-blue px-5 py-2 rounded-full">Login with Spotify <Image className="inline-block" width={spotifyIconSize} height={spotifyIconSize} src="/images/spotify-icon.png" alt="" /></button>
            </Link>
        )
    );
}
