// ── Tab Navigation & Shiftboard Stream Interactivity ───────────────
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

      // Scroll main to top on tab change
      const main = document.querySelector(".main");
      if (main) main.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  // Shiftboard stream infinite auto-loop / pause behavior
  const shiftboardTrack = document.querySelector(".marec-shiftboard-track");
  const shiftboardList = document.getElementById("projectLoopList");

  if (shiftboardTrack && shiftboardList) {
    // Duplicate items to ensure smooth infinite loop illusion if desired,
    // or enable smooth drag-to-scroll interactivity.
    let isDown = false;
    let startX;
    let scrollLeft;

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
      const walk = (x - startX) * 2; // Scroll-fast multiplier
      shiftboardTrack.scrollLeft = scrollLeft - walk;
    });
  }
});