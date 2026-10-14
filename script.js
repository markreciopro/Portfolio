// ── Tab Navigation & Mobile Touch Interactivity ───────────────
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");
  const tabs     = document.querySelectorAll(".tab-content, #tab-projects.card");

  navLinks.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-tab");

      // Update active nav button
      navLinks.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Show matching tab / section
      tabs.forEach((tab) => {
        if (tab.id === `tab-${target}`) {
          tab.classList.add("active");
          tab.style.display = "block";
        } else {
          tab.classList.remove("active");
          if (tab.id.startsWith("tab-")) {
            tab.style.display = "none";
          }
        }
      });

      // Scroll smoothly to top on tab change for mobile & desktop
      window.scrollTo({ top: 0, behavior: "smooth" });
      const main = document.querySelector(".main");
      if (main) main.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  // Shiftboard stream touch drag & horizontal scrolling support
  const shiftboardTrack = document.querySelector(".marec-shiftboard-track");
  const shiftboardList = document.getElementById("projectLoopList");

  if (shiftboardTrack && shiftboardList) {
    let isDown = false;
    let startX;
    let scrollLeft;

    // Mouse events
    shiftboardTrack.addEventListener("mousedown", (e) => {
      isDown = true;
      shiftboardTrack.classList.add("active");
      startX = e.pageX - shiftboardTrack.offsetLeft;
      scrollLeft = shiftboardTrack.scrollLeft;
    });

    shiftboardTrack.addEventListener("mouseleave", () => {
      isDown = false;
      shiftboardTrack.classList.remove("active");
    });

    shiftboardTrack.addEventListener("mouseup", () => {
      isDown = false;
      shiftboardTrack.classList.remove("active");
    });

    shiftboardTrack.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - shiftboardTrack.offsetLeft;
      const walk = (x - startX) * 2;
      shiftboardTrack.scrollLeft = scrollLeft - walk;
    });

    // Touch events for mobile swiping
    shiftboardTrack.addEventListener("touchstart", (e) => {
      startX = e.touches[0].pageX - shiftboardTrack.offsetLeft;
      scrollLeft = shiftboardTrack.scrollLeft;
    }, { passive: true });

    shiftboardTrack.addEventListener("touchmove", (e) => {
      if (!startX) return;
      const x = e.touches[0].pageX - shiftboardTrack.offsetLeft;
      const walk = (x - startX) * 1.5;
      shiftboardTrack.scrollLeft = scrollLeft - walk;
    }, { passive: true });
  }
});
