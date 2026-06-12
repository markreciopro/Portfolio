// ── Tab Navigation ───────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");
  const tabs     = document.querySelectorAll(".tab-content");

  navLinks.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-tab");

      // Update active nav button
      navLinks.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Show matching tab
      tabs.forEach((tab) => {
        tab.classList.toggle("active", tab.id === `tab-${target}`);
      });

      // Scroll main to top on tab change
      const main = document.querySelector(".main");
      if (main) main.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
});