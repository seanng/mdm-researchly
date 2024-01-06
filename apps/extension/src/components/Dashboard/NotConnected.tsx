import React from 'react';
import { Logo } from 'ui';

export const NotConnected: React.FC = () => {
  return (
    <div className="min-h-full flex flex-col justify-center py-16 px-16">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Logo className="mx-auto h-12 w-auto" />
        <h2 className="mt-6 mb-12 text-center text-xl font-semibold text-gray-900 leading-7">
          Unable to connect to server :(
        </h2>
      </div>
    </div>
  );
};
