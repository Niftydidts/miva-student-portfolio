// Mobile Menu

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if(menuToggle && navLinks){

    menuToggle.onclick = function(){

        navLinks.classList.toggle("active");

    };

}


// Scroll Animation

const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver((entries)=>{

    entries.forEach((entry)=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{threshold:0.2});

sections.forEach((section)=>{

    observer.observe(section);

});
