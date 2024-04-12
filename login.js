let signupBtn = document.getElementById("signupBtn");
let signinBtn = document.getElementById("signinBtn");
let namefield = document.getElementById("namefield");
let title = document.getElementById("title");

let signupClicked = false;// Track if Sign Up button has been clicked
// Initially, hide the name field for Sign Up.
namefield.style.maxHeight = "0";
// Initially, disable the "Sign Up" button.
signupBtn.disabled = false;

signinBtn.onclick = function () {
    const email = $("#emailInputField").val();
    const password = $("#passwordInputField").val();

    if (!email || !password) {
        // Check if email or password is empty and display an error message
        alert("Email and password are required.");
        return; // Stop the execution if fields are empty
    }

    namefield.style.maxHeight = "0";
    title.innerHTML = "Sign In";
    signupBtn.classList.add("disable");
    signinBtn.classList.remove("disable");

    var settings = {
        "url": "http://localhost:3000/login",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "email": email,
            "password": password
        }),
    };

    $.ajax(settings).done(function (response) {
        if (response.UserName && response.Email) {
            // Redirect to index.html
            $("#user-name").text(response.UserName);
            console.log(response.ID);
            // Store the username in localStorage
            sessionStorage.setItem("username", response.UserName);
            sessionStorage.setItem("userId", response.ID);
            window.location.href = "index.html";
        } else {
            // Handle login failure, e.g., show an error message
            console.log("Login failed");
        }
    });
}

signupBtn.onclick = function () {
    if (!signupClicked) {
        // On the first click, show the name field and enable the "Sign Up" button.
        namefield.style.maxHeight = "60px";
        title.innerHTML = "Sign Up";
        signupClicked = true;

        //Clear all field details so that after successfull entry it should not be visible
        $('#passwordInputField').val('');
        $('#userNameInputField').val('');
        $('#emailInputField').val('');
    }
    else {
        // On the second click, perform the sign-up logic.

        const name = $("#userNameInputField").val();
        const email = $("#emailInputField").val();
        const password = $("#passwordInputField").val();
        if (!name || !email || !password) {
            // Check if any of the fields are empty and display an error message.
            //alert("Name, email, and password are required.");
            signupMessage.textContent = 'Name, email, and password are required.';
            signupMessage.style.color = 'red'; // Style the error message
            return; // Stop the execution if fields are empty.
        }
        var settings = {
            "url": "http://localhost:3000/signup",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "name": name,
                "email": email,
                "password": password
            }),
        };


        $.ajax(settings).done(function (response) {
            // Reset signupClicked to false after successful signup.
            signupClicked = false;

            // Reset the UI if needed.
            namefield.style.maxHeight = "0"; // Hide the name field.

            // Re-enable the button after the signup is complete.
            signupBtn.disabled = false;

            // Check if the signup was successful before clearing the password field
            if (response === 'Signup successful') {
                // Clear the password input field
                $('#passwordInputField').val('');
                signupMessage.textContent = 'Signup successful!';

                // You can also style the message element to make it more visible
                signupMessage.style.color = 'green'; // For example, set the text color to green
            }
            else {
                // Set an error message if the signup failed
                signupMessage.textContent = 'Signup failed. Please try again.';
                signupMessage.style.color = 'red'; // Style the error message
            }

        }).fail(function (xhr, status, error) {
            if (xhr.status === 409) {
                // Handle the 409 (Conflict) status code
                signupMessage.textContent = 'Email is already in use.';
                signupMessage.style.color = 'red'; // Style the error message
            }
        });

    }
}
