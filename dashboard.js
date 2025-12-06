document.addEventListener("DOMContentLoaded", () => {

  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");

  // Open Sidebar
  menuToggle.addEventListener("click", () => {
    sidebar.classList.add("open");
    overlay.classList.add("show");
  });

  // Close Sidebar when overlay is clicked
  overlay.addEventListener("click", () => {
    sidebar.classList.remove("open");
    overlay.classList.remove("show");
  });

  // View buttons click
  document.querySelectorAll(".view-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      alert("Booking details will be shown here.");
    });
  });

});
