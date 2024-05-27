document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    form.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent the form from submitting normally
  
      // Perform form validation here
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;
  
      if (name && email && message) {
        // All fields are filled, proceed with submission
        alert("Thank you for contacting us!");
        form.reset();
      } else {
        // Some fields are empty, show an error message or handle it as needed
        alert("Please fill in all fields.");
      }
    });
  });