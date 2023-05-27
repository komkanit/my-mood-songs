import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useClickOutside } from "../../lib/hook/useClickOutside";
import { FeelingType } from "../../lib/moodHelper";

export default function Mood({feeling, index}: { index: number, feeling: FeelingType }) {
    const [isHide, setIsHide] = useState(true)
    const router = useRouter();
    const ref = useRef(null);
    const [isPreview, setIsPreview] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsHide(false);
        }, 300 + (index * 200))
        return () => {
            clearTimeout(timeoutId);
        }
    }, []);

    useClickOutside(ref, () => {
        setIsPreview(false);
    });

    const onPreviewClick = () => {
        router.push(`/moods/${feeling.feeling}`)
    }

    const onMoodClick = () => {
        setIsPreview(true);
    }
    const enterAnimation = isHide ? `opacity-0 ${index % 2 === 0 ? 'rotate-12' : '-rotate-12'}` : 'opacity-100 rotate-0';
    const imageUrl = `/images/mood_emoji/${feeling.feeling.toLocaleLowerCase()}.png`;
    const defaultClass = `cursor-pointer m-1 transition-all ease-in-out rounded-full ${feeling.colors[0]} w-32 h-32 flex justify-center items-center`

    return (
            isPreview ?
            <button ref={ref}
                onClick={onPreviewClick}
                className={`animate-wiggle ${defaultClass} flex-col`}
                >
                <span className="text-theme-grey font-bold cursor-pointer text-2xl">{feeling.feeling}</span>
                <span className="text-theme-grey">click!</span>
            </button>
            :
            <button
                onClick={onMoodClick}
                className={`${enterAnimation} duration-500 hover:rotate-12 hover:scale-110 ${defaultClass}`}>
                {
                    <Image src={imageUrl} width="50" height="50" alt={feeling.feeling} />
                }
            </button>
    )
    
}
