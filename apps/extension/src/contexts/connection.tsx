import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from 'react';

const ConnectionContext = createContext<chrome.runtime.Port | null>(null);

export const ConnectionProvider: FC = ({ ...props }) => {
  const [port, setPort] = useState<null | chrome.runtime.Port>(null);
  useEffect(() => {
    const p = chrome.runtime.connect({ name: 'popup' });
    setPort(p);
  }, []);
  return <ConnectionContext.Provider value={port} {...props} />;
};

export const useConnection = () => useContext(ConnectionContext);
