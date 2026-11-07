const portfolioForm = document.getElementById("portfolioForm");

portfolioForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const formMessage = document.getElementById("formMessage");

    const portfolioData = {
        fullName: document.getElementById("fullName").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        education: document.getElementById("education").value.trim(),
        skills: document.getElementById("skills").value.trim(),
        projects: document.getElementById("projects").value.trim(),
        achievements: document.getElementById("achievements").value.trim(),
        photoUrl: document.getElementById("photoUrl").value.trim(),
        intro: document.getElementById("intro").value.trim()
    };

    try {

        formMessage.textContent = "Creating your portfolio...";

        const response = await fetch("/api/portfolio", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(portfolioData)

        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message);
        }

        // Save portfolio ID for About page

        localStorage.setItem("portfolioId", result.id);

        formMessage.textContent = "Portfolio created successfully!";

        // Open About page

        window.location.href =
            "about.html?id=" + encodeURIComponent(result.id);

    } catch (error) {

        formMessage.textContent =
            error.message || "Something went wrong!";

    }

});