/* ==========================================
   CONTACT PAGE JAVASCRIPT
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
       MOBILE MENU
    =============================== */

    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("show");
        });

    }

    /* ===============================
       CHARACTER COUNTER
    =============================== */

    const message = document.getElementById("message");
    const charCount = document.getElementById("charCount");

    if (message && charCount) {

        message.addEventListener("input", () => {

            charCount.textContent = message.value.length;

        });

    }

    /* ===============================
       FORM VALIDATION
    =============================== */

    const form = document.getElementById("contactForm");

    if(form){

        form.addEventListener("submit", function(e){

            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const subject = document.getElementById("subject").value.trim();
            const msg = message.value.trim();

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            const phonePattern =
                /^[0-9+\-\s()]{7,20}$/;

            if(name.length < 3){

                alert("Please enter your full name.");

                return;

            }

            if(!emailPattern.test(email)){

                alert("Please enter a valid email address.");

                return;

            }

            if(phone !== "" && !phonePattern.test(phone)){

                alert("Please enter a valid phone number.");

                return;

            }

            if(subject.length < 3){

                alert("Please enter a subject.");

                return;

            }

            if(msg.length < 10){

                alert("Message should contain at least 10 characters.");

                return;

            }

            showToast("Message sent successfully!");

            form.reset();

            charCount.textContent = "0";

        });

    }

    /* ===============================
       TOAST MESSAGE
    =============================== */

    function showToast(text){

        const toast = document.createElement("div");

        toast.className = "toast";

        toast.textContent = text;

        document.body.appendChild(toast);

        setTimeout(() => {

            toast.classList.add("show");

        },100);

        setTimeout(() => {

            toast.classList.remove("show");

            setTimeout(() => {

                toast.remove();

            },300);

        },3000);

    }

    /* ===============================
       SCROLL REVEAL
    =============================== */

    const revealItems = document.querySelectorAll(

        ".contact-form, .info-card, .social-card, .faq-item, .map-placeholder"

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
       ACTIVE NAVIGATION
    =============================== */

    const currentPage = window.location.pathname.split("/").pop();

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.classList.remove("active");

        if(link.getAttribute("href").includes(currentPage)){

            link.classList.add("active");

        }

    });

});