import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import { isAuth } from "../lib/isAuth";
import { moodHelper } from "../lib/moodHelper";

export const getServerSideProps: GetServerSideProps<{ isLogin: boolean }> = async (context) => {
    const isLogin = await isAuth({ req: context.req, res: context.res, isRequiredRefreshToken: true });
    if (!isLogin) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    return {
        props: {
            isLogin,
        }
    }
  }

export default function Index(props: { isLogin: boolean }) {
    const moodIds = moodHelper.listMoodIds();
    
    return (<div>
        <h1>moods</h1>
        {
            moodIds.map((moodId) => {
                const mood = moodHelper.getMood(moodId);
                return <div key={moodId}>
                    <Link href={`/moods/${moodId}`}>
                        {mood.text}
                    </Link>
                </div>
            })
        }
    </div>);
}
