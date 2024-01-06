import React from 'react';
import { Logo, SecondaryButtonSmall } from 'ui';
import { PlusIcon } from '@heroicons/react/solid';

interface Props {
  onNewCollectionClick: () => void;
}

export function Header({ onNewCollectionClick }: Props) {
  return (
    <div className="flex justify-between px-2 pb-5">
      <Logo className="h-8 w-auto" />
      <SecondaryButtonSmall onClick={onNewCollectionClick}>
        <PlusIcon className="-ml-0.5 mr-0.5 h-4 w-4" aria-hidden="true" />
        New
      </SecondaryButtonSmall>
    </div>
  );
}
