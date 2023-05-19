import Image from "next/image";
import Link from "next/link";
import { Menu, Transition } from '@headlessui/react'
import { useRef, useState, Fragment } from "react";
import { SpotifyTrack } from "../lib/spotifyClient";
import { useClickOutside } from "../lib/hook/useClickOutside";

export default function Track(props: {track: SpotifyTrack, onClick: (track: SpotifyTrack) => void}) {
    const audioRef = useRef(null) as any;

    return (
      <div>
        <audio ref={audioRef} src={props.track.preview_url} playsInline />
        <div className="flex">
            <Image
                className="mr-3 cursor-pointer"
                onClick={() => props.onClick(props.track)}
                height={130}
                width={130}
                src={props.track.album.images[0].url}
                alt={props.track.album.name}
            />
            <div className="flex-1">
                <p className="pt-3 text-lg">{props.track.name}</p>      
                <p className="pt-2 text-theme-text-grey">{props.track.artists.map((a) => a.name).join(', ')}</p>
            </div>
            <div className="mt-5 relative">
                <Menu>
                    <Menu.Button className="text-2xl cursor-pointer">...</Menu.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 w-40 p-2 bg-black">
                            <Menu.Item>
                                <span className="flex items-center text-white">
                                    <Image className="inline-block mr-3" src="/images/spotify-icon.png" height={20} width={20} alt="open in spority" />
                                    <Link target="_blank" href={props.track.external_urls.spotify}>Open in Spotify</Link>
                                </span>
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </div>
      </div>
    );
}
