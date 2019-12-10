// ==UserScript==
// @name         WorkFlowy Navigate Siblings Keep Search
// @namespace    https://rawbytz.wordpress.com
// @version      1.8
// @description  Use PgUp & PgDn keys to navigate siblings keeping search criteria (like the Alt+Shft+0/9 shortcuts)
// @author       rawbytz
// @match        https://workflowy.com/*
// @match        https://beta.workflowy.com/*
// @updateUrl    https://gist.github.com/rawbytz/083aeec5b916497444b2d13b35cc60d2/raw/WorkFlowyNavSibsKeepSearch.user.js
// @downloadUrl  https://gist.github.com/rawbytz/083aeec5b916497444b2d13b35cc60d2/raw/WorkFlowyNavSibsKeepSearch.user.js
// @grant        none
// @run-at       document-end

// ==/UserScript==

(function () {
  'use strict';
  function navSibKeepSearch(prev) {
    const c = WF.currentItem();
    const q = WF.currentSearchQuery();
    const nav = prev ? c.getPreviousVisibleSibling(true) : c.getNextVisibleSibling(true);
    if (nav) {
      const base = nav.getUrl();
      location.href = q ? `${base}?q=${encodeURIComponent(q)}` : base;
    }
  }
  document.addEventListener("keydown", function (event) {
    if (!event.altKey && !event.ctrlKey && !event.shiftKey && !event.metaKey) {
      switch (event.key) {
        case "PageUp": // Previous Sibling
          navSibKeepSearch(true);
          event.stopPropagation();
          event.preventDefault();
          break;
        case "PageDown": // Next Sibling
          navSibKeepSearch();
          event.stopPropagation();
          event.preventDefault();
          break;
        default:
          break;
      }
    }
  });
})();