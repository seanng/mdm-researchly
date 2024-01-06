import React, { MouseEventHandler, useEffect, useState } from 'react';
import { Input } from 'ui';
import { useStore } from 'contexts/store';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useContextMenu } from 'contexts/context-menu';
import { NavItem } from './NavItem';

const FORM_NAME = 'collectionName';

type FormValues = {
  collectionName: string;
};

interface Props {
  setShowNewCollectionInput: (b: boolean) => void;
  showNewCollectionInput: boolean;
}

export function Body({
  showNewCollectionInput,
  setShowNewCollectionInput,
}: Props) {
  const { selectCollection, collections, createCollection } = useStore();
  const { handleSubmit, register, setFocus, resetField } =
    useForm<FormValues>();
  const { toggleMenu, setAnchorPoint, setCollectionIdx } = useContextMenu();

  useEffect(() => {
    if (showNewCollectionInput) {
      setFocus(FORM_NAME);
      return;
    }
    resetField(FORM_NAME);
  }, [showNewCollectionInput]);

  const onSubmit: SubmitHandler<FormValues> = (input: {
    collectionName: string;
  }): void => {
    createCollection(input.collectionName);
    setShowNewCollectionInput(false);
  };

  const handleItemRightClick =
    (i: number): MouseEventHandler<HTMLAnchorElement | SVGSVGElement> =>
    (e) => {
      e.preventDefault(); // prevents default popup rightclick action
      e.stopPropagation(); // ensures 3-dot onclick does not select item
      setAnchorPoint({ x: e.clientX, y: e.clientY });
      setCollectionIdx(i);
      toggleMenu(true);
    };

  return (
    <div
      className="px-2 flex-1 border-t border-gray-100 overflow-y-auto max-h-[436px]"
      id="sidebar-body"
    >
      <div className="py-2 text-sm leading-5 font-normal text-gray-400">
        Collections
      </div>
      <nav className="flex-1 space-y-1">
        {collections.map((item, i) => (
          <NavItem
            key={item.id}
            idx={i}
            onClick={(e) => {
              selectCollection(i);
            }}
            onRightClick={handleItemRightClick(i)}
            collection={item}
          />
        ))}
        {showNewCollectionInput && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              name="collectionName"
              inputProps={{
                onKeyDown: (e) => {
                  if (e.key === 'Escape') {
                    setShowNewCollectionInput(false);
                  }
                },
                ...register(FORM_NAME, {
                  onBlur: (e) => {
                    setShowNewCollectionInput(false);
                  },
                }),
              }}
            />
          </form>
        )}
      </nav>
    </div>
  );
}
