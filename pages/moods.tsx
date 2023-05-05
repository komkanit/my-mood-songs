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
const groupSize = 5

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

const Title = () => {
    const [status, setStatus] = useState('idle');
    useEffect(() => {
        const timeoutId1 = setTimeout(() => {
            setStatus('show');
        }, 100)
        const timeoutId2 = setTimeout(() => {
            setStatus('hide')
        }, 3000)
        return () => {
            clearTimeout(timeoutId1);
            clearTimeout(timeoutId2);
        }
    }, []);
    let classStatus = 'opacity-0';
    if (status === 'show') {
        classStatus = 'opacity-100 h-40vh';
    } else if (status === 'hide') {
        classStatus = 'opacity-0 h-30vh';
    }
    const transitionClass = 'transition-all ease-in-out duration-1000';
    return (
        <div className={`${transitionClass} ${classStatus} flex items-end justify-center`}>
            <div>
                <p className="text-3xl font-bold text-theme-blue text-center mt-3 mb-1">How are you feeling <span className="text-4xl">today</span>?</p>
                <p className="text-2xl text-center mb-3">Let your mood pick the <span className="text-3xl">music</span></p>
            </div>
        </div>
    );
};

export default function Index(props: { isLogin: boolean }) {
    const [groupedFeelings, setGroupedFeelings] = useState<CustomFeelingType[][]>([]);
    const [isShow, setIsShow] = useState(false);
    useEffect(() => {
        const f = shuffle(moodHelper.listFeelings());
        const g = groupFeelings(f);
        setGroupedFeelings(g)
        const timeoutId = setTimeout(() => {
            setIsShow(true);
        }
        , 4000)
        return () => {
            clearTimeout(timeoutId);
        }
    }, [])
    const groupFeelings = (feelings: FeelingType[]) => {
        const availableTailwindClass = ['w-28', 'w-32', 'w-36', 'w-40', 'h-28', 'h-32', 'h-36', 'h-40']
        const availableSizes = ['28', '32']
        const groups = [];
        for (let i = 0; i < feelings.length; i += groupSize) {
            // const sizes = ['28', '28', '32', '32', '36', availableSizes[random(0, availableSizes.length - 1)]]
            // const sizes = ['32', '32', '36', '36', '36', '40']
            const sizes = ['32', '32', '32', '32', '32', '32']
            const x = ['5%', '40%', '85%', '15%', '60%', '95%']
            const y = ['3%', '0%', '2%', '63%', '45%', '60%']
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
            !isShow ?
            <Title />
            :
            groupedFeelings.map((feelings, index) => (
                // <div className="flex flex-wrap justify-center relative w-full" style={{height: '280px'}} key={index}>
                //     { feelings.map((feeling) => <Mood key={feeling.feeling} feeling={feeling} />) }
                // </div>
                <div className="flex flex-wrap justify-center relative w-full" key={index}>
                    { feelings.map((feeling, feelingIndex) => <Mood key={feeling.feeling} index={(index * groupSize) + (feelingIndex)} feeling={feeling} />) }
                </div>
            ))
        }
    </div>);
}
