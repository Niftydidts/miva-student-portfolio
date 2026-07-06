const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

console.log(menuToggle);
console.log(navLinks);

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        console.log("Menu clicked!");
        navLinks.classList.toggle("active");
    });
}
