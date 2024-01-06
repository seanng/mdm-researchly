import { useStore } from 'contexts/store';
import React, { SyntheticEvent } from 'react';
import { Collection } from 'utils/types';
import { LinkItem } from './LinkItem';

export function Body({ collection }: { collection: Collection }) {
  const { user, deleteLink, updateLink } = useStore();

  const goTo = (url: string) => (e: SyntheticEvent) => {
    e.preventDefault();
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener(null);
  };

  const handleEditClick = (idx: number) => (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleCheckClick = (linkIdx: number) => {
    if (!user?.id) return;

    const { readerInfo } = collection.links[linkIdx];
    updateLink(linkIdx, {
      readerInfo: {
        ...readerInfo,
        [user.id]: {
          ...(readerInfo[user.id] ?? {}),
          hasReadIt: !readerInfo[user.id]?.hasReadIt,
        },
      },
    });
  };

  const handleDeleteClick = (idx: number) => (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    deleteLink(idx);
  };

  return (
    <div className="flex flex-col flex-1 max-h-[538px] overflow-y-auto space-y-3 p-2 pr-3">
      {collection.links.map((link, i) => (
        <a href="#" onClick={goTo(link.url)} key={link.id}>
          <LinkItem
            userId={user?.id}
            link={link}
            idx={i}
            onEditClick={handleEditClick}
            onCheckClick={handleCheckClick}
            onDeleteClick={handleDeleteClick}
            participants={collection.participants}
          />
        </a>
      ))}
    </div>
  );
}
