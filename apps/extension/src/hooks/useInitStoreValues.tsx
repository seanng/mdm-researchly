import { useEffect } from 'react';
import { Store } from 'utils/types';

export function useInitStoreValues(cb: (s: Store) => void) {
  useEffect(() => {
    chrome.storage.local.get(['collections', 'user', 'activeIdx'], cb);
  }, []);
}
