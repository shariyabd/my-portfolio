/* =========================================================
   Mohammad Shariya — portfolio interactions (vanilla, no deps)
   ========================================================= */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------- mobile nav ---------------------- */
  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav__toggle");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll(".nav__links a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* -------------------- rotating role --------------------- */
  var roles = [
    "Agentic Software Engineer.",
    "RAG & LLM engineer.",
    "Laravel backend engineer.",
    "AI automation builder."
  ];
  var typingEl = document.querySelector(".typing");
  if (typingEl) {
    if (reduceMotion) {
      typingEl.textContent = roles[0];
    } else {
      var r = 0, c = 0, deleting = false;
      (function tick() {
        var word = roles[r];
        typingEl.textContent = word.slice(0, c);
        if (!deleting && c < word.length) {
          c++;
        } else if (!deleting && c === word.length) {
          deleting = true;
          return setTimeout(tick, 1600);
        } else if (deleting && c > 0) {
          c--;
        } else {
          deleting = false;
          r = (r + 1) % roles.length;
        }
        setTimeout(tick, deleting ? 34 : 62);
      })();
    }
  }

  /* ------------------ scroll reveal ----------------------- */
  var revealTargets = document.querySelectorAll(
    ".section-title, .lead, .tl, .proj, .skillset, .about__body p, .about__portrait, .contact__title, .link-row"
  );
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealTargets.forEach(function (el) { el.classList.add("in"); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("reveal"); });
    var revObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          revObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    revealTargets.forEach(function (el) { revObserver.observe(el); });
    // safety net: never leave content hidden if the observer misfires
    setTimeout(function () {
      revealTargets.forEach(function (el) { el.classList.add("in"); });
    }, 4000);
  }

  /* ------------------ scroll-to-top ----------------------- */
  var topBtn = document.querySelector(".scrolltop");
  if (topBtn) {
    var onScroll = function () {
      if (window.scrollY > 700) topBtn.classList.add("show");
      else topBtn.classList.remove("show");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    topBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }
})();
