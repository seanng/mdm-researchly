import React from 'react';
import { useStore } from 'contexts/store';
import { Header } from './Header';
import { NoLinksView } from './NoLinksView';
import { Body } from './Body';
import { NoCollectionSelected } from './NoCollectionSelected';

export function Main() {
  // TODO: add empty state (if no collection is selected/available in sidebar)
  const { collections, activeIdx } = useStore();
  const collection = collections[activeIdx];
  return (
    <div className="max-w-full">
      {!collection ? (
        <NoCollectionSelected />
      ) : (
        <>
          <Header collection={collection} />
          {collection.links.length === 0 ? (
            <NoLinksView />
          ) : (
            <Body collection={collection} />
          )}
        </>
      )}
    </div>
  );
}
