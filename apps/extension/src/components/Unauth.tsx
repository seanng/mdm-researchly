import React, { SyntheticEvent } from 'react';
import { Logo, PrimaryButtonWide, WhiteButtonWide } from 'ui';
import secrets from 'secrets';

export const Unauth: React.FC = () => {
  const goTo = (url: string) => (e: SyntheticEvent) => {
    e.preventDefault();
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener(null);
  };
  return (
    <div className="min-h-full flex flex-col justify-center py-16 px-16">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Logo className="mx-auto h-12 w-auto" />
        <h2 className="mt-6 mb-12 text-center text-xl font-semibold text-gray-900 leading-7">
          Researchly.US
        </h2>
        <PrimaryButtonWide onClick={goTo(secrets.webUrl + '/login')}>
          Sign in
        </PrimaryButtonWide>
        <WhiteButtonWide
          onClick={goTo(secrets.webUrl + '/signup')}
          classes="mt-4"
        >
          Sign up
        </WhiteButtonWide>
      </div>
    </div>
  );
};
