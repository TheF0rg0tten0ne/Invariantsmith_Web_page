/*
 * theme.js
 * Sets the colour theme before first paint (this script loads in <head>),
 * wires the header toggle, and handles the T keyboard shortcut.
 * Choice is stored in localStorage under "invsmith-theme". With no stored
 * choice, the system preference is followed.
 */
(function () {
  var KEY = "invsmith-theme";
  var root = document.documentElement;
  var mql = window.matchMedia ? window.matchMedia("(prefers-color-scheme: light)") : null;

  // Motion helpers key off this class; CSS only hides reveal targets when it is present.
  root.classList.add("js-motion");

  function stored() {
    try {
      var v = localStorage.getItem(KEY);
      return v === "light" || v === "dark" ? v : null;
    } catch (e) {
      return null; // storage blocked: fall back to system preference
    }
  }

  function systemTheme() {
    return mql && mql.matches ? "light" : "dark";
  }

  function apply(theme, animate) {
    if (animate) {
      root.classList.add("theme-transition");
      window.setTimeout(function () { root.classList.remove("theme-transition"); }, 450);
    }
    root.setAttribute("data-theme", theme);
    var btn = document.getElementById("theme-toggle");
    if (btn) {
      var next = theme === "dark" ? "light" : "dark";
      btn.setAttribute("aria-label", "Switch to " + next + " theme");
      btn.setAttribute("data-current", theme);
    }
  }

  function current() {
    return root.getAttribute("data-theme") === "light" ? "light" : "dark";
  }

  function toggle() {
    var next = current() === "dark" ? "light" : "dark";
    apply(next, true);
    try { localStorage.setItem(KEY, next); } catch (e) { /* ignore */ }
  }

  // Apply immediately (no flash of the wrong theme).
  apply(stored() || systemTheme(), false);

  // Follow system changes only while the visitor has not chosen a theme.
  if (mql && mql.addEventListener) {
    mql.addEventListener("change", function (e) {
      if (!stored()) apply(e.matches ? "light" : "dark", true);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.addEventListener("click", toggle);
      apply(current(), false); // sync label after DOM is ready
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key !== "t" && e.key !== "T") return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    var t = e.target;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    toggle();
  });
})();
