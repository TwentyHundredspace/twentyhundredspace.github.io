// Load navbar.html into the container
window.addEventListener("DOMContentLoaded", () => {
    fetch("navigationbar.html")
      .then(response => response.text())
      .then(data => {
        document.getElementById("navbar-container").innerHTML = data;
      });
  });
  
  // Mobile menu toggle
  function toggleMenu() {
    const nav = document.querySelector(".nav-links");
    nav.classList.toggle("active");
  }
  