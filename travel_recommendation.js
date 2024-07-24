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
  const resultDiv = document.getElementById("recommendations");

  if (searchButton) {
    // Set up the event listener for the enter key
    inputElement.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        searchButton.click();
      }
    });
    // Set up the event listener for the search button
    searchButton.addEventListener("click", () => {
      resultDiv.innerHTML = ""; //clearing the results

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
                  displayResults(city);
                }
              });
            });
            //searching in temples
            if (["temple", "temples"].includes(keyword)) {
              data.temples.forEach((temple) => {
                displayResults(temple);
              });
            } else {
              data.temples.forEach((temple) => {
                if (
                  temple.name.toLowerCase().includes(keyword) ||
                  temple.description.toLowerCase().includes(keyword)
                ) {
                  displayResults(temple);
                }
              });
            }
            //searching in beaches
            if (["beach", "beaches"].includes(keyword)) {
              data.beaches.forEach((beach) => {
                displayResults(beach);
              });
            } else {
              data.beaches.forEach((beach) => {
                if (
                  beach.name.toLowerCase().includes(keyword) ||
                  beach.description.toLowerCase().includes(keyword)
                ) {
                  displayResults(beach);
                }
              });
            }
            //keyword not found message
            if (resultDiv.innerHTML === "") {
              alert("keyword not found, try again.");
              inputElement.value = "";
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
        resultDiv.innerHTML = ""; // Clear recommendations
      } else {
        console.error("Keyword input element not found.");
      }
    });
  } else {
    console.error("Clear button element not found.");
  }

  // Displaying results in homepage
  function displayResults(destination) {
    // Check if destination has a valid timeZone property
    const localTime = destination.timeZone
      ? getTimeZone(destination.timeZone)
      : "N/A";

    // Create a single string for the innerHTML
    const content = `
    <div>
      <img src="${destination.imageUrl}" alt="${destination.name}">
      <h2>${destination.name}</h2>
      <p>Local Time: ${localTime}<br><br>${destination.description}</p>
    </div><br>
  `;
    // Append the content to resultDiv
    resultDiv.innerHTML += content;
  }

  // Retrieving local time
  function getTimeZone(timeZone) {
    try {
      const options = {
        timeZone: timeZone,
        hour12: true,
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      };
      return new Intl.DateTimeFormat("en-US", options).format(new Date());
    } catch (error) {
      console.error(`Invalid time zone: ${timeZone}`);
      return "Invalid time zone";
    }
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
