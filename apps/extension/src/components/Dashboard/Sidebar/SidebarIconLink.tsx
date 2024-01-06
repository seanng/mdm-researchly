import React from 'react';

import { classNames } from 'utils/helpers';

interface SidebarIconLinkProps {
  name: string;
  Icon: React.ElementType;
  href?: string;
  iconClasses?: string;
  classes?: string;
  onClick?: () => void;
}

export function SidebarIconLink({
  name = '',
  Icon,
  href = '#',
  classes = '',
  iconClasses = '',
  onClick,
}: SidebarIconLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={classNames(
        'text-gray-500 leading-5 hover:text-gray-900 group flex items-center text-sm font-normal',
        classes
      )}
    >
      {Icon && (
        <Icon
          className={classNames(
            'text-gray-500 group-hover:text-gray-500',
            'mr-2 flex-shrink-0 h-5 w-5',
            iconClasses
          )}
          aria-hidden="true"
        />
      )}
      {name}
    </a>
  );
}
