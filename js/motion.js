/*
 * motion.js
 * Scroll-driven and entrance motion: progress line, header shrink,
 * reveal-on-scroll, hero stagger, and counters for real numbers only.
 * With prefers-reduced-motion, everything is shown at once with no animation.
 */
(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function showAll() {
    document.querySelectorAll(".reveal, .reveal-stage").forEach(function (el) {
      el.classList.add("is-visible");
    });
    var hero = document.querySelector(".hero");
    if (hero) hero.classList.add("is-ready");
  }

  // Scroll progress and header shrink.
  var bar = document.getElementById("progress-bar");
  var header = document.getElementById("site-header");
  var ticking = false;

  function onScroll() {
    ticking = false;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var ratio = max > 0 ? window.scrollY / max : 0;
    if (bar) bar.style.transform = "scaleX(" + ratio.toFixed(4) + ")";
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 24);
  }

  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
  onScroll();

  // Counters: animate only elements that hold a real number.
  function countUp(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    if (isNaN(target)) return;
    var start = null;
    var duration = 1100;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toString();
      if (p < 1) window.requestAnimationFrame(step);
    }
    el.textContent = "0";
    window.requestAnimationFrame(step);
  }

  function init() {
    // Hero text staggers in on load.
    var hero = document.querySelector(".hero");
    if (hero) {
      window.requestAnimationFrame(function () { hero.classList.add("is-ready"); });
    }

    if (reduce || !("IntersectionObserver" in window)) {
      showAll();
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        el.classList.add("is-visible");
        if (el.hasAttribute("data-count")) countUp(el);
        io.unobserve(el);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    document.querySelectorAll(".reveal, .reveal-stage, [data-count]").forEach(function (el) {
      io.observe(el);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
