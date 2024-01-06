import React from 'react';
import { SidebarIconLink } from './SidebarIconLink';
import { CogIcon, LogoutIcon } from '@heroicons/react/solid';
import { signout } from 'utils/helpers';

export function Footer() {
  return (
    <div className="flex-shrink-0 border-t border-gray-100 pt-6 pl-2">
      {/* <SidebarIconLink
        name="Settings (unavailable)"
        Icon={CogIcon}
        classes="pb-6 px-2"
      /> */}
      <SidebarIconLink
        name="Logout"
        Icon={LogoutIcon}
        classes="pb-6 px-2"
        onClick={signout}
      />
    </div>
  );
}
