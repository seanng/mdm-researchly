import React, { SyntheticEvent } from 'react';
import { Link, Participant, ReaderInfoValue } from 'utils/types';
import {
  LinkIcon,
  CheckCircleIcon,
  ReplyIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/solid';
import { debounce } from 'utils/helpers';

interface ReadStatusProps {
  readers: ReaderInfoValue[];
  participants: Participant[];
  isReadByUser: boolean;
}

interface LinkItemProps {
  userId?: string;
  link: Link;
  idx: number;
  participants: Participant[];
  onEditClick: (idx: number) => (e: SyntheticEvent) => void;
  onCheckClick: (idx: number) => void;
  onDeleteClick: (idx: number) => (e: SyntheticEvent) => void;
}

function ReadStatus({ readers, participants, isReadByUser }: ReadStatusProps) {
  const readerCount = readers.reduce((prev, curr) => {
    return curr.hasReadIt ? prev + 1 : prev;
  }, 0);
  const isReadByAll = readerCount === participants.length;

  if (isReadByAll) {
    return (
      <>
        <span>{`Read${participants.length === 1 ? '' : ' by all'}`}</span>
        <CheckCircleIcon className="h-3 w-auto text-green-500 " />
      </>
    );
  }

  return isReadByUser ? (
    <span>{`Read by ${readerCount}`}</span>
  ) : (
    <span className="text-blue-700">Unread</span>
  );
}

export function LinkItem({
  link,
  idx,
  onEditClick,
  userId,
  onCheckClick,
  onDeleteClick,
  participants,
}: LinkItemProps) {
  const isReadByUser = link.readerInfo[userId ?? '']?.hasReadIt;
  const readers = Object.values(link.readerInfo);

  const debouncedCheckClick = debounce(() => onCheckClick(idx), 500);

  const handleCheckClick = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    debouncedCheckClick();
  };

  return (
    <div className="group bg-white rounded-md hover:outline outline-2 outline-gray-300">
      <div className="flex p-4 relative">
        {link.faviconUrl ? (
          <img className="h-5 w-auto pr-3" src={link.faviconUrl} />
        ) : (
          // Fallback Favicon
          <LinkIcon className="h-4 w-auto pr-3" />
        )}
        <div className="flex flex-col justify-center space-y-1">
          <h4 className="text-gray-900 text-sm leading-5 font-medium">
            {link.title}
          </h4>
          <div className="flex space-x-1 text-xs leading-4 font-normal text-gray-500 items-center">
            <span>{new URL(link.url).hostname.replace('www.', '')}</span>
            <span>•</span>
            <span>Added today</span>
            <span>•</span>
            <ReadStatus
              participants={participants}
              readers={readers}
              isReadByUser={isReadByUser}
            />
          </div>
        </div>
        {/* Action Buttons */}
        <div className="hidden absolute group-hover:flex right-3 bottom-3 space-x-2">
          <button
            className="border-gray-300 rounded-full border p-1"
            onClick={handleCheckClick}
          >
            {isReadByUser ? (
              <ReplyIcon className="h-4 w-auto text-yellow-500 " />
            ) : (
              <CheckCircleIcon className="h-4 w-auto text-green-500 " />
            )}
          </button>
          {/* <button
                  className="border-gray-300 rounded-full border p-1"
                  onClick={onEditClick(idx)}
                >
                  <PencilIcon className="h-4 w-auto text-gray-700 " />
                </button> */}
          <button
            type="button"
            className="border-gray-300 rounded-full border p-1"
            onClick={onDeleteClick(idx)}
          >
            <TrashIcon className="h-4 w-auto text-red-500 " />
          </button>
        </div>
      </div>
      {/* TODO: add user progresses */}
      {isReadByUser && (
        <div className="p-4 flex border-t border-gray-100 text-xs">
          <div className="flex-none pr-4 text-gray-900">Progress</div>
          <div className="inline-flex flex-1">
            {participants.map((p) => (
              <div className="flex mr-4" key={p.id}>
                <span className="text-gray-700 mr-1">{p.email}</span>
                {link.readerInfo[p.id]?.hasReadIt ? (
                  <CheckCircleIcon className="h-4 w-auto text-green-500 " />
                ) : (
                  <span className="text-gray-700">0%</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
