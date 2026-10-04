/*
 * tabs.js
 * OS tabs for the getting-started section. Follows the WAI-ARIA tabs
 * pattern: arrow keys move between tabs, Home and End jump to the ends.
 */
(function () {
  function init() {
    var wrap = document.querySelector("[data-tabs]");
    if (!wrap) return;

    var tabs = Array.prototype.slice.call(wrap.querySelectorAll("[role='tab']"));
    var panels = Array.prototype.slice.call(wrap.querySelectorAll("[role='tabpanel']"));

    function select(tab, focus) {
      var key = tab.getAttribute("data-tab");
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.setAttribute("tabindex", on ? "0" : "-1");
      });
      panels.forEach(function (p) {
        p.hidden = p.getAttribute("data-panel") !== key;
      });
      if (focus) tab.focus();
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { select(tab, false); });
      tab.addEventListener("keydown", function (e) {
        var idx = i;
        if (e.key === "ArrowRight") idx = (i + 1) % tabs.length;
        else if (e.key === "ArrowLeft") idx = (i - 1 + tabs.length) % tabs.length;
        else if (e.key === "Home") idx = 0;
        else if (e.key === "End") idx = tabs.length - 1;
        else return;
        e.preventDefault();
        select(tabs[idx], true);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
