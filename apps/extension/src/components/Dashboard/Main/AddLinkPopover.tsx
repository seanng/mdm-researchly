// DEPRECATED COMPONENT
import React from 'react';
import { StarIcon } from '@heroicons/react/solid';
import { Popover } from '@headlessui/react';
import {
  PrimaryButtonSmallPopover,
  PrimaryButtonSmallWide,
  SecondaryButtonSmall,
} from 'ui';

/**
 * @deprecated
 */
export function AddLinkPopover() {
  async function handleAddCurrentLink() {
    const [activeTab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
    if (!activeTab?.id) {
      console.log('Unable to find active tab.', activeTab);
      return;
    }
    chrome.tabs.sendMessage(
      activeTab.id,
      { message: 'PAGE_DESCRIPTION' },
      (desc) => {}
    );

    // console.log('desc: ', desc);
    // get url og info
    // save url and og info to db.
  }
  return (
    <Popover className="relative">
      <PrimaryButtonSmallPopover classes="ml-1">
        <StarIcon className="-ml-0.5 mr-1 h-4 w-4" aria-hidden="true" />
        Add link
      </PrimaryButtonSmallPopover>
      <Popover.Panel className="absolute right-0 top-9 z-10 w-[218px] border border-gray-300 rounded-md divide-y divide-gray-100 bg-white">
        <div className="p-3">
          <PrimaryButtonSmallWide onClick={handleAddCurrentLink}>
            Add current link
          </PrimaryButtonSmallWide>
        </div>
        <div className="p-3 space-y-1">
          <p className="text-xs font-medium">Or paste a link</p>
          <div className="flex justify-between">
            <input
              className="appearance-none flex-1 border w-[50px] rounded-md border-gray-300 focus:outline-none px-1.5 py-1 text-xs mr-1"
              placeholder="https://example.com"
            />
            <SecondaryButtonSmall>Save</SecondaryButtonSmall>
          </div>
        </div>
      </Popover.Panel>
    </Popover>
  );
}
