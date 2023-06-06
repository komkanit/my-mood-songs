import { useCallback, useRef } from "react";
import { toPng, getFontEmbedCSS } from 'html-to-image';
import download from 'downloadjs';
import { SpotifyTrack } from "../lib/spotifyClient";

export default function ShareItem (props: {moodName: string, recommendedTracks: SpotifyTrack[]}) {
    const ref = useRef(null);
      
    const onButtonClick = useCallback(async () => {
        if (ref.current === null) {
        return
        }
        const fontEmbedCss = await getFontEmbedCSS(ref.current);

    
        toPng(ref.current, { cacheBust: true, fontEmbedCSS: fontEmbedCss })
        .then((dataUrl) => {
            download(dataUrl, `my-${props.moodName}-name.png`)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [ref])
    return (
    <>
      <div ref={ref} className="bg-black w-full">
        <img src="/images/test_image.png" alt="" />
        {props.recommendedTracks.slice(0, 4).map((track, index) => {
            return (
                <div key={track.id} className="flex justify-between items-center">
                    <div className="flex">
                        <div className="w-16 h-16">
                            <img src={track.album.images[0].url} alt="" />
                        </div>
                        <div className="ml-2">
                            <p className="text-white">{track.name}</p>
                            <p className="text-gray-400">{track.artists[0].name}</p>
                        </div>
                    </div>
                </div>
            )
        })}
      </div>
      <button onClick={onButtonClick}>download</button>
    </> 
    );
}
