import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import Mood from "../components/listMoods/Mood";
import { isAuth } from "../lib/isAuth";
import { FeelingType, moodHelper } from "../lib/moodHelper";

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

const shuffle = (array: any[]) => {
    let currentIndex = array.length,  randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

export default function Index(props: { isLogin: boolean }) {
    const [feelings, setFeelings] = useState<FeelingType[]>([]);
    useEffect(() => {
        const f = shuffle(moodHelper.listFeelings());
        setFeelings(f)
    }, [])
    const firstSet = 8
    
    return (<div className="mt-10">
        <p className="text-2xl font-bold text-theme-grey text-center mt-3">How are you feeling today?</p>
        <p className="text-xl text-center mb-3">Let your mood pick the music</p>
        <div className="flex flex-wrap justify-center">
            { feelings.map((feeling) => <Mood key={feeling.feeling} feeling={feeling} />) }
        </div>
    </div>);
}
