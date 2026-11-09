document.addEventListener("DOMContentLoaded", function () {
    initContactForm();
    initRegisterForm();
    initCart();
});

function initContactForm() {
    var form = document.getElementById("contactForm");
    var message = document.getElementById("successMessage");
    if (!form || !message) return;

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        var name = document.getElementById("name").value.trim();
        message.textContent =
            "Thank you, " + name + "! Your message has been sent. We will contact you soon.";
        form.reset();

        setTimeout(function () {
            message.textContent = "";
        }, 6000);
    });
}

function initRegisterForm() {
    var form = document.querySelector('form[action="#"][method="post"]');
    var fullname = document.getElementById("fullname");
    if (!form || !fullname) return;

    var note = document.createElement("p");
    note.setAttribute("role", "status");
    note.style.cssText = "text-align:center;font-weight:bold;color:#54805a;margin:15px 0 0;";
    form.appendChild(note);

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        note.textContent =
            "Welcome to Cafe Aroma, " + fullname.value.trim() + "! Your registration was successful.";
        note.scrollIntoView({ behavior: "smooth", block: "center" });
        form.reset();

        setTimeout(function () {
            note.textContent = "";
        }, 6000);
    });

    form.addEventListener("reset", function () {
        note.textContent = "";
    });
}

function initCart() {
    var buttons = document.querySelectorAll(".cart-btn");
    if (!buttons.length) return;

    var count = 0;

    var toast = document.createElement("div");
    toast.setAttribute("role", "status");
    toast.style.cssText =
        "position:fixed;bottom:20px;right:20px;padding:12px 20px;" +
        "background:#3e2723;color:#fff;border-radius:8px;" +
        "box-shadow:0 6px 16px rgba(0,0,0,0.3);font-family:Arial,sans-serif;" +
        "opacity:0;pointer-events:none;transition:opacity 0.3s;z-index:1000;";
    document.body.appendChild(toast);

    var hideTimer;
    function showToast(text) {
        toast.textContent = text;
        toast.style.opacity = "1";
        clearTimeout(hideTimer);
        hideTimer = setTimeout(function () {
            toast.style.opacity = "0";
        }, 2500);
    }

    buttons.forEach(function (button) {
        button.addEventListener("click", function (event) {
            event.preventDefault();

            var card = button.closest(".product-card");
            var title = card.querySelector("h3").textContent;
            var soldOut = card.querySelector(".stock.out");

            if (soldOut) {
                showToast(title + " is sold out.");
                return;
            }

            count++;
            showToast(title + " added to cart. Items in cart: " + count);
        });
    });
}