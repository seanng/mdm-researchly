import { request } from 'lib/request';
import { Socket } from 'socket.io-client';
import { fetchMyData, updateCache } from 'utils/helpers';
import { Collection, CreateLinkPayload, Link, Store } from 'utils/types';

// Events fired from the Popup are handled in this listener.
export function popupEventsListener(
  req: any,
  port: chrome.runtime.Port,
  socket: Socket
) {
  switch (req.message) {
    case 'P_COLLECTION_CREATE':
      socket.emit('B_COLLECTION_CREATE', req.data);
      break;
    case 'P_COLLECTION_UPDATE':
      requestCollectionUpdate(req.data);
      break;
    case 'P_COLLECTION_DELETE':
      requestCollectionDelete(req.data);
      break;
    case 'P_LINK_CREATE':
      requestLinkCreate(req.data, port);
      break;
    case 'P_LINK_UPDATE':
      socket.emit('B_LINK_UPDATE', {
        id: req.data.linkId,
        data: req.data.body,
      });
      break;
    case 'P_LINK_DELETE':
      socket.emit('B_LINK_DELETE', { id: req.data.linkId });
      break;
    case 'P_COLLECTION_USER_DELETE':
      requestCollectionUserDelete(req.data);
      break;
    default:
      break;
  }
}

export async function requestCollectionUpdate(data: {
  collectionId: string;
  collections: Collection[];
  body: Partial<Collection>;
}) {
  const path = `/collections/${data.collectionId}`;
  await request(path, { method: 'PATCH', body: JSON.stringify(data.body) });
  updateCache({ collections: data.collections });
}

export async function requestCollectionDelete(data: {
  collectionId: string;
  collections: Collection[];
}) {
  await request(`/collections/${data.collectionId}`, { method: 'DELETE' });
  updateCache({ collections: data.collections });
}

export async function requestCollectionJoin(cb: () => void) {
  const myDeets = await fetchMyData();
  await updateCache(myDeets);
  cb();
}

export function requestCollectionUserDelete(data: {
  collectionId: string;
  userId: string;
}) {
  const { collectionId, userId } = data;
  return request(`/collections/${collectionId}/users/${userId}`, {
    method: 'DELETE',
  });
}

export async function requestLinkCreate(
  data: CreateLinkPayload,
  port: chrome.runtime.Port
) {
  const { collectionId, ...link } = await request('/links', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  port.postMessage({
    message: 'LINK_POST_SUCCESS',
    data: link,
  });
  chrome.storage.local.get(['collections'], ({ collections }) => {
    const idx = collections.findIndex(
      (e: Collection) => e.id === data.collectionId
    );
    collections[idx].links.push(link);
    updateCache({ collections });
  });
}
