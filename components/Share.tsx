import { Fragment, useState } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import ShareItem from "./ShareItem";
import { SpotifyTrack } from "../lib/spotifyClient";

export default function Share(props: {moodName: string, recommendedTracks: SpotifyTrack[]}) {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" open={isOpen} onClose={() => setIsOpen(false)}>
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-sm bg-white text-left align-middle shadow-xl transition-all">
                <div>
                    <ShareItem {...props} />
                </div>
              </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
        </Transition>
        <div>
            <button className="bg-black p-2 rounded-full hover:bg-gray-800" onClick={() => setIsOpen(true)}>
                <Image src="/images/lucide_share.png" alt="" width="20" height="20" />
            </button>
        </div>
      </>
    );
}
