import { useCallback, useRef, useState } from "react";
import { toPng, getFontEmbedCSS, toCanvas } from 'html-to-image';
import download from 'downloadjs';
import { SpotifyTrack } from "../lib/spotifyClient";
import { moodHelper } from "../lib/moodHelper";

const Emoji = (props: {moodName: string, color?: string}) => {
    return (
        <div className={`w-16 h-16 ${props.color} rounded-full flex items-center justify-center`}>
            <img className="w-10 h-auto" src={`/images/mood_emoji/${props.moodName.toLocaleLowerCase()}.png`} alt="" />
        </div>
    );
}

export default function ShareItem (props: {moodName: string, recommendedTracks: SpotifyTrack[]}) {
    const ref = useRef(null) as any;
    const [isLoading, setIsLoading] = useState(false);
    const title = `My ${props.moodName} Beats`;
    const mood = moodHelper.getMoodByFeeling(props.moodName);
      
    const onButtonClick = useCallback(async () => {
        if (ref.current === null) {
            return
        }
        setIsLoading(true);
        setTimeout(() => {
            // toCanvas(ref.current, { includeQueryParams: true })
            // .then((canvas) => {
            //     document.getElementById('canvas-container')?.appendChild(canvas);
            // })
            toPng(ref.current, { includeQueryParams: true })
            .then((dataUrl) => {
                setIsLoading(false);
                download(dataUrl, `my-${props.moodName}-name.png`)
            })
            .catch((err) => {
                console.log(err)
            })
        }, 5000)

    
    }, [ref])
    return (
    <>
      <div ref={ref} className=" font-sans w-full bg-theme-grey pb-3 overflow-hidden bg-gradient-to-b from-theme-grey to-theme-green">
        <div className="">
            <div className="flex flex-wrap justify-between mx-8">
                <Emoji color={mood?.colors[0]} moodName={props.moodName} />
                <Emoji color={mood?.colors[0]} moodName={props.moodName} />
                <Emoji color={mood?.colors[0]} moodName={props.moodName} />
                <Emoji color={mood?.colors[0]} moodName={props.moodName} />
            </div>
            <div className="flex flex-wrap justify-between w-110 -ml-5p">
                <Emoji color={mood?.colors[0]} moodName={props.moodName} />
                <Emoji color={mood?.colors[0]} moodName={props.moodName} />
                <Emoji color={mood?.colors[0]} moodName={props.moodName} />
                <Emoji color={mood?.colors[0]} moodName={props.moodName} />
                <Emoji color={mood?.colors[0]} moodName={props.moodName} />
            </div>
            <div className="flex flex-wrap justify-between mx-8">
                <Emoji color={mood?.colors[0]} moodName={props.moodName} />
                <Emoji color={mood?.colors[0]} moodName={props.moodName} />
                <Emoji color={mood?.colors[0]} moodName={props.moodName} />
                <Emoji color={mood?.colors[0]} moodName={props.moodName} />
            </div>
            <div className="flex flex-wrap justify-between w-110 -ml-5p">
                <Emoji color={mood?.colors[0]} moodName={props.moodName} />
                <Emoji color={mood?.colors[0]} moodName={props.moodName} />
                <Emoji color={mood?.colors[0]} moodName={props.moodName} />
                <Emoji color={mood?.colors[0]} moodName={props.moodName} />
                <Emoji color={mood?.colors[0]} moodName={props.moodName} />
            </div>
            <div className="flex w-40 flex-wrap mx-auto -mt-52">
                {props.recommendedTracks.slice(0, 4).map((track, index) => {
                    return (
                        <div key={track.id} className="w-20">
                            <img src={track.album.images[0].url} alt="" />
                        </div>
                    )
                })}
            </div>
            <p className="text-center font-extrabold text-2xl mt-14">{title}</p>
            <p className="text-center mb-4 text-theme-text-grey">Personalized playlist based on your {props.moodName} mood</p>
            <div className="">
                {props.recommendedTracks.slice(0, 4).map((track, index) => {
                    return (
                        <div key={track.id} className={`flex justify-between items-center px-2 pt-2 ml-8`}>
                            <div className="flex items-center">
                                <div className="w-16 h-16">
                                    <img src={track.album.images[0].url} alt="" />
                                </div>
                                <div className="ml-2">
                                    <p className="text-black text-lg">{track.name}</p>
                                    <p className="text-theme-text-grey">{track.artists[0].name}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <p className="text-center mt-5 font-bold text-md">Scan me</p>
            <div className="w-20 h-20 mx-auto">
                <img src="/images/qr.png" alt="" />
            </div>
            <p className="text-center text-sm">moodify-songs.vercel.com</p>

        </div>
      </div>
      <button disabled={isLoading} onClick={onButtonClick}>{isLoading ? 'loading...' : 'download'}</button>
      <div id="canvas-container"></div>
    </> 
    );
}
