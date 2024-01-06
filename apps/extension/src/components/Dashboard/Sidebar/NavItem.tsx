import {
  DotsHorizontalIcon,
  LinkIcon,
  UserCircleIcon,
} from '@heroicons/react/solid';
import { useContextMenu } from 'contexts/context-menu';
import { useStore } from 'contexts/store';
import React, { MouseEventHandler, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from 'ui';
import { classNames } from 'utils/helpers';
import { Collection } from 'utils/types';

interface Props {
  collection: Collection;
  onRightClick: MouseEventHandler<HTMLAnchorElement | SVGSVGElement>;
  onClick: MouseEventHandler<HTMLAnchorElement | SVGSVGElement>;
  idx: number;
}

export function NavItem({ collection, onClick, onRightClick, idx }: Props) {
  const { activeIdx, updateCollection } = useStore();
  const [showForm, setShowForm] = useState(false);
  const {
    collectionIdx: idxToUpdate,
    isRenaming,
    setIsRenaming,
  } = useContextMenu();
  const inputName = 'collectionName';
  const { handleSubmit, register, setFocus, reset, setValue } = useForm({
    defaultValues: {
      [inputName]: collection.name,
    },
  });

  function closeForm() {
    setIsRenaming(false);
    setShowForm(false);
  }

  useEffect(() => {
    if (isRenaming && idxToUpdate === idx) setShowForm(true);
  }, [isRenaming]);

  useEffect(() => {
    if (showForm) {
      setFocus(inputName);
      return;
    }
    reset();
  }, [showForm]);

  const onSubmit = (input: { collectionName: string }): void => {
    if (input.collectionName === collection.name) return;
    reset({ collectionName: input.collectionName });
    closeForm();
    updateCollection(idx, { name: input.collectionName });
  };

  return showForm ? (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        name={inputName}
        inputProps={{
          onKeyDown: (e) => {
            if (e.key === 'Escape') {
              closeForm();
            }
          },
          ...register(inputName, {
            onBlur: closeForm,
          }),
        }}
      />
    </form>
  ) : (
    <a
      onClick={onClick}
      href="#"
      onContextMenu={onRightClick}
      className={classNames(
        activeIdx === idx
          ? 'bg-gray-100 text-gray-900'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
        'group flex items-center px-2 py-2 text-sm font-medium leading-5 rounded-md justify-between'
      )}
    >
      <div className="truncate">{collection.name}</div>
      <div
        className={classNames(
          activeIdx === idx ? 'flex' : 'hidden group-hover:flex',
          'ml-2 font-normal text-gray-400 text-xs items-center'
        )}
      >
        <div>{collection.participants.length}</div>
        <UserCircleIcon className="w-3 h-3 ml-0.5 mr-1" />
        <div>{collection.links.length}</div>
        <LinkIcon className="w-3 h-3 ml-0.5 mr-2" />
        <DotsHorizontalIcon
          onClick={onRightClick}
          className="text-gray-900 w-5 h-5 p-1 rounded-full hover:bg-gray-200"
        />
      </div>
    </a>
  );
}
