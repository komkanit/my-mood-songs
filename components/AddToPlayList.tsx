import { Fragment, useRef, useState } from "react";
import { spotifyClient, SpotifyTrack } from "../lib/spotifyClient";
import Link from "next/link";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';

export default function AddToPlayList(props: {moodName: string, tracks: SpotifyTrack[], userId: string}) {
    const [playListName, setPlayListName] = useState(`My ${props.moodName} Beats`);
    const [spotifyPlaylist, setSpotifyPlaylist] = useState(null);
    const [createPlaylistStatus, setCreatePlaylistStatus] = useState<'idle' | 'creating' | 'created'>('idle'); // idle, creating, created
    const [isOpen, setIsOpen] = useState(false);
    const [isPublic, setIsPublic] = useState(true);
    const inputRef = useRef(null) as any;
    const description =  `Personalized playlist based on your ${props.moodName} mood. Check https://moodify-songs.vercel.app for more.`;

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
      }, 600);
    }

    const onModalOpen = () => {
      setIsOpen(true);
      setTimeout(() => {
        inputRef.current.focus();
      }, 200)
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
      return 'Create Playlist';
    }
  
    return (
      <>
        <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" open={isOpen} onClose={onModalClose}>
          <div className="fixed inset-0 bg-black bg-opacity-25" />
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-sm bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-bold leading-6 text-gray-900"
                >
                  Save to Spotify playlist
                </Dialog.Title>
                <div className="mt-4">
                  <input disabled={createPlaylistStatus === 'creating'} ref={inputRef} className="rounded-md px-2 py-1 border-solid border outline-none w-full" value={playListName} onChange={e => setPlayListName(e.target.value)} />
                  <div className="mt-2 flex items-center">
                    <Checkbox.Root
                      className="flex mr-1 h-4 w-4 items-center justify-center rounded-[4px] bg-white border"
                      id="c1"
                      checked={!isPublic}
                      onCheckedChange={(checked) => setIsPublic(!checked)}
                    >
                      <Checkbox.Indicator className="text-black">
                        <CheckIcon />
                      </Checkbox.Indicator>
                    </Checkbox.Root>
                    <label htmlFor="c1">
                      Private
                    </label>
                  </div>
                </div>

                <div className="mt-2 text-end">
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
              </Transition.Child>
            </div>
          </div>
        </Dialog>
        </Transition>
            <div>
              {
                spotifyPlaylist ?
                (<Link href={spotifyPlaylist} target="_blank" className="inline-block">
                  <button className="text-white hover:bg-gray-800 bg-black px-5 py-1 rounded-full border-">
                    <Image className="inline-block mr-2" src="/images/spotify-icon.png" width="20" height="20" alt="" />
                    Listen in Spotify
                  </button>
                </Link>)
                :
                <button onClick={onModalOpen} className="text-white hover:bg-gray-800 bg-black px-5 py-1 rounded-full border-">
                  <Image className="inline-block mr-2" src="/images/spotify-icon.png" width="20" height="20" alt="" />
                    Listen in Spotify
                </button>
              }
            </div>
      </>
    );
}
