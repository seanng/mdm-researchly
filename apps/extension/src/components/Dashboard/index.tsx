import React, { useEffect, useState } from 'react';
import Split from 'react-split';
import { Main } from './Main';
import { Sidebar } from './Sidebar';
import { SpinningOverlay } from './SpinningOverlay';
import { StoreProvider, useStore } from 'contexts/store';
import { ConnectionProvider } from 'contexts/connection';
import { ContextMenuProvider } from 'contexts/context-menu';
import { ModalProvider } from 'contexts/modal';
import { useConfigureUI } from 'hooks/useConfigureUI';
import { useMessageListener } from 'hooks/useMessageListener';
import { NotConnected } from './NotConnected';

function Application() {
  useConfigureUI();
  const { isSocketConnected } = useMessageListener();

  if (!isSocketConnected) {
    return <NotConnected />;
  }

  return (
    <>
      <Split
        className="flex h-full max-w-full bg-gray-100"
        // TODO: reconfigure after logo change.
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
