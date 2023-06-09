import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import Mood from "../components/listMoods/Mood";
import { shuffle } from "../lib/helper";
import { isAuth } from "../lib/isAuth";
import { FeelingType, moodHelper } from "../lib/moodHelper";
import { Transition } from "@headlessui/react";


const groupSize = 7

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
    const [isShow, setIsShow] = useState(false);
    useEffect(() => {
        const timeoutId1 = setTimeout(() => {
            setIsShow(true)
        }, 100)
        const timeoutId2 = setTimeout(() => {
            setIsShow(false)
        }, 3000)
        return () => {
            clearTimeout(timeoutId1);
            clearTimeout(timeoutId2);
        }
    }, []);
    return (
        <Transition
            show={isShow}
            as={React.Fragment}
            enter="transition-all duration-1000"
            enterFrom="opacity-0 h-30vh"
            enterTo="opacity-100 h-40vh"
            leave="transition-all duration-1000"
            leaveFrom="opacity-100 h-40vh"
            leaveTo="opacity-0 h-30vh"
        >
            <div className="flex items-end justify-center">
                <div>
                    <p className="text-3xl font-bold text-theme-blue text-center mt-3 mb-1">How are you feeling <span className="text-4xl">today</span>?</p>
                    <p className="text-2xl text-center mb-3">Let your mood pick the <span className="text-3xl">music</span></p>
                </div>
            </div>
        </Transition>
    );
};
const groupFeelings = (feelings: FeelingType[]) => {
    const groups = [];
    for (let i = 0; i < feelings.length; i += groupSize) {
        const f = feelings.slice(i, i + groupSize);
        const g = f.map((feeling, index) => {
            return {
                ...feeling,
            }
        })
        groups.push(g);
    }
    return groups;
}

export default function Index(props: { isLogin: boolean }) {
    const [groupedFeelings, setGroupedFeelings] = useState<FeelingType[][]>([]);
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
    
    return (
    <div className="mt-0 px-2">
        {
            !isShow ?
            <Title />
            :
                    // <div className="flex flex-wrap justify-center relative w-full">
                    //     {
                    //         groupedFeelings.map((feelings, index) => (
                    //             // <div className="flex flex-wrap justify-center relative w-full" key={index}>
                    //             //     { feelings.map((feeling, feelingIndex) => <Mood key={feeling.feeling} index={(index * groupSize) + (feelingIndex)} feeling={feeling} />) }
                    //             // </div>
                    //             feelings.map((feeling, feelingIndex) => <Mood key={feeling.feeling} index={(index * groupSize) + (feelingIndex)} feeling={feeling} />)
                    //         ))
                    //     }
                    // </div>
                    groupedFeelings.map((feelings, index) => (
                        <div className="flex flex-wrap justify-center relative w-full" key={index}>
                            { feelings.map((feeling, feelingIndex) => <Mood key={feeling.feeling} index={(index * groupSize) + (feelingIndex)} feeling={feeling} />) }
                        </div>
                    ))
        }
    </div>);
}
