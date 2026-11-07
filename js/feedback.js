const feedbackForm = document.getElementById("feedbackForm");

feedbackForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const feedbackMessage =
        document.getElementById("feedbackMessage");

    const feedbackData = {

        name: document.getElementById("name").value.trim(),

        email: document.getElementById("email").value.trim(),

        rating: document.getElementById("rating").value,

        suggestions: document.getElementById("suggestions").value.trim(),

        comments: document.getElementById("comments").value.trim()

    };

    try {

        feedbackMessage.textContent = "Submitting feedback...";

        const response = await fetch("/api/feedback", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(feedbackData)

        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message);
        }

        feedbackMessage.textContent =
            "Thank you! Your feedback was submitted successfully.";

        feedbackForm.reset();

    } catch (error) {

        feedbackMessage.textContent =
            error.message || "Unable to submit feedback.";

    }

});