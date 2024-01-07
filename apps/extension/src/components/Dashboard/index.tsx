import React from 'react';
import Split from 'react-split';
import { Main } from './Main';
import { Sidebar } from './Sidebar';
import { SpinningOverlay } from './SpinningOverlay';
import { StoreProvider } from 'contexts/store';
import { ConnectionProvider } from 'contexts/connection';
import { ContextMenuProvider } from 'contexts/context-menu';
import { ModalProvider } from 'contexts/modal';
import { useConfigureUI } from 'hooks/useConfigureUI';
import { useMessageListener } from 'hooks/useMessageListener';
import { NotConnected } from './NotConnected';

/**
 * The ConnectionProvider stores the connection port to the background script.
 * The StoreProvider stores the application's various states.
 * The ModalProvider handles the state and messages of the modal, which opens when the user clicks on various action buttons.
 * The ContextMenuProvider handles actions of the context menu, which opens when the user right clicks anywhere on the popup.
 * The Application function contains the Dashboard popup's UI.
 */
export function Dashboard() {
  return (
    <ConnectionProvider>
      <StoreProvider>
        <ModalProvider>
          <ContextMenuProvider>
            <Application />
          </ContextMenuProvider>
        </ModalProvider>
      </StoreProvider>
    </ConnectionProvider>
  );
}

/**
 * This is the main component for the popup.
 * The Split component, imported from 'react-split', enables the user to resize the sidebar and main content.
 */
function Application() {
  // Set up basic dimensions of the popup's body element and disable the escape key
  useConfigureUI();
  const { isSocketConnected } = useMessageListener();

  // Render an error UI if the socket is not connected
  if (!isSocketConnected) {
    return <NotConnected />;
  }

  return (
    <>
      <Split
        className="flex h-full max-w-full bg-gray-100"
        sizes={[35, 65]}
        minSize={[180, 360]}
        snapOffset={0}
        gutterSize={5}
      >
        <Sidebar />
        <Main />
      </Split>
      <SpinningOverlay />
    </>
  );
}
