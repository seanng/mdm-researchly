import React, { useEffect, useState } from 'react';
import {
  ControlledMenu,
  MenuItem,
  ControlledMenuProps,
  ClickEvent,
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import { useStore } from 'contexts/store';

interface ContextMenuProps extends ControlledMenuProps {
  onRenameClick: (e: ClickEvent) => void;
  onDeleteClick: (e: ClickEvent) => void;
  onLeaveClick: (e: ClickEvent) => void;
  collectionIdx: number;
  anchorPoint: {
    x: number;
    y: number;
  };
}

export function ContextMenu({
  onRenameClick,
  onDeleteClick,
  onLeaveClick,
  collectionIdx,
  ...props
}: ContextMenuProps) {
  const [role, setRole] = useState('MEMBER');
  const [hasMultipleParticipants, setHasMultipleParticipants] = useState(false);
  const { user, collections } = useStore();

  useEffect(() => {
    if (collectionIdx === -1 || !user) return;
    const collection = collections[collectionIdx];
    setHasMultipleParticipants(collection.participants.length > 1);
    setRole(collection.role);
  }, [collectionIdx]);

  return (
    <ControlledMenu {...props}>
      {role === 'ADMIN' && <MenuItem onClick={onRenameClick}>Rename</MenuItem>}
      {hasMultipleParticipants && (
        <MenuItem onClick={onLeaveClick}>Leave</MenuItem>
      )}
      {role === 'ADMIN' && <MenuItem onClick={onDeleteClick}>Delete</MenuItem>}
    </ControlledMenu>
  );
}
