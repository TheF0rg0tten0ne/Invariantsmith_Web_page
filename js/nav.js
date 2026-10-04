/*
 * nav.js
 * Highlights the header link for whichever section is currently in view.
 * Sections are marked with [data-nav-section] and have an id that matches
 * a link href of the form "#id" in .site-nav.
 */
(function () {
  function init() {
    var links = document.querySelectorAll(".site-nav a[href^='#']");
    if (!links.length || !("IntersectionObserver" in window)) return;

    var byId = {};
    links.forEach(function (a) {
      byId[a.getAttribute("href").slice(1)] = a;
    });

    function setActive(id) {
      links.forEach(function (a) {
        var on = a.getAttribute("href") === "#" + id;
        a.classList.toggle("is-active", on);
        if (on) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && byId[entry.target.id]) {
          setActive(entry.target.id);
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

    document.querySelectorAll("[data-nav-section]").forEach(function (sec) {
      if (sec.id) io.observe(sec);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
