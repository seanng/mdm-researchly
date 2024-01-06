import React, { createContext, useContext, useState, FC } from 'react';
import { ClickEvent, useMenuState } from '@szhsin/react-menu';
import { ContextMenu } from 'components/Dashboard/ContextMenu';
import { useModal } from 'contexts/modal';
import { useStore } from './store';

interface AnchorPoint {
  x: number;
  y: number;
}

interface ContextState {
  toggleMenu: (n: boolean) => void;
  setAnchorPoint: (x: AnchorPoint) => void;
  setCollectionIdx: (i: number) => void;
  collectionIdx: number;
  isRenaming: boolean;
  setIsRenaming: (a: boolean) => void;
}

const ContextMenuContext = createContext({} as ContextState);

export const ContextMenuProvider: FC = ({ children }) => {
  const { toggleMenu, ...menuProps } = useMenuState();
  const [anchorPoint, setAnchorPoint] = useState<AnchorPoint>({ x: 0, y: 0 });
  const [collectionIdx, setCollectionIdx] = useState(-1);
  const [isRenaming, setIsRenaming] = useState(false);
  const { setOnModalConfirm, setOpen } = useModal();
  const { deleteCollection, collections, removeCollectionUser } = useStore();

  const handleDeleteClick = (event: ClickEvent) => {
    setOnModalConfirm(() => () => deleteCollection(collectionIdx));
    setOpen(true);
  };

  const handleRenameClick = (event: ClickEvent) => {
    setIsRenaming(true);
  };

  const handleLeaveClick = () => {
    const collection = collections[collectionIdx];
    removeCollectionUser(collection.id);
  };

  return (
    <ContextMenuContext.Provider
      value={{
        toggleMenu,
        setCollectionIdx,
        setAnchorPoint,
        collectionIdx,
        isRenaming,
        setIsRenaming,
      }}
    >
      {children}
      {/* TODO: this should be a proxy (changeable). */}
      <ContextMenu
        {...menuProps}
        collectionIdx={collectionIdx}
        anchorPoint={anchorPoint}
        onClose={() => toggleMenu(false)}
        onDeleteClick={handleDeleteClick}
        onRenameClick={handleRenameClick}
        onLeaveClick={handleLeaveClick}
      />
    </ContextMenuContext.Provider>
  );
};

export const useContextMenu = () => useContext(ContextMenuContext);
