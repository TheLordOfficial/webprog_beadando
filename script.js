// Aktív menüpont automatikus jelölése (ha több oldalon használjuk ezt a js-t)
const links = document.querySelectorAll("nav ul li a");
const current = window.location.pathname.split("/").pop();

links.forEach(link => {
  if (link.getAttribute("href") === current) {
    link.classList.add("active");
  }
});
