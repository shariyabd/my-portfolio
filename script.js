/* =========================================================
   Mohammad Shariya — Portfolio Interactions
   Dark mode, typing, reveals, scroll-to-top, nav
   ========================================================= */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------- Theme Toggle ---------------------- */
  var html = document.documentElement;
  var themeBtn = document.getElementById("theme-toggle");
  var iconSun = themeBtn ? themeBtn.querySelector(".icon-sun") : null;
  var iconMoon = themeBtn ? themeBtn.querySelector(".icon-moon") : null;

  function setTheme(theme) {
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    if (iconSun && iconMoon) {
      iconSun.style.display = theme === "dark" ? "block" : "none";
      iconMoon.style.display = theme === "light" ? "block" : "none";
    }
    // Update theme-color meta
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#000000" : "#F8FAFC");
  }

  var saved = localStorage.getItem("theme");
  setTheme(saved || "light");

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var current = html.getAttribute("data-theme") || "dark";
      setTheme(current === "dark" ? "light" : "dark");
    });
  }

  /* ---------------------- Mobile Nav ---------------------- */
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

  /* ---------------------- Active Nav Link ---------------------- */
  var sections = document.querySelectorAll("section[id]");
  var navLinks = document.querySelectorAll(".nav__links a");

  function updateActiveNav() {
    var scrollY = window.scrollY + 100;
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute("id");
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(function (link) {
          link.style.color = "";
          if (link.getAttribute("href") === "#" + id) {
            link.style.color = "var(--accent)";
          }
        });
      }
    });
  }
  window.addEventListener("scroll", updateActiveNav, { passive: true });

  /* ---------------------- Typing Effect ---------------------- */
  var roles = [
    "Agentic Software Engineer.",
    "RAG & LLM Engineer.",
    "Laravel Backend Engineer.",
    "AI Automation Builder."
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
        if (!deleting && c < word.length) { c++; }
        else if (!deleting && c === word.length) { deleting = true; return setTimeout(tick, 1800); }
        else if (deleting && c > 0) { c--; }
        else { deleting = false; r = (r + 1) % roles.length; }
        setTimeout(tick, deleting ? 30 : 55);
      })();
    }
  }

  /* ---------------------- Scroll Reveal ---------------------- */
  var revealTargets = document.querySelectorAll(
    ".section__title, .section__subtitle, .lead, .tl, .proj, .skill-card, " +
    ".about__body p, .about__portrait, .contact__title, .link-row, " +
    ".edu-card, .achievement, .cert, .hero__content, .hero__visual"
  );

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealTargets.forEach(function (el) { el.classList.add("in"); });
  } else {
    revealTargets.forEach(function (el, i) {
      el.classList.add("reveal");
      el.style.transitionDelay = (i % 4) * 0.08 + "s";
    });
    var revObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          revObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    revealTargets.forEach(function (el) { revObserver.observe(el); });
    setTimeout(function () {
      revealTargets.forEach(function (el) { el.classList.add("in"); });
    }, 5000);
  }

  /* ---------------------- Scroll to Top ---------------------- */
  var topBtn = document.querySelector(".scrolltop");
  if (topBtn) {
    var onScroll = function () {
      topBtn.classList.toggle("show", window.scrollY > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    topBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ---------------------- Smooth anchor scrolling ---------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      }
    });
  });

})();
