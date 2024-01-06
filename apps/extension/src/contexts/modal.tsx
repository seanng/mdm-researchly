import React, { createContext, useContext, useState, FC } from 'react';
import { Modal } from 'components/Dashboard/Modal';

interface ContextState {
  setOpen: (b: boolean) => void;
  setModalHeading: (n: string) => void;
  setModalActionText: (n: string) => void;
  setModalBody: (n: string) => void;
  setOnModalConfirm: (cb: () => () => void) => void;
}

const ModalContext = createContext({} as ContextState);

const INITIAL_HEADING = 'Are you sure?';
const INITIAL_ACTION_TEXT = 'Remove';
const INITIAL_BODY =
  'Are you sure you want to delete this collection? Once deleted, this collection will no longer be available for all members. All links within this collection will also be removed.';

export const ModalProvider: FC = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [modalActionText, setModalActionText] = useState(INITIAL_ACTION_TEXT);
  const [modalHeading, setModalHeading] = useState(INITIAL_HEADING);
  const [modalBody, setModalBody] = useState(INITIAL_BODY);
  const [onModalConfirm, setOnModalConfirm] = useState<() => () => void>(
    () => () => {}
  );

  const handleConfirm = () => {
    onModalConfirm();
    setOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        setOpen,
        setModalActionText,
        setModalHeading,
        setModalBody,
        setOnModalConfirm,
      }}
    >
      {children}
      <Modal
        {...{
          modalBody,
          modalHeading,
          modalActionText,
          setOpen,
          open,
          onConfirm: handleConfirm,
        }}
      />
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
