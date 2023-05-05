import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { random } from "../../lib/helper";
import { CustomFeelingType } from "../../pages/moods";
import Image from "next/image";

const randomNumber = () => {
    const numbers = [300, 400, 500, 600, 700];
    return random(0, numbers.length - 1);
}

export default function Mood({feeling, index}: { index: number, feeling: CustomFeelingType }) {
    const [opacity, setOpacity] = useState('opacity-0')
    const [duration, setDuration] = useState('duration-300')
    const [width, setWidth] = useState(`w-${feeling.size}`);
    const [height, setHeight] = useState(`h-${feeling.size}`);
    const [zIndex, setZIndex] = useState('')
    const [scale, setScale] = useState('')
    const router = useRouter();
    const [transitionPage, setTransitionPage] = useState(false);
    const [isHover, setIsHover] = useState(false);
    console.log(index)

    useEffect(() => {
        // setTimeout(() => {
        //     setOpacity('opacity-100')
        // }, random(0, 2000 + (feeling.set * 300)))
        setTimeout(() => {
            setOpacity('opacity-100')
        }, 300 + (index * 300))
    }, [])

    const onClick = () => {
        setTransitionPage(true)
        setDuration('duration-700')
        setZIndex('z-10')
        setScale('scale-250')
        setTimeout(() => {
            router.push(`/moods/${feeling.feeling}`)
        }, 700)
    }
    const imageUrl = `/images/mood_emoji/${feeling.feeling.toLocaleLowerCase()}.png`;

    return (
        <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} onClick={onClick}
            // className={`absolute cursor-pointer ${zIndex}`} key={feeling.feeling}
            // style={{
            //     top: feeling.y, left: feeling.x, transform: 'translate(-50%, 0%)'}
            // }
            className="p-1"
            >
            <div className={`${scale} ${opacity} transition-all ${duration} ease-in-out ${transitionPage ? '' : 'hover:scale-125'} rounded-full ${feeling.colors[0]} ${width} ${height} flex justify-center items-center`}>
                {
                    isHover ?
                    <span className="font-bold">{feeling.feeling}</span>
                    :
                    <Image src={imageUrl} width="50" height="50" alt={feeling.feeling} />
                }
            </div>
        </div>
    )
    
}
