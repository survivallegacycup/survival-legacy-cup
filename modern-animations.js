/* ==========================================================================
   MODERN ANIMATIONS — Survival Legacy Cup
   Thuần JS, không phụ thuộc thư viện ngoài. An toàn khi thiếu phần tử
   (mọi selector đều optional-chained / kiểm tra tồn tại trước khi dùng).
   ========================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    setupScrollReveal();
    setupTilt3D();
    setupSpotlight();
    setupRipple();
    setupNavbarScroll();
    setupRowStagger();
    setupLogoParallax();
    setupCardFlip();
    setupSectionParallax();
    setupPageEnter();
  }

  /* ---------- 8. LẬT THẺ 3D KHI CLICK (cho phần tử .card-3d-flip) ---------- */
  function setupCardFlip() {
    var cards = document.querySelectorAll(".card-3d-flip");
    if (!cards.length) return;
    cards.forEach(function (card) {
      card.addEventListener("click", function () {
        card.classList.toggle("is-flipped");
      });
    });
  }

  /* ---------- 9. PARALLAX NHẸ CHO CÁC KHỐI SECTION KHI CUỘN ---------- */
  function setupSectionParallax() {
    if (reduceMotion) return;
    var sections = document.querySelectorAll(".section-box, .table-wrapper, .team-info-banner");
    if (!sections.length) return;
    var ticking = false;

    function update() {
      var vh = window.innerHeight;
      sections.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        var center = rect.top + rect.height / 2;
        var offset = ((center - vh / 2) / vh) * 10; // biên độ nhỏ, tinh tế
        el.style.transform = "translateY(" + (-offset).toFixed(2) + "px)";
      });
      ticking = false;
    }
    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );
    update();
  }

  /* ---------- 10. HIỆU ỨNG VÀO TRANG (fade + 3D nhẹ cho toàn bộ container) ---------- */
  function setupPageEnter() {
    var main = document.querySelector(".container");
    if (!main) return;
    main.style.opacity = "0";
    main.style.transform = "translateY(24px) rotateX(-4deg)";
    main.style.transformOrigin = "top center";
    requestAnimationFrame(function () {
      main.style.transition = "opacity .7s " + "cubic-bezier(.22,.8,.2,1)" +
        ", transform .7s cubic-bezier(.22,.8,.2,1)";
      main.style.opacity = "1";
      main.style.transform = "none";
    });
  }

  /* ---------- 1. SCROLL REVEAL (IntersectionObserver) ---------- */
  function setupScrollReveal() {
    var targets = document.querySelectorAll(
      ".player-card, .vip-card, .slot-card, .hud-box, .news-item, " +
      ".section-box, .t-icon, .sidebar-item, .sidebar-stage, .table-wrapper, " +
      ".team-info-banner, .rgb-counter-box"
    );
    if (!targets.length) return;

    targets.forEach(function (el, i) {
      el.classList.add("reveal-3d");
      el.style.transitionDelay = Math.min(i % 12, 12) * 45 + "ms";
    });

    if (!("IntersectionObserver" in window)) {
      targets.forEach(function (el) { el.classList.add("in-view"); });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    targets.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 2. TILT 3D THEO CHUỘT ---------- */
  function setupTilt3D() {
    if (reduceMotion) return;
    var els = document.querySelectorAll(
      ".player-card, .vip-card, .slot-card, .hud-box, .t-icon, .news-item"
    );
    if (!els.length) return;

    els.forEach(function (el) {
      var raf = null;

      el.addEventListener("mousemove", function (e) {
        var rect = el.getBoundingClientRect();
        var px = (e.clientX - rect.left) / rect.width;
        var py = (e.clientY - rect.top) / rect.height;
        var rotY = (px - 0.5) * 14; // trái/phải
        var rotX = (0.5 - py) * 14; // trên/dưới

        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(function () {
          el.style.transform =
            "perspective(800px) rotateX(" + rotX + "deg) rotateY(" + rotY +
            "deg) translateY(-4px) scale(1.015)";
        });
      });

      el.addEventListener("mouseleave", function () {
        if (raf) cancelAnimationFrame(raf);
        el.style.transform = "";
      });
    });
  }

  /* ---------- 3. SPOTLIGHT THEO CHUỘT (cập nhật CSS var --mx/--my) ---------- */
  function setupSpotlight() {
    if (reduceMotion) return;
    var raf = null;
    window.addEventListener("mousemove", function (e) {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        var xPct = (e.clientX / window.innerWidth) * 100;
        var yPct = (e.clientY / window.innerHeight) * 100;
        document.body.style.setProperty("--mx", xPct + "%");
        document.body.style.setProperty("--my", yPct + "%");
        raf = null;
      });
    });
  }

  /* ---------- 4. RIPPLE KHI CLICK NÚT ---------- */
  function setupRipple() {
    var selector =
      ".btn-xem-thong-so, .login-btn, .btn-login, .btn-stats, .btn-join, " +
      "button, .arrow-btn, .btn-back-top";
    document.addEventListener("click", function (e) {
      var target = e.target.closest ? e.target.closest(selector) : null;
      if (!target) return;

      var rect = target.getBoundingClientRect();
      var size = Math.max(rect.width, rect.height);
      var span = document.createElement("span");
      span.className = "ripple-el";
      span.style.width = span.style.height = size + "px";
      span.style.left = e.clientX - rect.left - size / 2 + "px";
      span.style.top = e.clientY - rect.top - size / 2 + "px";

      var prevPosition = getComputedStyle(target).position;
      if (prevPosition === "static") target.style.position = "relative";

      target.appendChild(span);
      window.setTimeout(function () {
        span.remove();
      }, 650);
    });
  }

  /* ---------- 5. NAVBAR THU NHỎ + BLUR KHI CUỘN ---------- */
  function setupNavbarScroll() {
    var nav = document.querySelector(".navbar");
    if (!nav) return;
    var ticking = false;

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(function () {
          nav.classList.toggle("is-scrolled", window.scrollY > 24);
          ticking = false;
        });
        ticking = true;
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- 6. TRẬN ĐẤU XUẤT HIỆN TUẦN TỰ TRONG BẢNG ---------- */
  function setupRowStagger() {
    var groups = document.querySelectorAll(".match-item");
    if (!groups.length) return;

    if (!("IntersectionObserver" in window)) {
      groups.forEach(function (row) { row.classList.add("row-in"); });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, idx) {
          if (entry.isIntersecting) {
            window.setTimeout(function () {
              entry.target.classList.add("row-in");
            }, idx * 35);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    groups.forEach(function (row) { io.observe(row); });
  }

  /* ---------- 7. LOGO CHUYỂN ĐỘNG NHẸ THEO CUỘN (parallax) ---------- */
  function setupLogoParallax() {
    if (reduceMotion) return;
    var logo = document.querySelector(".nav-logo-container img, .logo img");
    if (!logo) return;
    window.addEventListener(
      "scroll",
      function () {
        var offset = Math.min(window.scrollY * 0.05, 6);
        logo.style.transform = "translateY(" + offset + "px)";
      },
      { passive: true }
    );
  }
})();
