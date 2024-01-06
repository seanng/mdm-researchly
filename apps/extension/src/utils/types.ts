export interface Collection {
  id: string;
  role: string;
  name: string;
  participants: Participant[];
  description?: string;
  links: Link[];
}

export interface CreateLinkPayload {
  title: string;
  url: string;
  faviconUrl: string;
  description: string;
  collectionId: string;
}

export interface User {
  id: string;
  email: string;
}

export interface Link extends Omit<CreateLinkPayload, 'collectionId'> {
  id: string;
  readerInfo: ReaderInfo;
}

export interface Participant {
  id: string;
  role: string;
  email: string;
  avatarUrl?: string;
}

export interface ReaderInfoValue {
  hasReadIt: boolean;
  // TODO: add userAvatarUrl
}

export type ReaderInfo = Record<string, ReaderInfoValue>;

export interface Store {
  user?: {
    id: string;
    email: string;
  };
  collections?: {
    id: string;
    links: Link[];
    name: string;
    description?: string;
    role: string;
    participants: {
      id: string;
      role: string;
      email: string;
    }[];
  }[];
  activeIdx?: number;
  cacheTime?: number;
}

export interface MeResponsePayload {
  id: string;
  email: string;
  collections: {
    role: string;
    collection: {
      id: string;
      description?: string;
      name: string;
      links: Link[];
      users: {
        role: string;
        user: {
          id: string;
          email: string;
        };
      }[];
    };
  }[];
}
