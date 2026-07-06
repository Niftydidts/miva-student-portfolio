const form = document.getElementById("contactForm");

const message = document.getElementById("formMessage");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const text = document.getElementById("message").value.trim();

    if(name === "" || email === "" || text === ""){

        message.style.color = "#d9534f";

        message.textContent = "Please fill in all fields.";

        return;

    }

    message.style.color = "#4F772D";

    message.textContent = "✅ Thank you! Your message has been received.";

    form.reset();

});
