import React from "react";
import { Popover } from "@headlessui/react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const BUTTON_DEFAULTS =
  "inline-flex items-center border focus:outline-none font-medium rounded-md disabled:bg-gray-300";
const SMALL_DEFAULTS = "px-2.5 py-1.5 text-sm leading-4";
const WIDE_DEFAULTS =
  "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium disabled:bg-gray-300";
const PRIMARY_DEFAULTS =
  "text-white border-transparent text-white bg-blue-600 hover:bg-blue-700";
const WHITE_DEFAULTS =
  "border-gray-300 shadow-sm text-gray-700 bg-white hover:bg-gray-50";

export const PrimaryButtonWide = ({ ...props }) => (
  <button
    type="button"
    className={classNames(
      WIDE_DEFAULTS,
      PRIMARY_DEFAULTS,
      "focus:outline-none",
      props.classes
    )}
    {...props}
  />
);

export const WhiteButtonWide = ({ ...props }) => (
  <button
    type="button"
    className={classNames(
      WIDE_DEFAULTS,
      WHITE_DEFAULTS,
      "focus:outline-none",
      props.classes
    )}
    {...props}
  />
);

export const PrimaryButtonSmall = ({ ...props }) => (
  <button
    type="button"
    className={classNames(
      BUTTON_DEFAULTS,
      SMALL_DEFAULTS,
      PRIMARY_DEFAULTS,
      "shadow-sm",
      props.classes
    )}
    {...props}
  />
);

export const PrimaryButtonSmallWide = ({ ...props }) => (
  <button
    type="button"
    className={classNames(
      WIDE_DEFAULTS,
      SMALL_DEFAULTS,
      PRIMARY_DEFAULTS,
      "focus:outline-none",
      props.classes
    )}
    {...props}
  />
);

export const PrimaryButtonSmallPopover = ({ ...props }) => (
  <Popover.Button
    className={classNames(
      BUTTON_DEFAULTS,
      SMALL_DEFAULTS,
      PRIMARY_DEFAULTS,
      "shadow-sm",
      props.classes
    )}
    {...props}
  />
);

export const SecondaryButtonSmall = ({ ...props }) => (
  <button
    type="button"
    className={classNames(
      BUTTON_DEFAULTS,
      SMALL_DEFAULTS,
      "border-transparent text-indigo-700 bg-indigo-100 hover:bg-indigo-200",
      props.classes
    )}
    {...props}
  />
);

export const WhiteButtonSmall = ({ ...props }) => (
  <button
    type="button"
    className={classNames(
      BUTTON_DEFAULTS,
      SMALL_DEFAULTS,
      WHITE_DEFAULTS,
      props.classes
    )}
    {...props}
  />
);

export const WhiteButtonSmallPopover = ({ ...props }) => (
  <Popover.Button
    className={classNames(
      BUTTON_DEFAULTS,
      SMALL_DEFAULTS,
      WHITE_DEFAULTS,
      props.classes
    )}
    {...props}
  />
);

const SvgButton = ({ className = "", ...props }) => (
  <a
    href="#"
    className={classNames(
      "w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50",
      className
    )}
    {...props}
  />
);

export const FacebookButton = ({ ...props }) => (
  <SvgButton {...props}>
    <span className="sr-only">Sign in with Facebook</span>
    <svg
      className="w-5 h-5"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" />
    </svg>
  </SvgButton>
);

export const GoogleButton = ({ ...props }) => (
  <SvgButton {...props}>
    <span className="sr-only">Sign in with Google</span>
    <svg
      className="w-5 h-5"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 18 18"
    >
      <path d="M17.6562 9.12488C17.6562 8.56238 17.5859 8.1405 17.5156 7.68347H9.21875V10.6718H14.1406C13.9648 11.9725 12.6641 14.4335 9.21875 14.4335C6.23047 14.4335 3.80469 11.9725 3.80469 8.91394C3.80469 4.02722 9.57031 1.77722 12.6641 4.7655L15.0547 2.48035C13.543 1.0741 11.5391 0.19519 9.21875 0.19519C4.36719 0.19519 0.5 4.09753 0.5 8.91394C0.5 13.7655 4.36719 17.6327 9.21875 17.6327C14.2461 17.6327 17.6562 14.1171 17.6562 9.12488Z" />
    </svg>
  </SvgButton>
);
