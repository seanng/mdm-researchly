import React from 'react';
import { Transition } from '@headlessui/react';
import { useStore } from 'contexts/store';

export function SpinningOverlay() {
  const { isLoading } = useStore();
  return (
    <Transition
      show={isLoading}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed top-0 right-0 left-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12" />
      </div>
    </Transition>
  );
}
