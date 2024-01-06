import React from 'react';
import { PlusIcon } from '@heroicons/react/solid';
import { useStore } from 'contexts/store';

export function NoCollectionSelected() {
  const { collections } = useStore();
  const hasCollections = collections.length > 0;

  return (
    <div className="flex flex-col w-full h-full pb-8 justify-center items-center">
      <svg
        className="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
        />
      </svg>
      <h3 className="mt-2 text-sm font-medium text-gray-900">
        {hasCollections
          ? 'No collection selected'
          : 'Get started by creating a new collection'}
      </h3>
    </div>
  );
}
