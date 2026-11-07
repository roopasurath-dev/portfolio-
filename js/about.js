const params = new URLSearchParams(window.location.search);

const portfolioId =
    params.get("id") || localStorage.getItem("portfolioId");

async function loadPortfolio() {

    if (!portfolioId) {
        document.getElementById("displayName").textContent =
            "No Portfolio Found";

        return;
    }

    try {

        const response = await fetch(
            `/api/portfolio/${encodeURIComponent(portfolioId)}`
        );

        if (!response.ok) {
            throw new Error("Portfolio not found");
        }

        const data = await response.json();

        // Display student details

        document.getElementById("displayName").textContent =
            data.fullName || "";

        document.getElementById("displayEmail").textContent =
            "Email: " + (data.email || "");

        document.getElementById("displayPhone").textContent =
            "Phone: " + (data.phone || "");

        document.getElementById("displayIntro").textContent =
            data.intro || "No introduction added.";

        document.getElementById("displayEducation").textContent =
            data.education || "No education details added.";

        document.getElementById("displaySkills").textContent =
            data.skills || "No skills added.";

        document.getElementById("displayProjects").textContent =
            data.projects || "No projects added.";

        document.getElementById("displayAchievements").textContent =
            data.achievements || "No achievements added.";

        // Display profile photo

        if (data.photoUrl) {

            const image = document.getElementById("profileImage");

            image.src = data.photoUrl;

            image.onerror = function() {
                this.src =
                    "https://placehold.co/180x180?text=Profile";
            };

        }

    } catch (error) {

        document.getElementById("displayName").textContent =
            error.message;

    }

}

loadPortfolio();