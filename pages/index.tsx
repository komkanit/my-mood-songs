import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SpotifyLoginButton from "../components/login/SpotifyLoginButton";
import TitleText from "../components/login/TitleText";
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
    return (
        <div className="text-center mt-8">
            <TitleText text="You tell your" boldText="mood" icon="/images/smile-icon.png" />
            <TitleText text="I tell you" boldText="songs" icon="/images/music-icon.png" />
            <Image className="mx-auto my-5" width={250} height={250} src="/images/mood-main.png" alt="" />
            <p className="mb-5">Personalize songs for your current mood</p>
            <SpotifyLoginButton />
        </div>
    );
}
