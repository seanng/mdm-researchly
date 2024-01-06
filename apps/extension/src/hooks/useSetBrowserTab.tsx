import { useEffect } from 'react';

export function useSetBrowserTab(cb: (result: chrome.tabs.Tab[]) => void) {
  useEffect(() => {
    chrome.tabs.query(
      {
        active: true,
        lastFocusedWindow: true,
      },
      cb
    );
  }, []);
}
