import React from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface SidebarLinkProps {
  name: string;
  Icon: React.ElementType;
  href?: string;
  iconClasses?: string;
  classes?: string;
  onClick?: () => void;
}

export function SidebarLink({
  name = "",
  Icon,
  href = "#",
  classes = "",
  iconClasses = "",
  onClick,
}: SidebarLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={classNames(
        "text-gray-500 leading-5 hover:text-gray-900 group flex items-center text-sm font-normal",
        classes
      )}
    >
      {Icon && (
        <Icon
          className={classNames(
            "text-gray-500 group-hover:text-gray-500",
            "mr-2 flex-shrink-0 h-5 w-5",
            iconClasses
          )}
          aria-hidden="true"
        />
      )}
      {name}
    </a>
  );
}

export function NavLink({ className = "", ...props }) {
  return (
    <a
      className={classNames(
        "inline-block align-baseline font-medium text-sm text-blue-500 hover:text-blue-800",
        className
      )}
      href="#"
      {...props}
    />
  );
}
