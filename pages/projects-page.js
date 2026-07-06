/* ==========================================
   PROJECTS PAGE JAVASCRIPT
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
       MOBILE MENU
    =============================== */

    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if(menuBtn){

        menuBtn.addEventListener("click", () => {

            navLinks.classList.toggle("show");

        });

    }

    /* ===============================
       PROJECT FILTER
    =============================== */

    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            const filter = button.dataset.filter;

            projectCards.forEach(card => {

                if(filter === "all"){

                    card.style.display = "block";

                    setTimeout(() => {

                        card.style.opacity = "1";
                        card.style.transform = "scale(1)";

                    },100);

                }

                else if(card.classList.contains(filter)){

                    card.style.display = "block";

                    setTimeout(() => {

                        card.style.opacity = "1";
                        card.style.transform = "scale(1)";

                    },100);

                }

                else{

                    card.style.opacity = "0";
                    card.style.transform = "scale(.9)";

                    setTimeout(() => {

                        card.style.display = "none";

                    },250);

                }

            });

        });

    });

    /* ===============================
       SCROLL REVEAL
    =============================== */

    const revealItems = document.querySelectorAll(

        ".project-card,.tech-card,.timeline-item"

    );

    function reveal(){

        const trigger = window.innerHeight - 100;

        revealItems.forEach(item => {

            const top = item.getBoundingClientRect().top;

            if(top < trigger){

                item.classList.add("active");

            }

        });

    }

    window.addEventListener("scroll", reveal);

    reveal();

    /* ===============================
       ACTIVE PAGE
    =============================== */

    const current = window.location.pathname.split("/").pop();

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.classList.remove("active");

        if(link.getAttribute("href").includes(current)){

            link.classList.add("active");

        }

    });

    /* ===============================
       IMAGE HOVER EFFECT
    =============================== */

    document.querySelectorAll(".project-card img").forEach(image => {

        image.addEventListener("mouseenter", () => {

            image.style.transform = "scale(1.08)";

        });

        image.addEventListener("mouseleave", () => {

            image.style.transform = "";

        });

    });

    /* ===============================
       SMOOTH BUTTON EFFECT
    =============================== */

    document.querySelectorAll(".btn").forEach(button => {

        button.addEventListener("mouseenter", () => {

            button.style.transform = "translateY(-4px)";

        });

        button.addEventListener("mouseleave", () => {

            button.style.transform = "";

        });

    });

});