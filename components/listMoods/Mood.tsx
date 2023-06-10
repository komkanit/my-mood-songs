import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useClickOutside } from "../../lib/hook/useClickOutside";
import { FeelingType } from "../../lib/moodHelper";
import Link from "next/link";

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
    const defaultClass = `w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 1cursor-pointer m-1 transition-all ease-in-out rounded-full ${feeling.colors[0]} flex justify-center items-center`
    // w-16
    // w-20 -> 370
    // w-24 -> 450


    return (
            isPreview ?
            <Link href={`/moods/${feeling.feeling}`}>
                <button ref={ref}
                    onClick={onPreviewClick}
                    className={`animate-wiggle ${defaultClass} flex-col`}
                    >
                    <span className="text-theme-grey font-bold cursor-pointer text-sm sm:text-lg">{feeling.feeling}</span>
                    <span className="text-theme-grey text-xs sm:text-sm">click!</span>
                </button>
            </Link>
            :
            <button
                onClick={onMoodClick}
                className={`${enterAnimation} duration-500 hover:rotate-12 hover:scale-110 ${defaultClass}`}>
                    <>
                        <div className="hidden sm:block">
                            <Image src={imageUrl} width="35" height="35" alt={feeling.feeling} />
                        </div>
                        <div className="sm:hidden block">
                            <Image src={imageUrl} width="25" height="25" alt={feeling.feeling} />
                        </div>
                    </>
            </button>
    )
    
}
