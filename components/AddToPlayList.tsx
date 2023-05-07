import { useRef, useState } from "react";
import { spotifyClient, SpotifyTrack } from "../lib/spotifyClient";

export default function AddToPlayList(props: {moodName: string, tracks: SpotifyTrack[], userId: string}) {
    const [playListName, setPlayListName] = useState(`My ${props.moodName} mood`);
    const [isCreating, setIsCreating] = useState(false);
    const inputRef = useRef(null) as any;
    const description = '';
    const isPublic = false;

    const createPlayList = async () => {
        const createPlaylistResponse = await spotifyClient.createPlaylist(props.userId, playListName, description, isPublic);
        const addItemToPlaylistResponse = await spotifyClient.addItemsToPlaylist(createPlaylistResponse.id, props.tracks.map((track) => track.uri));
        // createPlaylistResponse.external_urls.spotify
    }
    const onClickCreateing = () => {
      setIsCreating(true)
      setTimeout(() => {
        inputRef.current.focus();
      })
    }
  
    return (
        <div className="flex justify-end mt-4 mr-2">
          {
            isCreating ?
            <>
              <input ref={inputRef} className="border-l-2 border-t-2 px-2 border-b-2 border-solid border-black" value={playListName} onChange={e => setPlayListName(e.target.value)} />
              <button className="text-white bg-black px-5 py-1 rounded-r-full border-" onClick={createPlayList}>create</button>
            </>
            :
            <button onClick={onClickCreateing} className="text-white bg-black px-5 py-1 rounded-full border-">create playlist</button>
          }
        </div>
    );
}
