import { Fragment, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";

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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-sm bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-bold leading-6"
                >
                    About Me
                </Dialog.Title>
                <div className="mt-4">
                    <p>Hello</p>
                </div>
              </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
        </Transition>
        <div className="text-end mt-4 mr-2">
            <button className="underline" onClick={() => setIsOpen(true)}>Credit</button>
        </div>
      </>
    );
}
