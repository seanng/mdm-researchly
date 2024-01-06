import { request } from 'lib/request';
import { MeResponsePayload, Store } from './types';

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export async function getStorageItems() {
  const items = await chrome.storage.local.get(null);
  return items;
}

export function getPageDescription(
  browserTab: chrome.tabs.Tab | null
): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!browserTab || !browserTab.id) {
      reject('Browser Tab ID not found');
      return;
    }
    chrome.tabs.sendMessage(
      browserTab.id,
      { message: 'PAGE_DESCRIPTION' },
      (description: string) => {
        resolve(description ?? '');
      }
    );
  });
}

export async function signout() {
  chrome.runtime.sendMessage({ message: 'SIGNOUT' }, () => {
    window.location.href = 'popup_unauth.html';
  });
}

export function updateCache(store: Store): Promise<void> {
  return chrome.storage.local.set({
    ...store,
    cacheTime: Date.now(),
  });
}

function transformMe(json: MeResponsePayload) {
  return {
    user: {
      id: json.id,
      email: json.email,
    },
    collections: json.collections.map((c) => {
      const { users, ...rest } = c.collection;
      return {
        role: c.role,
        participants: users.map((u) => ({
          id: u.user.id,
          role: u.role,
          email: u.user.email,
        })),
        ...rest,
      };
    }),
  };
}

export async function fetchMyData(): Promise<Store> {
  const json = (await request('/users/me')) as MeResponsePayload;
  return transformMe(json);
}

export const debounce = (func: (...a: any[]) => void, wait: number) => {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: any[]) {
    const later = () => {
      console.log('executing now.');
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
