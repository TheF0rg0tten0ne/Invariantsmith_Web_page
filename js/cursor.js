/*
 * cursor.js
 * The pointer is a small tungsten bulb. It carries a slow, warm pool of
 * light that lags behind it, so the part of the page under the pointer is
 * lit. Over links and buttons the bulb swells and the pool brightens; on
 * press the bulb dims for a moment. Runs only with a fine pointer and
 * without reduced motion.
 */
(function () {
  var fine = window.matchMedia && window.matchMedia("(pointer: fine)").matches;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!fine || reduce) return;

  document.documentElement.classList.add("has-cursor");

  function make(cls, inner) {
    var w = document.createElement("div");
    w.className = cls + "-wrap";
    w.setAttribute("aria-hidden", "true");
    var i = document.createElement("div");
    i.className = cls;
    w.appendChild(i);
    document.body.appendChild(w);
    return { wrap: w, inner: i };
  }

  var pool = make("cursor-pool");
  var bulb = make("cursor-bulb");

  var mx = 0, my = 0;
  var px = 0, py = 0, bx = 0, by = 0;
  var shown = false;

  function frame() {
    px += (mx - px) * 0.1;   // the light follows slowly
    py += (my - py) * 0.1;
    bx += (mx - bx) * 0.55;  // the bulb is quick
    by += (my - by) * 0.55;
    pool.wrap.style.transform = "translate3d(" + px + "px," + py + "px,0)";
    bulb.wrap.style.transform = "translate3d(" + bx + "px," + by + "px,0)";
    window.requestAnimationFrame(frame);
  }
  window.requestAnimationFrame(frame);

  function setVisible(on) {
    pool.wrap.classList.toggle("is-on", on);
    bulb.wrap.classList.toggle("is-on", on);
  }

  document.addEventListener("pointermove", function (e) {
    mx = e.clientX;
    my = e.clientY;
    if (!shown) {
      shown = true;
      px = bx = mx;
      py = by = my;
      setVisible(true);
    }
  }, { passive: true });

  document.addEventListener("pointerdown", function () {
    bulb.wrap.classList.add("is-down");
    pool.wrap.classList.add("is-down");
  });
  document.addEventListener("pointerup", function () {
    bulb.wrap.classList.remove("is-down");
    pool.wrap.classList.remove("is-down");
  });

  document.addEventListener("pointerover", function (e) {
    var hit = e.target.closest && e.target.closest("a, button, summary, [data-copy], .card, .member, .stage, .tab, .stat");
    bulb.wrap.classList.toggle("is-hover", !!hit);
    pool.wrap.classList.toggle("is-hover", !!hit);
  });

  document.addEventListener("mouseout", function (e) {
    if (!e.relatedTarget) {
      setVisible(false);
      shown = false;
    }
  });
})();
