import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import SpotifyLoginButton from "../components/SpotifyLoginButton";
import { isAuth } from "../lib/isAuth";

export const getServerSideProps: GetServerSideProps<{ isLogin: boolean }> = async (context) => {
    const isLogin = await isAuth({ req: context.req, res: context.res, isRequiredRefreshToken: true });
    return {
        props: {
            isLogin,
        }
    }
  }

export default function Index(props: { isLogin: boolean }) {
    return <div>
        <h1>Index</h1>
        <SpotifyLoginButton />
        <div>
            {props.isLogin && <Link href="/moods">Your mood</Link>}
        </div>
    </div>;
}
