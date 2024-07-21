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
        // Converting keyword to lower case, trimming and erasing unwated characters
        const keyword = inputElement.value
          .toLowerCase()
          .trim()
          .replace(/[^a-z\s]/g, "");
        // Handling empty input
        if (keyword === "") {
          alert("Please enter a keyword!");
          return;
        }
        // Retrieving data
        fetch("travel_recommendation_api.json")
          .then((response) => response.json())
          .then((data) => {
            //searching in countries
            data.countries.forEach((country) => {
              country.cities.forEach((city) => {
                if (
                  city.name.toLowerCase().includes(keyword) ||
                  city.description.toLowerCase().includes(keyword)
                ) {
                  console.log(city);
                }
              });
            });
            //searching in temples
            if (["temple", "temples"].includes(keyword)) {
              console.log(data.temples);
            } else {
              data.temples.forEach((temple) => {
                if (
                  temple.name.toLowerCase().includes(keyword) ||
                  temple.description.toLowerCase().includes(keyword)
                ) {
                  console.log(temple);
                }
              });
            }
            //searching in beaches
            if (["beach", "beaches"].includes(keyword)) {
              console.log(data.beaches);
            } else {
              data.beaches.forEach((beach) => {
                if (
                  beach.name.toLowerCase().includes(keyword) ||
                  beach.description.toLowerCase().includes(keyword)
                ) {
                  console.log(beach);
                }
              });
            }
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
