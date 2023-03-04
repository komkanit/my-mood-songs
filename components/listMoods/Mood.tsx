import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { random } from "../../lib/helper";
import { CustomFeelingType } from "../../pages/moods";

const randomNumber = () => {
    const numbers = [300, 400, 500, 600, 700];
    return random(0, numbers.length - 1);
}

export default function Mood({feeling}: { feeling: CustomFeelingType }) {
    const [opacity, setOpacity] = useState('opacity-0')
    const [duration, setDuration] = useState('duration-300')
    const [width, setWidth] = useState(`w-${feeling.size}`);
    const [height, setHeight] = useState(`h-${feeling.size}`);
    const [zIndex, setZIndex] = useState('')
    const [scale, setScale] = useState('')
    const router = useRouter();
    const [transitionPage, setTransitionPage] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setOpacity('opacity-100')
        }, random(0, 2000 + (feeling.set * 300)))
    }, [])

    const onClick = () => {
        setTransitionPage(true)
        setDuration('duration-700')
        setZIndex('z-10')
        setScale('scale-250')
        setTimeout(() => {
            router.push(`/moods/${feeling.mood}`)
        }, 700)
    }

    return (
        <div onClick={onClick} className={`absolute cursor-pointer ${zIndex}`} key={feeling.feeling} style={{top: feeling.y, left: feeling.x, transform: 'translate(-50%, 0%)'}}>
            <div className={`${scale} ${opacity} transition-all ${duration} ease-in-out ${transitionPage ? '' : 'hover:scale-125'} rounded-full ${feeling.colors[randomNumber()]} ${width} ${height} flex justify-center items-center`}>
                <span className="font-bold">{feeling.feeling}</span>
            </div>
        </div>
    )
    
}
