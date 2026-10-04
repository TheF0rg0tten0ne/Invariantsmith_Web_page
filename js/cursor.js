/*
 * cursor.js
 * Replaces the system pointer with a brass ring and a small dot. The ring
 * trails the dot with easing and grows over interactive elements. Only runs
 * with a fine pointer (mouse or trackpad) and without reduced motion.
 */
(function () {
  var fine = window.matchMedia && window.matchMedia("(pointer: fine)").matches;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!fine || reduce) return;

  var root = document.documentElement;
  root.classList.add("has-cursor");

  var ring = document.createElement("div");
  ring.className = "cursor-ring";
  var dot = document.createElement("div");
  dot.className = "cursor-dot";
  document.body.appendChild(ring);
  document.body.appendChild(dot);

  var mx = 0, my = 0, rx = 0, ry = 0, shown = false;

  function frame() {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.transform = "translate3d(" + rx + "px," + ry + "px,0)";
    dot.style.transform = "translate3d(" + mx + "px," + my + "px,0)";
    window.requestAnimationFrame(frame);
  }
  window.requestAnimationFrame(frame);

  document.addEventListener("pointermove", function (e) {
    mx = e.clientX;
    my = e.clientY;
    if (!shown) {
      shown = true;
      ring.classList.add("is-on");
      dot.classList.add("is-on");
    }
  }, { passive: true });

  document.addEventListener("pointerdown", function () { ring.classList.add("is-down"); });
  document.addEventListener("pointerup", function () { ring.classList.remove("is-down"); });

  document.addEventListener("pointerover", function (e) {
    var hit = e.target.closest && e.target.closest("a, button, summary, [data-copy], .card, .member, .stage, .tab, .stat");
    ring.classList.toggle("is-hover", !!hit);
  });

  document.addEventListener("mouseout", function (e) {
    if (!e.relatedTarget) {
      ring.classList.remove("is-on");
      dot.classList.remove("is-on");
      shown = false;
    }
  });
})();
