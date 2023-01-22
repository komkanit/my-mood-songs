import Image from "next/image";

export default function TitleText (props: {text: string, boldText: string, icon: string}) {
    const iconSize = 25
    return (
        <p className="flex items-center justify-center text-2xl">{props.text} <span className="text-4xl px-2">{props.boldText}</span> <Image width={iconSize} height={iconSize} src={props.icon} alt="" /></p>
    )
}
