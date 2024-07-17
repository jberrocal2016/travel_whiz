document.addEventListener("DOMContentLoaded", () => {
  initPage(); // Runs when the page has fully loaded
});

function initPage() {
  try {
    if (document.body.classList.contains("home-page")) {
      handleHomePage();
    } else if (document.body.classList.contains("contact-us-page")) {
      handleContactPage();
    }
  } catch (error) {
    console.error("An error occurred durin initialization:", error);
  }
}

function handleHomePage() {
  const searchButton = document.getElementById("search");
  const clearButton = document.getElementById("clear");
  const inputElement = document.getElementById("keyword");

  if (searchButton) {
    // Set up the event listener for the search button
    searchButton.addEventListener("click", () => {
      if (inputElement) {
        const keyword = inputElement.value.toLowerCase();
        // Process input when the search button is clicked

        fetch("travel_recommendation_api.json")
          .then((response) => response.json())
          .then((data) => {
            const recommendation = data;
            console.log(recommendation);
          });
      } else {
        console.error("Keyword input element not found.");
      }
    });
  } else {
    console.error("Keyword input element not found.");
  }

  if (clearButton) {
    // Set up the event listener for the clear button
    clearButton.addEventListener("click", () => {
      if (inputElement) {
        inputElement.value = ""; // Clear the input field
      } else {
        console.error("Keyword input element not found.");
      }
    });
  } else {
    console.error("Clear button element not found.");
  }
}

function handleContactPage() {
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent the form from submitting normally

      // Perform form validation here
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      if (name === "" || email === "" || message === "") {
        alert("Please fill in all fields");
        return;
      }

      //form submission logic will go here
      //...

      contactForm.reset();
      alert("Thank you for contacting us!");
    });
  } else {
    console.error("Contact form element not found.");
  }
}
