import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import Mood from "../components/listMoods/Mood";
import { random, shuffle } from "../lib/helper";
import { isAuth } from "../lib/isAuth";
import { FeelingType, moodHelper } from "../lib/moodHelper";

export type CustomFeelingType = FeelingType & {
    size: string;
    x: string;
    y: string;
    set: number;
}

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
    const [groupedFeelings, setGroupedFeelings] = useState<CustomFeelingType[][]>([]);
    useEffect(() => {
        const f = shuffle(moodHelper.listFeelings());
        const g = groupFeelings(f);
        setGroupedFeelings(g)
    }, [])
    const groupFeelings = (feelings: FeelingType[]) => {
        const availableTailwindClass = ['w-28', 'w-32', 'w-36', 'h-28', 'h-32', 'h-36']
        const availableSizes = ['28', '32']
        const groupSize = 6
        const groups = [];
        for (let i = 0; i < feelings.length; i += groupSize) {
            const sizes = ['28', '28', '32', '32', '36', availableSizes[random(0, availableSizes.length - 1)]]
            const x = ['5%', '40%', '85%', '15%', '60%', '95%']
            const y = ['3%', '0%', '2%', '60%', '45%', '60%']
            const randomSizes = shuffle(sizes);
            const f = feelings.slice(i, i + groupSize);
            const g = f.map((feeling, index) => {
                return {
                    ...feeling,
                    size: randomSizes[index],
                    x: x[index],
                    y: y[index],
                    set: i
                }
            })
            groups.push(g);
        }
        return groups;
    }
    
    return (<div className="mt-0">
        {
            groupedFeelings.slice(0, 1).map((feelings, index) => (
                <div className="flex flex-wrap justify-center relative w-full" style={{height: '260px'}} key={index}>
                    { feelings.map((feeling) => <Mood key={feeling.feeling} feeling={feeling} />) }
                </div>
            ))
        }
        <div className="my-5">
            <p className="text-3xl font-bold text-theme-grey text-center mt-3">How are you feeling today?</p>
            <p className="text-2xl text-center mb-3">Let your mood pick the music</p>
        </div>
        {
            groupedFeelings.slice(1).map((feelings, index) => (
                <div className="flex flex-wrap justify-center relative w-full" style={{height: '260px'}} key={index}>
                    { feelings.map((feeling) => <Mood key={feeling.feeling} feeling={feeling} />) }
                </div>
            ))
        }
    </div>);
}
