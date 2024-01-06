import { printLine } from './modules/print';

console.log('Content script works!111');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");

chrome.runtime.onMessage.addListener(handleIncomingMessages);

/* HANDLERS */
async function handleIncomingMessages(req, sender, sendResponse) {
  if (req.message === 'PAGE_DESCRIPTION') {
    sendResponse(getPageDescription());
  }
}

function getPageDescription() {
  const metaDesc = document
    ?.querySelector("meta[name='description']")
    ?.getAttribute('content');
  const ogPropDesc = document
    ?.querySelector("meta[property='og:description']")
    ?.getAttribute('content');
  const ogNameDesc = document
    ?.querySelector("meta[name='og:description']")
    ?.getAttribute('content');

  return metaDesc || ogPropDesc || ogNameDesc;
}
