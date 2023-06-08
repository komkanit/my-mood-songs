import { Fragment, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { FacebookIcon, TwitterIcon } from 'react-share';

export default function SupportUs() {
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-sm bg-white pb-6 text-left align-middle shadow-xl transition-all">
                <div className="h-20 w-full bg-theme-bg-blue"></div>
                <div className="-mt-14">
                    <div className="text-center">
                        <div className="flex justify-center">
                            <Image src="/images/profile.jpeg" alt="" width="100" height="100" className="rounded-full" />
                        </div>
                        <p className="my-2">Hello</p>
                        <Link className="inline-block" href="https://bmc.link/komkanit" target="_blank">
                            <button className="flex items-center rounded-lg pr-2 py-1 hover:shadow-md bg-buy-me-coffee text-black">
                                <Image src="/images/bymecoffee.png" alt="" width="35" height="35" />
                                Buy me a coffee
                            </button>
                        </Link>
                        <p className="mt-2">Follow me on</p>
                        <Link className="inline-block" href="https://facebook.com/komcal" target="_blank">
                            <FacebookIcon className="inline-block mr-2 w-6 h-6" round />
                        </Link>
                        <Link className="inline-block" href="https://twitter.com/komkanit" target="_blank">
                            <TwitterIcon className="inline-block w-6 h-6" round />
                        </Link>
                    </div>
                </div>
              </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
        </Transition>
        <div>
            <button className="mr-2 bg-black p-2 rounded-full hover:bg-gray-800" onClick={() => setIsOpen(true)}>
                <Image src="/images/clapping-hands.png" alt="" width="20" height="20" />
            </button>
        </div>
      </>
    );
}
