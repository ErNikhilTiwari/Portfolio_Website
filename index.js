const form = document.getElementById("form");

// errorMsg function
function errorMsg(input, msg) {
    const form_control = input.parentElement;
    form_control.className = "contact-form-field error";
    const small = form_control.querySelector("small");
    small.innerText = msg;
}

// successMsg function
function successMsg(input, msg) {
    const form_control = input.parentElement;
    form_control.className = "contact-form-field success";
    const small = form_control.querySelector("small");
    small.innerText = msg;
}

// event Listner
form.addEventListener("submit", function (event) {

    let isValid = false;
    event.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");


    // validation for name
    if (name.value.trim() === "") {
        errorMsg(name, "Name can't be empty");
        isValid = false;

    }
    else if (name.value.trim().length < 3) {
        errorMsg(name, "Name must be at least 3 characters");
        isValid = false;
    }
    else if (!/^[A-Za-z\s]+$/.test(name.value.trim())) {
        errorMsg(name, "Name can only contain letters and spaces");
        isValid = false;
    }
    else if (name.value.trim().length > 30) {
        errorMsg(name, "Name must be less than 30 letters");
        isValid = false;
    }
    else {
        successMsg(name, "Name is Valid");
        isValid = true;
    }


    // validation for email
    if (email.value.trim() === "") {
        errorMsg(email, "Email can't be empty");
        isValid = false;
    }
    else if (email.value.trim().length < 7) {
        errorMsg(email, "Email must be at least 7 characters");
        isValid = false;
    }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        errorMsg(email, "Invalid email address");
        isValid = false;
    }
    else if (email.value.trim().length > 30) {
        errorMsg(email, "Email must be less than 30 characters");
        isValid = false;
    }
    else {
        successMsg(email, "Email is Valid");
        isValid = true;
    }


    // validation for textarea
    const wordCount = message.value.trim().split(/\s+/).length;

    if (message.value.trim().length === 0) {
        errorMsg(message, "Message can't be empty");
        isValid = false;
    }
    else if (message.value.trim().length < 10) { // Minimum length of 10 characters
        errorMsg(message, "Message can't be too small");
        isValid = false;
    }
    else if (!/^[A-Za-z0-9.,\s!?]*$/.test(message.value.trim())) { // Allowed characters (letters, numbers, punctuation, spaces)
        errorMsg(message, "Message is Invalid");
        isValid = false;
    }
    else if (wordCount > 300) { // Maximum word count (e.g., 300 words)
        errorMsg(message, "Message can't be that big");
        isValid = false;
    }
    else {
        successMsg(message, "Message is Valid");
        isValid = true;
    }

    if (isValid) {
        sendEmail();
    }

})


function sendEmail() {
    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "iknowmyself@gmail.com",
        Password: "amitmeraNameha",
        To: 'hey.amit0162@gmail.com',
        From: document.getElementById("email").value,
        Subject: "Someone has sent a message",
        Body: "Name : " + document.getElementById("name").value +
            " <br> Email : " + document.getElementById("email").value +
            " <br> Message : " + document.getElementById("message").value
    }).then(
        () => alert("Form submitted successfully")
    );
}
