import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import ShareItem from "./ShareItem";
import { SpotifyTrack } from "../lib/spotifyClient";

export default function Share(props: {moodName: string, recommendedTracks: SpotifyTrack[]}) {
    const [isOpen, setIsOpen] = useState(false);
    // 'idle'| 'downloading' | 'ready'
    const [status, setStatus] = useState<string>('idle');
    const [previewText, setPreviewText] = useState<boolean>(false);
    useEffect(() => {
        if (status === 'ready') {
            setPreviewText(true);
            setTimeout(() => {
                setPreviewText(false);
            }, 3000);
        }
    }, [status]);
    const onSetStatus = (newStatus: string) => {
        setStatus(newStatus);
    }
    const onClose = () => {
        setIsOpen(false)
        setStatus('idle');
        setPreviewText(false);
    }
    return (
      <>
        <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" open={isOpen} onClose={onClose}>
          {
            status === 'downloading' ? (
                <div className="fixed inset-0 bg-white bg-opacity-50 z-10">
                        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="flex bg-black py-2 px-4 rounded-xl items-center">
                                <svg fill="#FDBC3B" className="mr-2" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/><path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"><animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite"/></path></svg>
                                <p className="text-2xl text-theme-yellow">Processing...</p>
                            </div>
                        </div>
                </div>
            )
            :
          <div className="fixed inset-0 bg-black bg-opacity-25" />
          }
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
                    <button className="fixed right-4 top-3 bg-black text-theme-orange rounded-full py-1 px-3" onClick={onClose}>X</button>
                        <ShareItem {...props} status={status} onSetStatus={onSetStatus} />
                    {
                        status === 'ready' && previewText &&
                        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="flex w-max bg-black py-2 px-4 rounded-xl items-center">
                                <Image className="mr-2 animate-bounce inline-block" src="/images/download.png" width="15" height="15" alt="" />
                                <p className="text-xl text-theme-yellow">Hold an image to save</p>
                            </div>
                        </div>
                    }
                </div>
              </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
        </Transition>
        <div>
            <button className="bg-black pt-2 pb-1 px-6 flex rounded-full hover:bg-gray-800" onClick={() => setIsOpen(true)}>
                <Image className="mr-1" src="/images/lucide_share.png" alt="" width="20" height="20" />
                <span className="text-theme-yellow">Share</span>
            </button>
        </div>
      </>
    );
}
