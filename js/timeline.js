/*
 * timeline.js
 * Development timeline: a gold line fills as you scroll through the phases,
 * and the phase currently in the middle of the viewport is spotlit.
 */
(function () {
  function init() {
    var tl = document.querySelector(".timeline");
    if (!tl) return;
    var items = Array.prototype.slice.call(tl.querySelectorAll("li"));

    function progress() {
      var r = tl.getBoundingClientRect();
      var line = window.innerHeight * 0.6;
      var p = (line - r.top) / (r.height || 1);
      p = Math.max(0, Math.min(1, p));
      tl.style.setProperty("--tl", p.toFixed(3));
    }

    window.addEventListener("scroll", function () { window.requestAnimationFrame(progress); }, { passive: true });
    window.addEventListener("resize", progress);
    progress();

    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          e.target.classList.toggle("lit", e.isIntersecting);
        });
      }, { rootMargin: "-40% 0px -40% 0px", threshold: 0 });
      items.forEach(function (li) { io.observe(li); });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
