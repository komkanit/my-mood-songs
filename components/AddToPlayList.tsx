import { useRef, useState } from "react";
import { spotifyClient, SpotifyTrack } from "../lib/spotifyClient";
import Link from "next/link";
import Image from "next/image";
import { Dialog } from "@headlessui/react";

export default function AddToPlayList(props: {moodName: string, tracks: SpotifyTrack[], userId: string}) {
    const [playListName, setPlayListName] = useState(`My ${props.moodName} mood`);
    const [spotifyPlaylist, setSpotifyPlaylist] = useState(null);
    const [createPlaylistStatus, setCreatePlaylistStatus] = useState<'idle' | 'creating' | 'created'>('idle'); // idle, creating, created
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef(null) as any;
    const description = '';
    const isPublic = false;

    const createPlayList = async () => {
      setCreatePlaylistStatus('creating');
      const createPlaylistResponse = await spotifyClient.createPlaylist(props.userId, playListName, description, isPublic);
      const addItemToPlaylistResponse = await spotifyClient.addItemsToPlaylist(createPlaylistResponse.id, props.tracks.map((track) => track.uri));
      // createPlaylistResponse.external_urls.spotify
      setSpotifyPlaylist(createPlaylistResponse.external_urls.spotify);
      setCreatePlaylistStatus('created');
      setTimeout(() => {
        window.open(createPlaylistResponse.external_urls.spotify, '_blank');
        setIsOpen(false);
      }, 500);
    }

    const onModalOpen = () => {
      setIsOpen(true);
      setTimeout(() => {
        inputRef.current.focus();
      })
    }
    const onModalClose = () => {
      setIsOpen(false);
    }
    const onSubmit = () => {
      createPlayList();
    }
    const getSubmitButtonText = () => {
      if (createPlaylistStatus === 'creating') {
        return 'Creating...'
      }
      if (createPlaylistStatus === 'created') {
        return 'Created!'
      }
      return 'Submit';
    }
  
    return (
      <>
      <Dialog as="div" className="relative z-10" open={isOpen} onClose={onModalClose}>
        <div className="fixed inset-0 bg-black bg-opacity-25" />
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-sm bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Save to Spotify playlist
              </Dialog.Title>
              <div className="mt-2">
                <input disabled={createPlaylistStatus === 'creating'} ref={inputRef} className="border-2 rounded-md px-2 border-solid border-theme-grey outline-none w-full" value={playListName} onChange={e => setPlayListName(e.target.value)} />
              </div>

              <div className="mt-4 text-end">
                <button
                  disabled={createPlaylistStatus === 'creating'}
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  onClick={onSubmit}
                >
                {getSubmitButtonText()}
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
        <div className="text-end mt-4 mr-2">
            <div className="flex justify-end">
              <button onClick={onModalOpen} className="text-white bg-black px-5 py-1 rounded-full border-">
                <Image className="inline-block mr-2" src="/images/spotify-icon.png" width="20" height="20" alt="" />
                save to playlist
              </button>
            </div>
          {
            spotifyPlaylist &&
              <Link href={spotifyPlaylist} target="_blank" className="inline-block mt-1 mr-2">open playlist</Link>
          }
        </div>
      </>
    );
}
