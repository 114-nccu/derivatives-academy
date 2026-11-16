(function(){'use strict';
  // Navigation is plain anchors; no external dependencies or network calls.
  document.querySelectorAll('[data-current-year]').forEach(el=>{el.textContent=new Date().getFullYear()});
})();
