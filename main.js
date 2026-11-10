// Menu navigasi mobile dan tahun copyright otomatis.
document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".nav-links");
  
    if (menuButton && navigation) {
      menuButton.addEventListener("click", () => {
        const opened = navigation.classList.toggle("open");
        menuButton.setAttribute("aria-expanded", String(opened));
        menuButton.setAttribute("aria-label", opened ? "Tutup navigasi" : "Buka navigasi");
      });
  
      navigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          navigation.classList.remove("open");
          menuButton.setAttribute("aria-expanded", "false");
          menuButton.setAttribute("aria-label", "Buka navigasi");
        });
      });
  
      window.addEventListener("resize", () => {
        if (window.innerWidth > 680) {
          navigation.classList.remove("open");
          menuButton.setAttribute("aria-expanded", "false");
        }
      });
    }
  
    document.querySelectorAll("[data-year]").forEach((element) => {
      element.textContent = new Date().getFullYear();
    });
  });
  