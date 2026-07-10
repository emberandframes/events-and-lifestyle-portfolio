/* =====================================================================
   Ember & Frames — application logic
   --------------------------------------------------------------------
   - Renders the wall + event collections from EMBER_DATA
   - Reveal + darkroom "develop" effects via IntersectionObserver
   - Lightbox (photos), click-to-play video, enquiry form
   - Sticky top bar + WhatsApp FAB behaviour
   ===================================================================== */
(function () {
  "use strict";

  var doc = document;
  var data = window.EMBER_DATA || { wall: [], events: [], contact: {} };
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function photoTile(p, opts) {
    opts = opts || {};
    var year = p.year ? p.year : "";
    var cap = opts.caption
      ? '<figcaption class="frame-cap"><span>' + esc(p.name) + "</span><span>" + esc(year) + "</span></figcaption>"
      : "";
    var dev =
      '<div class="dev" data-develop data-full="' + p.src + '" data-name="' + esc(p.name) + '" data-year="' + esc(year) + '" style="aspect-ratio:' + p.ratio + '">' +
        '<img class="img" src="' + p.src + '" alt="' + esc(p.name) + '" loading="lazy" decoding="async">' +
        '<div class="cast"></div><div class="bath"></div><div class="sheen"></div>' +
        '<svg class="wmark" aria-hidden="true"><use href="#ef-mark"></use></svg>' +
      "</div>";
    if (opts.framed) {
      return '<figure class="tile"><div class="frame frame--sm">' + dev + cap + "</div></figure>";
    }
    return '<figure class="tile">' + dev + "</figure>";
  }

  function videoTile(v, opts) {
    opts = opts || {};
    var poster = v.poster || (v.src ? v.src.replace(/\.[a-z0-9]+$/i, ".jpg") : "");
    var title = v.label || opts.title || "";
    var cap = opts.caption
      ? '<figcaption class="frame-cap"><span>' + esc(title) + "</span><span></span></figcaption>"
      : "";
    var dev =
      '<div class="dev vid" data-develop data-video data-src="' + v.src + '" style="aspect-ratio:' + v.ratio + '">' +
        '<video class="img" preload="metadata" muted playsinline' + (poster ? ' poster="' + poster + '"' : "") + ' src="' + v.src + '"></video>' +
        '<div class="cast"></div><div class="bath"></div><div class="sheen"></div>' +
        '<svg class="wmark" aria-hidden="true"><use href="#ef-mark"></use></svg>' +
        '<div class="playbtn"><div class="tri"></div></div>' +
      "</div>";
    if (opts.framed) {
      return '<figure class="tile"><div class="frame frame--sm">' + dev + cap + "</div></figure>";
    }
    return '<figure class="tile">' + dev + "</figure>";
  }

  /* ---------- render: the wall ---------- */
  var wallEl = doc.getElementById("wall");
  if (wallEl) {
    wallEl.innerHTML = data.wall.map(function (p) {
      return photoTile(p, { framed: true, caption: true });
    }).join("");
  }

  /* ---------- render: events ---------- */
  var eventsRoot = doc.getElementById("events-root");
  if (eventsRoot) {
    eventsRoot.innerHTML = data.events.map(function (ev) {
      var tiles = ev.items.map(function (it) {
        return it.type === "video"
          ? videoTile(it, { framed: true, caption: true, title: ev.title })
          : photoTile(it, { framed: true, caption: true });
      }).join("");
      return (
        '<article class="event reveal" data-reveal id="' + esc(ev.id) + '">' +
          '<div class="event__head">' +
            "<div>" +
              (ev.eyebrow ? '<div class="event__eyebrow">' + esc(ev.eyebrow) + "</div>" : "") +
              '<h3 class="event__title">' + esc(ev.title) + "</h3>" +
            "</div>" +
            (ev.count ? '<div class="event__count">' + esc(ev.count) + "</div>" : "") +
          "</div>" +
          '<div class="event-grid">' + tiles + "</div>" +
        "</article>"
      );
    }).join("");
  }

  /* ---------- collect dynamic + static elements ---------- */
  var reveals = [].slice.call(doc.querySelectorAll("[data-reveal]"));
  var devs = [].slice.call(doc.querySelectorAll("[data-develop]"));

  /* ---------- reveal + develop ---------- */
  function showAll() {
    reveals.forEach(function (el) { el.classList.remove("armed"); el.classList.add("shown"); });
    devs.forEach(function (d) { d.classList.add("developed"); });
  }

  function develop(d) {
    if (d._locked || d.classList.contains("developed")) return;
    d.classList.add("developing");
    void d.offsetWidth; // reflow so the transition runs from the armed state
    d.classList.add("developed");
    if (d._devTimer) clearTimeout(d._devTimer);
    d._devTimer = setTimeout(function () { d.classList.remove("developing"); }, 2600);
  }
  function undevelop(d) {
    if (d._locked) return;
    if (d._devTimer) { clearTimeout(d._devTimer); d._devTimer = null; }
    d.classList.remove("developed", "developing");
  }

  if (reduce || !("IntersectionObserver" in window)) {
    showAll();
  } else {
    reveals.forEach(function (el) { el.classList.add("reveal", "armed"); });

    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.remove("armed");
          en.target.classList.add("shown");
          revealIO.unobserve(en.target);
        }
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0 });
    reveals.forEach(function (el) { revealIO.observe(el); });

    // Re-runs the develop → colour transition every time a frame enters the
    // viewport (scrolling up or down). The reset to "blank" only happens once
    // the frame is fully off-screen, so the reversal is never visible.
    var devIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) develop(en.target);
        else undevelop(en.target);
      });
    }, { threshold: 0 });
    devs.forEach(function (d) { devIO.observe(d); });
  }

  /* ---------- lightbox (photos only) ---------- */
  var photoDevs = devs.filter(function (d) {
    return !d.hasAttribute("data-video") && d.getAttribute("data-full");
  });
  var lb = doc.getElementById("lb");
  var lbImg = doc.getElementById("lb-img");
  var lbName = doc.getElementById("lb-name");
  var lbYear = doc.getElementById("lb-year");
  var lbDot = doc.getElementById("lb-dot");
  var lbCount = doc.getElementById("lb-count");
  var idx = 0;
  var lastFocus = null;
  var lbToken = 0; // guards against races when navigating quickly

  // Warm the browser cache for a frame so opening/advancing is instant.
  function preload(i) {
    var d = photoDevs[i];
    if (!d) return;
    var src = d.getAttribute("data-full");
    if (!src) return;
    var img = new Image();
    img.decoding = "async";
    img.src = src;
  }

  function renderLb() {
    var d = photoDevs[idx];
    if (!d) return;

    var name = d.getAttribute("data-name") || "";
    var year = d.getAttribute("data-year") || "";
    var src = d.getAttribute("data-full");
    var token = ++lbToken;

    // Caption/count update immediately so navigation feels responsive.
    lbName.textContent = name;
    lbYear.textContent = year;
    lbDot.style.display = name && year ? "" : "none";
    lbCount.textContent = idx + 1 + " / " + photoDevs.length;

    // Fade the current frame out.
    lb.setAttribute("data-swap", "1");

    var reveal = function () {
      if (token !== lbToken) return; // a newer navigation superseded this one
      lbImg.src = src;
      lbImg.alt = name;
      // Apply the new src while hidden, then fade in on the next frame so the
      // image is decoded before it becomes visible (prevents the blink).
      requestAnimationFrame(function () {
        if (token !== lbToken) return;
        lb.removeAttribute("data-swap");
      });
    };

    // Wait for the new image to be ready before revealing it.
    var pre = new Image();
    pre.decoding = "async";
    var onReady = function () {
      if (token !== lbToken) return;
      if (pre.decode) { pre.decode().then(reveal).catch(reveal); }
      else reveal();
    };
    pre.onload = onReady;
    pre.onerror = onReady;
    pre.src = src;
    if (pre.complete) onReady();

    // Prefetch neighbours so subsequent moves are seamless.
    preload((idx + 1) % photoDevs.length);
    preload((idx - 1 + photoDevs.length) % photoDevs.length);
  }
  function openLb(i) {
    lastFocus = doc.activeElement;
    idx = i;
    renderLb();
    lb.setAttribute("data-open", "1");
    lb.setAttribute("aria-hidden", "false");
    doc.body.style.overflow = "hidden";
    var close = doc.getElementById("lb-close");
    if (close) close.focus();
  }
  function closeLb() {
    lbToken++; // cancel any in-flight swap
    lb.removeAttribute("data-open");
    lb.removeAttribute("data-swap");
    lb.setAttribute("aria-hidden", "true");
    doc.body.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function go(n) { idx = (idx + n + photoDevs.length) % photoDevs.length; renderLb(); }

  photoDevs.forEach(function (d, i) {
    d.setAttribute("role", "button");
    d.setAttribute("tabindex", "0");
    d.setAttribute("aria-label", "View " + (d.getAttribute("data-name") || "photograph"));
    d.addEventListener("click", function () { openLb(i); });
    d.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLb(i); }
    });
  });

  if (lb) {
    doc.getElementById("lb-close").addEventListener("click", closeLb);
    doc.getElementById("lb-prev").addEventListener("click", function (e) { e.stopPropagation(); go(-1); });
    doc.getElementById("lb-next").addEventListener("click", function (e) { e.stopPropagation(); go(1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
    doc.addEventListener("keydown", function (e) {
      if (!lb.hasAttribute("data-open")) return;
      if (e.key === "Escape") closeLb();
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "ArrowRight") go(1);
    });
    var sx = 0;
    lb.addEventListener("touchstart", function (e) { sx = e.changedTouches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
    }, { passive: true });
  }

  /* ---------- click-to-play video ---------- */
  [].slice.call(doc.querySelectorAll("[data-video]")).forEach(function (wrap) {
    wrap.addEventListener("click", function () {
      var v = wrap.querySelector("video");
      if (!v) return;
      wrap._locked = true;
      wrap.classList.add("developed");
      var pb = wrap.querySelector(".playbtn"); if (pb) pb.style.display = "none";
      var tag = wrap.querySelector(".vidtag"); if (tag) tag.style.display = "none";
      v.muted = false;
      v.controls = true;
      v.setAttribute("controlslist", "nodownload");
      var p = v.play();
      if (p && p.catch) { p.catch(function () { v.muted = true; v.play(); }); }
    });
  });

  /* Videos play fullscreen natively. Vertical clips are letterboxed via CSS
     (object-fit:contain) so they never zoom/crop to fill a landscape screen.
     The bottom-right brand watermark is burned into each clip, so there is no
     overlay to preserve in fullscreen. */

  /* ---------- enquiry form ---------- */
  var form = doc.getElementById("enquiry-form");
  if (form) {
    var statusEl = doc.getElementById("ef-status");
    var pills = [].slice.call(doc.querySelectorAll("#ef-pills .pill"));
    var wa = data.contact.whatsapp || "";
    var email = data.contact.email || "";

    pills.forEach(function (p) {
      p.addEventListener("click", function () {
        p.setAttribute("aria-pressed", p.getAttribute("aria-pressed") === "true" ? "false" : "true");
      });
    });
    function selectedTypes() {
      return pills.filter(function (p) { return p.getAttribute("aria-pressed") === "true"; })
        .map(function (p) { return p.textContent.trim(); });
    }
    function gather() {
      return {
        name: doc.getElementById("ef-name").value.trim(),
        email: doc.getElementById("ef-email").value.trim(),
        phone: doc.getElementById("ef-phone").value.trim(),
        occasion: doc.getElementById("ef-occasion").value.trim(),
        message: doc.getElementById("ef-message").value.trim(),
        types: selectedTypes()
      };
    }
    function validate(d) {
      if (!d.name) return "Please add your name.";
      if (!d.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email)) return "Please add a valid email.";
      if (!d.occasion) return "Please tell us the occasion or brand.";
      return "";
    }
    function buildText(d) {
      var lines = [];
      lines.push("Name: " + d.name);
      lines.push("Email: " + d.email);
      if (d.phone) lines.push("Phone: " + d.phone);
      lines.push("Occasion / Brand: " + d.occasion);
      if (d.types.length) lines.push("Event type: " + d.types.join(", "));
      if (d.message) lines.push("Message: " + d.message);
      return lines.join("\n");
    }
    function setStatus(msg, cls) { statusEl.textContent = msg; statusEl.className = "form-status" + (cls ? " " + cls : ""); }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = gather(), err = validate(d);
      if (err) { setStatus(err, "error"); return; }
      var subject = "Enquiry — " + d.occasion + " (" + d.name + ")";
      window.location.href = "mailto:" + email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(buildText(d));
      setStatus("Opening your email app…", "success");
    });
    var waBtn = doc.getElementById("ef-wa");
    if (waBtn) {
      waBtn.addEventListener("click", function () {
        var d = gather(), err = validate(d);
        if (err) { setStatus(err, "error"); return; }
        var text = "Hi Ember & Frames,\n\n" + buildText(d);
        window.open("https://wa.me/" + wa + "?text=" + encodeURIComponent(text), "_blank", "noopener");
        setStatus("Opening WhatsApp…", "success");
      });
    }
  }

  /* ---------- mobile menu ---------- */
  var navToggles = [].slice.call(doc.querySelectorAll(".nav-toggle"));
  var mobileMenu = doc.getElementById("mobile-menu");
  if (mobileMenu && navToggles.length) {
    var menuClose = doc.getElementById("mobile-menu-close");
    var setMenu = function (open) {
      mobileMenu.classList.toggle("open", open);
      mobileMenu.setAttribute("aria-hidden", open ? "false" : "true");
      navToggles.forEach(function (t) { t.setAttribute("aria-expanded", open ? "true" : "false"); });
      doc.body.style.overflow = open ? "hidden" : "";
    };
    navToggles.forEach(function (t) {
      t.addEventListener("click", function () { setMenu(!mobileMenu.classList.contains("open")); });
    });
    if (menuClose) menuClose.addEventListener("click", function () { setMenu(false); });
    [].slice.call(mobileMenu.querySelectorAll("a")).forEach(function (a) {
      a.addEventListener("click", function () { setMenu(false); });
    });
    doc.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mobileMenu.classList.contains("open")) setMenu(false);
    });
  }

  /* ---------- sticky top bar ---------- */
  var topbar = doc.getElementById("topbar");
  var hero = doc.getElementById("top");
  if (topbar && hero) {
    var ticking = false;
    var barShown = false;
    function syncTopbar() {
      var base = hero.offsetHeight;
      var y = window.scrollY;
      // hysteresis: show a bit past the hero, hide well before it — prevents flicker at the threshold
      if (!barShown && y > base - 60) { barShown = true; topbar.classList.add("show"); }
      else if (barShown && y < base - 150) { barShown = false; topbar.classList.remove("show"); }
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(syncTopbar); }
    }, { passive: true });
    syncTopbar();
  }

  /* ---------- WhatsApp FAB: lift clear of the footer so it never covers footer text ---------- */
  var fab = doc.querySelector(".wa-fab");
  var footer = doc.querySelector(".footer");
  if (fab && footer && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          // lift above the footer's full height (any width) so it never overlaps footer text
          fab.style.setProperty("--fab-lift", (footer.offsetHeight + 24) + "px");
          fab.classList.add("lift-up");
        } else {
          fab.classList.remove("lift-up");
        }
      });
    }, { threshold: 0.02 }).observe(footer);
  }
})();
