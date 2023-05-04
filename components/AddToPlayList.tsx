import { useRef, useState } from "react";
import { spotifyClient, SpotifyTrack } from "../lib/spotifyClient";
import { useClickOutside } from "../lib/hook/useClickOutside";

export default function AddToPlayList(props: {moodName: string, tracks: SpotifyTrack[], userId: string}) {
    const [playListName, setPlayListName] = useState(`My ${props.moodName} mood`);
    const [openModal, setOpenModal] = useState(false);
    const modalRef = useRef(null);
    useClickOutside(modalRef, () => setOpenModal(false));
    const description = '';
    const isPublic = false;
    const createPlayList = async () => {
        const createPlaylistResponse = await spotifyClient.createPlaylist(props.userId, playListName, description, isPublic);
        const addItemToPlaylistResponse = await spotifyClient.addItemsToPlaylist(createPlaylistResponse.id, props.tracks.map((track) => track.uri));
        // createPlaylistResponse.external_urls.spotify
    }
  
    return (
      <div>
        {
            openModal && (
            <div ref={modalRef} style={{background: 'red', padding: '20px'}}>
                <input value={playListName} onChange={e => setPlayListName(e.target.value)} />
                <button onClick={createPlayList}>create playlist</button>
            </div>
            )
        }
        <button onClick={() => setOpenModal(true)}>Add to playlist</button>
      </div>
    );
}
