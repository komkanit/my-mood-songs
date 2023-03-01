import Link from "next/link";
import { FeelingType } from "../../lib/moodHelper";

const randomNumber = () => {
    const numbers = [300, 400, 500, 600, 700];
    return Math.floor(Math.random() * numbers.length);
}

const randomSize = () => {
    // const width = ['w-16', 'w-20', 'w-24', 'w-28', 'w-32', 'w-36', 'w-40']
    // const height = ['h-16', 'h-20', 'h-24', 'h-28', 'h-32', 'h-36', 'h-40']
    const width = ['w-16', 'w-24','w-16', 'w-24', 'w-32','w-16', 'w-24', 'w-32', 'w-36']
    const height = ['h-16', 'h-24','h-16', 'h-24', 'h-32','h-16', 'h-24', 'h-32', 'h-36']
    const index = Math.floor(Math.random() * width.length);
    return {
        width: width[index],
        height: height[index],
    }
}

const randomPosition = () => {
    const position = ['m-0', 'mt-2', 'mt-3', 'mt-4', 'mt-6']
    const index = Math.floor(Math.random() * position.length);
    return position[index];
}

export default function Mood({feeling}: { feeling: FeelingType }) {
    const size = randomSize()

    return (
        <Link key={feeling.feeling} href={`/moods/${feeling.mood}`} className={`m-0.5 ${size.width !== 'w-36' ? randomPosition() : ''}`}>
            <div className={`rounded-full ${feeling.colors[randomNumber()]} ${size.width} ${size.height} flex justify-center items-center`}>
                <span className="font-bold">{feeling.feeling}</span>
            </div>
        </Link>
    )
    
}
