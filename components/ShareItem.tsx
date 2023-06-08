import { useCallback, useRef, useState } from "react";
import { toPng, getFontEmbedCSS, toCanvas } from 'html-to-image';
import download from 'downloadjs';
import { SpotifyTrack } from "../lib/spotifyClient";
import { moodHelper } from "../lib/moodHelper";
import Image from "next/image";

const Emoji = (props: {moodName: string, color?: string}) => {
    return (
        <div className={`w-16 h-16 ${props.color} rounded-full flex items-center justify-center`}>
            <img className="w-8 h-auto" src={`/images/mood_emoji/${props.moodName.toLocaleLowerCase()}.png`} alt="" />
        </div>
    );
}

const getButtonText = (status: string) => {
    if (status === 'idle') {
        return 'Download'
    }
    if (status === 'processing') {
        return 'Processing...'
    }
    if (status === 'downloading') {
        return 'Loading...'
    }
}

export default function ShareItem (props: {moodName: string, recommendedTracks: SpotifyTrack[]}) {
    const ref = useRef(null) as any;
    const title = `My ${props.moodName} mood`;
    const mood = moodHelper.getMoodByFeeling(props.moodName);
    const [status, setStatus] = useState<'idle' | 'processing' | 'downloading'>('idle');
      
    const onButtonClick = useCallback(async () => {
        if (ref.current === null) {
            return
        }
        setStatus('processing');
        setTimeout(() => {
            setStatus('downloading');
        }, 3000)
        setTimeout(() => {
            // toCanvas(ref.current, { includeQueryParams: true })
            // .then((canvas) => {
            //     document.getElementById('canvas-container')?.appendChild(canvas);
            // })
            toPng(ref.current, { includeQueryParams: true })
            .then((dataUrl) => {
                setStatus('idle');
                download(dataUrl, `my-${props.moodName}-name.png`)
            })
            .catch((err) => {
                console.log(err)
            })
        }, 7000)

    
    }, [ref])
    return (
    <>
      <div ref={ref} className={` font-sans w-full bg-theme-grey pt-1 pb-8 overflow-hidden ${mood?.gradient}`}>
        <div className="">
            <div className="flex flex-wrap justify-between mx-6">
                <Emoji color={mood?.colors[0]} moodName={props.moodName} />
                <Emoji color={mood?.colors[0]} moodName={props.moodName} />
                <Emoji color={mood?.colors[0]} moodName={props.moodName} />
                <Emoji color={mood?.colors[0]} moodName={props.moodName} />
            </div>
            <div className="flex flex-wrap justify-between w-110 -ml-5p -mt-1">
                <Emoji color={mood?.colors[0]} moodName={props.moodName} />
                <Emoji color={mood?.colors[0]} moodName={props.moodName} />
                <Emoji color={mood?.colors[0]} moodName={props.moodName} />
                <Emoji color={mood?.colors[0]} moodName={props.moodName} />
                <Emoji color={mood?.colors[0]} moodName={props.moodName} />
            </div>
            <div className="flex flex-wrap justify-between mx-6">
                <Emoji color={mood?.colors[0]} moodName={props.moodName} />
                <Emoji color={mood?.colors[0]} moodName={props.moodName} />
                <Emoji color={mood?.colors[0]} moodName={props.moodName} />
                <Emoji color={mood?.colors[0]} moodName={props.moodName} />
            </div>
            <div className="flex flex-wrap justify-between w-110 -ml-5p -mt-1">
                <Emoji color={mood?.colors[0]} moodName={props.moodName} />
                <Emoji color={mood?.colors[0]} moodName={props.moodName} />
                <Emoji color={mood?.colors[0]} moodName={props.moodName} />
                <Emoji color={mood?.colors[0]} moodName={props.moodName} />
                <Emoji color={mood?.colors[0]} moodName={props.moodName} />
            </div>
            <div className="flex w-40 flex-wrap mx-auto -mt-48">
                {props.recommendedTracks.slice(0, 4).map((track, index) => {
                    return (
                        <div key={track.id} className="w-20">
                            <img src={track.album.images[0].url} alt="" />
                        </div>
                    )
                })}
            </div>
            <p className="text-center font-extrabold text-3xl mt-10">{title}</p>
            <p className="text-center mb-2 text-sm text-theme-grey">Personalized playlist based on your {props.moodName} mood</p>
            <div className="">
                {props.recommendedTracks.slice(0, 4).map((track, index) => {
                    return (
                        <div key={track.id} className={`flex justify-between items-center px-2 pt-2 ml-12`}>
                            <div className="flex items-center">
                                <div className="w-16 h-16">
                                    <img src={track.album.images[0].url} alt="" />
                                </div>
                                <div className="ml-2">
                                    <p className="text-theme-grey text-lg">{track.name}</p>
                                    <p className="text-black text-md">{track.artists[0].name}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="flex justify-between items-center px-2 pt-2 ml-12">
                <div className="flex items-center">
                    <div className="w-20 h-20 -ml-2">
                        <img src="/images/qr.png" alt="" />
                    </div>
                    <div className="ml-2">
                        <p className="text-theme-grey text-lg">Your playlist</p>
                        <p className="text-black text-md">moodify-songs.vercel.app</p>
                    </div>
                </div>
            </div>

        </div>
      </div>
      <div className={`${mood?.colors[0]} -mt-4 pb-2 text-end pr-4`}>
        <button className="text-theme-yellow px-3 py-1 flex ml-auto rounded-2xl bg-black shadow-md hover:bg-gray-800" disabled={status !== 'idle'} onClick={onButtonClick}>
            <Image className="mr-2 inline-block" src="/images/download.png" width="15" height="15" alt="" />
            <span className="inline-block">
                {getButtonText(status)}
            </span>
            </button>
      </div>
    </> 
    );
}
