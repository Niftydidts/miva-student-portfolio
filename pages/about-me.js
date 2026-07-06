/* ==========================================
   ABOUT PAGE JAVASCRIPT
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
       Mobile Navigation
    =============================== */

    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("show");
        });

    }

    /* ===============================
       Scroll Reveal Animation
    =============================== */

    const revealElements = document.querySelectorAll(
        ".bio-card, .goal-card, .timeline-item, .skill-box, .stat-card"
    );

    function revealOnScroll() {

        const windowHeight = window.innerHeight;

        revealElements.forEach((element) => {

            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < windowHeight - 100) {

                element.classList.add("active");

            }

        });

    }

    window.addEventListener("scroll", revealOnScroll);

    revealOnScroll();

    /* ===============================
       Animated Counters
    =============================== */

    const counters = document.querySelectorAll(".counter");

    counters.forEach(counter => {

        const target = Number(counter.dataset.target);

        let count = 0;

        const speed = target / 80;

        function updateCounter() {

            count += speed;

            if (count < target) {

                counter.textContent = Math.floor(count);

                requestAnimationFrame(updateCounter);

            } else {

                counter.textContent = target;

            }

        }

        updateCounter();

    });

    /* ===============================
       Active Navigation
    =============================== */

    const currentPage = window.location.pathname.split("/").pop();

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href").includes(currentPage)) {

            link.classList.add("active");

        }

    });

    /* ===============================
       Button Hover Effect
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