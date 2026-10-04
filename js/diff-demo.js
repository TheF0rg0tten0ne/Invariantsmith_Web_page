/*
 * diff-demo.js
 * Plays the scanf fix as a before/after transition with a play/replay
 * control. The removed line fades out and the added line fades in.
 * With prefers-reduced-motion, the change applies instantly.
 */
(function () {
  var demo = document.getElementById("diff-demo");
  if (!demo) return;

  var btn = document.getElementById("diff-play");
  var caption = document.getElementById("diff-caption");
  var del = demo.querySelector(".line-del");
  var add = demo.querySelector(".line-add");
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var timers = [];

  var CAP_BEFORE = "Before: the second argument to scanf is missing &. Press Play to see the fix applied.";
  var CAP_AFTER = "After: &n passes the address of n, so scanf can store the input. This fix was verified before it was offered.";

  function clearTimers() {
    timers.forEach(function (t) { window.clearTimeout(t); });
    timers = [];
  }

  function show(which) {
    if (which === "before") {
      del.classList.remove("is-hidden");
      add.classList.add("is-hidden");
      caption.textContent = CAP_BEFORE;
      btn.textContent = "Play";
    } else {
      del.classList.add("is-hidden");
      add.classList.remove("is-hidden");
      caption.textContent = CAP_AFTER;
      btn.textContent = "Replay";
    }
    btn.setAttribute("aria-pressed", which === "after" ? "true" : "false");
  }

  function play() {
    clearTimers();
    if (reduce) { show("after"); return; }
    show("before");
    timers.push(window.setTimeout(function () { show("after"); }, 700));
  }

  btn.addEventListener("click", play); // Play and Replay both run from the start

  // Start in the "before" state.
  if (del && add) show("before");
})();
