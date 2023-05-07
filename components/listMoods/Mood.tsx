import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { random } from "../../lib/helper";
import { CustomFeelingType } from "../../pages/moods";
import Image from "next/image";
import { useClickOutside } from "../../lib/hook/useClickOutside";

const randomNumber = () => {
    const numbers = [300, 400, 500, 600, 700];
    return random(0, numbers.length - 1);
}

export default function Mood({feeling, index}: { index: number, feeling: CustomFeelingType }) {
    const [opacity, setOpacity] = useState('opacity-0')
    const [width, setWidth] = useState(`w-${feeling.size}`);
    const [height, setHeight] = useState(`h-${feeling.size}`);
    const [scale, setScale] = useState('')
    const router = useRouter();
    const [transitionPage, setTransitionPage] = useState(false);
    const ref = useRef(null);
    const [isPreview, setIsPreview] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setOpacity('opacity-100')
        }, 300 + (index * 300))
    }, [])

    useClickOutside(ref, () => {
        setIsPreview(false);
    });

    const onPreviewClick = () => {
        router.push(`/moods/${feeling.feeling}`)
    }

    const onMoodClick = () => {
        setIsPreview(true);
    }
    const imageUrl = `/images/mood_emoji/${feeling.feeling.toLocaleLowerCase()}.png`;

    const defaultClass = `cursor-pointer transition-all ease-in-out rounded-full ${feeling.colors[0]} ${width} ${height} flex justify-center items-center`

    return (
            isPreview ?
            <div ref={ref} onClick={onPreviewClick}
                className="m-1"
                >
                <div className={`animate-wiggle ${defaultClass} flex-col`}>
                    <span className="text-theme-grey font-bold cursor-pointer text-2xl">{feeling.feeling}</span>
                    <span className="text-theme-grey">click!</span>
                        {/* <Image src="/images/arrow-down-icon.svg" width="15" height="10" alt="" /> */}
                </div>
            </div>
            :
            <div onClick={onMoodClick}
            className="m-1"
            >
            <div className={`${opacity} duration-300 hover:rotate-12 hover:scale-110 ${defaultClass}`}>
                {
                    <Image src={imageUrl} width="50" height="50" alt={feeling.feeling} />
                }
            </div>
        </div>
    )
    
}
