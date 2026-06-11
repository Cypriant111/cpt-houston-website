// CPT Houston, Inc. — shared behaviour

(function () {
  "use strict";

  // Footer year (original site printed the current year via document.write)
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Sticky header shadow
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Mobile navigation
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Reveal-on-scroll
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("visible");
    });
  }

  // Supplier directory live filter
  var search = document.getElementById("supplier-search");
  if (search) {
    var blocks = Array.prototype.slice.call(
      document.querySelectorAll(".letter-block")
    );
    var noResults = document.querySelector(".no-results");
    var azLinks = Array.prototype.slice.call(
      document.querySelectorAll(".az-nav a")
    );

    search.addEventListener("input", function () {
      var q = search.value.trim().toLowerCase();
      var anyVisible = false;

      blocks.forEach(function (block) {
        var visibleInBlock = 0;
        block.querySelectorAll("li").forEach(function (li) {
          var hit = !q || li.textContent.toLowerCase().indexOf(q) !== -1;
          li.style.display = hit ? "" : "none";
          if (hit) visibleInBlock++;
        });
        block.style.display = visibleInBlock ? "" : "none";
        if (visibleInBlock) anyVisible = true;

        var letter = block.id.replace("letter-", "");
        azLinks.forEach(function (a) {
          if (a.getAttribute("href") === "#letter-" + letter) {
            a.style.opacity = visibleInBlock ? "" : "0.25";
            a.style.pointerEvents = visibleInBlock ? "" : "none";
          }
        });
      });

      if (noResults) noResults.style.display = anyVisible ? "none" : "block";
    });
  }
})();
