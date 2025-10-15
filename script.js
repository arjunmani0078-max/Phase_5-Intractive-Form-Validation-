const form = document.getElementById('registrationForm');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');

// --- Helper Functions to Show Validation State ---

// Function to show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Function to show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// --- Validation Functions ---

function checkUsername(input) {
    if (input.value.trim() === '') {
        showError(input, 'Username is required.');
        return false;
    } else if (input.value.length < 3) {
        showError(input, 'Username must be at least 3 characters.');
        return false;
    } else {
        showSuccess(input);
        return true;
    }
}

function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (input.value.trim() === '') {
        showError(input, 'Email is required.');
        return false;
    } else if (!re.test(input.value.trim().toLowerCase())) {
        showError(input, 'Email is not valid.');
        return false;
    } else {
        showSuccess(input);
        return true;
    }
}

function checkPassword(input) {
    // Password must be at least 8 characters and contain at least one number
    const re = /^(?=.*\d).{8,}$/; 
    if (input.value.trim() === '') {
        showError(input, 'Password is required.');
        return false;
    } else if (!re.test(input.value.trim())) {
        showError(input, 'Password must be 8+ chars and include a number.');
        return false;
    } else {
        showSuccess(input);
        return true;
    }
}

// --- Event Listeners for Real-Time Validation ---

// 1. Validate on user input (Keyup event)
username.addEventListener('keyup', () => checkUsername(username));
email.addEventListener('keyup', () => checkEmail(email));
password.addEventListener('keyup', () => checkPassword(password));

// 2. Final validation on form submission
form.addEventListener('submit', function(e) {
    e.preventDefault(); // Stop the form from submitting normally

    // Run all validation checks
    const isUsernameValid = checkUsername(username);
    const isEmailValid = checkEmail(email);
    const isPasswordValid = checkPassword(password);

    // If all checks pass, the form is valid
    if (isUsernameValid && isEmailValid && isPasswordValid) {
        alert('Form submitted successfully! (All fields are valid)');
        // In a real application, you would submit the data here
    }
});