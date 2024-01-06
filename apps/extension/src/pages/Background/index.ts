import { io, Socket } from 'socket.io-client';
import secrets from 'secrets';
import { getStorageItems } from 'utils/helpers';
import { popupEventsListener } from './listeners/popup';
import { serverEventsListener } from './listeners/server';
import { externalEventsListener } from './listeners/external';

let token: string;

chrome.runtime.onInstalled.addListener(handleExtensionStartup);
chrome.runtime.onStartup.addListener(handleExtensionStartup);
chrome.runtime.onMessageExternal.addListener((_, __, ___) =>
  externalEventsListener(_, __, ___, onUserAuth)
);
chrome.runtime.onMessage.addListener((_, __, ___) =>
  externalEventsListener(_, __, ___, onUserAuth)
);
chrome.runtime.onConnect.addListener(handlePopupOpen);
chrome.runtime.onSuspend.addListener(() => {
  console.log('onSuspend heard.');
});

async function onUserAuth(sendResponse: () => void) {
  const storageItems = await getStorageItems();
  token = storageItems?.token;
  sendResponse();
}

async function handleExtensionStartup() {
  console.log('extension starting up.222');
  const storageItems = await getStorageItems();
  console.log('storageItems: ', storageItems);
  token = storageItems?.token;
  console.log('token: ', token);
  chrome.action.setPopup({
    popup: storageItems?.token ? 'popup_dashboard.html' : 'popup_unauth.html',
  });
}

async function handlePopupOpen(port: chrome.runtime.Port) {
  if (port.name !== 'popup') {
    console.error('Something else is trying to connect...', port.name);
    return;
  }

  // if service worker sleeps, re-set token.
  const storageItems = await getStorageItems();
  token = storageItems?.token;

  const socket = io(secrets.serverBaseUrl, {
    transports: ['websocket'],
    auth: { token },
  });

  socket.on('connect', () => {
    port.postMessage({
      message: 'SOCKET_CONNECTION_SUCCESS',
    });
  });

  socket.on('connect_error', () => {
    port.postMessage({
      message: 'SOCKET_CONNECTION_FAIL',
    });
  });

  serverEventsListener(socket, port);
  port.onMessage.addListener((req) => popupEventsListener(req, port, socket));
  port.onDisconnect.addListener((port) => onPopupDisconnect(port, socket));
}

function onPopupDisconnect(port: chrome.runtime.Port, socket: Socket) {
  socket.disconnect();
}
