/*
 * copy.js
 * One-click copy for every element with a [data-copy] button.
 * Uses the Clipboard API, with a textarea fallback for older browsers
 * and for pages opened from file://.
 */
(function () {
  var toast = document.getElementById("toast");
  var toastTimer = null;

  function announce(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 1600);
  }

  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    return ok;
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(function () { return true; }, function () {
        return fallbackCopy(text);
      });
    }
    return Promise.resolve(fallbackCopy(text));
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest && e.target.closest("[data-copy]");
    if (!btn) return;
    var text = btn.getAttribute("data-copy");
    copyText(text).then(function (ok) {
      var original = btn.textContent;
      btn.textContent = ok ? "Copied" : "Copy failed";
      announce(ok ? "Copied to clipboard" : "Could not copy. Select the text instead.");
      window.setTimeout(function () { btn.textContent = original; }, 1400);
    });
  });
})();
