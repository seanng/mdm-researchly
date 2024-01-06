import { useEffect } from 'react';

export function useConfigureUI() {
  useEffect(() => {
    initBodyWidth();
    disableEscapeKey();
  }, []);

  function initBodyWidth() {
    // Set width, as visible width can sometimes be less than 800px
    const $body = document.querySelector('body');
    if ($body) $body.style.width = `${window.innerWidth}px`;
  }

  function disableEscapeKey() {
    window.onkeydown = function (e) {
      if (e.key === 'Escape') {
        e.preventDefault();
      }
    };
  }
}
