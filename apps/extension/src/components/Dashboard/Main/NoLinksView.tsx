import React from 'react';
import { NoLinksIcon } from './NoLinksIcon';

export function NoLinksView() {
  return (
    <div className="flex flex-col flex-1 shrink-0 items-center pt-12">
      <NoLinksIcon className="h-[278px] w-[417px]" />
      <div className="flex flex-col w-[400px] max-w-full items-center">
        <h3 className="text-base leading-6 font-medium text-gray-900 mt-5 mb-3">
          There are no links yet!
        </h3>
        <p className="text-sm leading-5 font-normal text-gray-500 text-center">
          Start by saving your links to the collection, or invite your team
          members to contribute to the collection.
        </p>
      </div>
    </div>
  );
}
