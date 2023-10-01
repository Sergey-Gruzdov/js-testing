const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

document.addEventListener("DOMContentLoaded", function () {
    // Get the button element by its id
    const addTaskbtn = document.getElementById("addTaskbtn");

    // Add a click event listener to the button
    addTaskbtn.addEventListener("click", async function () {
        try {
            // Define the data to send (in this example, an empty JSON object)
            const data = {contents: inputBox.value};

            // Send the POST request using the fetch API
            const response = await fetch("http://localhost:5501/todos/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                },
                body: JSON.stringify(data),
                
            });

            if (response.ok) {
                console.log("POST request successful");
                location.reload();
                // You can perform actions upon a successful POST request here
            } 
            else if (inputBox.value === '') {
               alert("You must write something");
            }
            
            else {
                console.error("POST request failed");
                location.reload();
                // Handle errors here
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });
});

const apiUrl = "http://localhost:5501/todos/";

// Function to fetch and append data to the list
function fetchAndAppendData() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Clear the list
      listContainer.innerHTML = "";
      // Append each item to the list
      data.forEach(item => {
        let li = document.createElement("li");
        li.innerHTML = item.contents;
        li.dataset.id = item.id;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
      });
    })
    .catch(error => console.error("An error occurred:", error));
}

window.addEventListener("load", fetchAndAppendData);

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
    } else if (e.target.tagName === "SPAN") {
      const li = e.target.parentElement;
      const id = li.dataset.id;
      const apiUrl = `http://localhost:5501/todos/${id}/`;
  
      // Make a DELETE request to the API endpoint
      fetch(apiUrl, {
        method: "DELETE"
      })
        .then(response => response.json())
        .then(data => {
          // Remove the list item from the DOM
          li.remove();
        })
        .catch(error => console.error("An error occurred:", error));
    }
  }, false);
