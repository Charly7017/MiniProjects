const buttonRegister = document.querySelector('.register__button');
const inputUsername = document.querySelector('#userNameInput');
const inputEmail = document.querySelector('#emailInput');
const inputPassword = document.querySelector('#passwordInput');
const inputConfirmPassword = document.querySelector('#confirmPasswordInput');

buttonRegister.addEventListener('click', function (event) {
    let isValidUserName = validateUserName(inputUsername);
    let isValidEmail = validateEmail(inputEmail);
    let isValidPassword = validatePassword(inputPassword);
    let isValidConfirmPassword = validateConfirmPassword(inputConfirmPassword);

    if(isValidUserName && isValidEmail && isValidPassword && isValidConfirmPassword){
        alert("Registration successful!");
        location.reload();
    }
});

function validateUserName(username) {
    if (validateEmpty(username, '#userNameError', 'Username is required')) {
        putColorBorders(username,'red');
        return false;
    }

    if (username.value.trim().length < 3) {
        document.querySelector('#userNameError').textContent = 'Username must be at least 3 characters';
        putColorBorders(username,'red');
        return false;
    }

    document.querySelector('#userNameError').textContent = '';
    putColorBorders(username,'green');
    return true;
}

function validateEmail(email) {
    if (validateEmpty(email, '#emailError', 'Email is required')) {
        putColorBorders(email,'red');
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.value.trim())) {
        document.querySelector('#emailError').textContent = 'Email is not valid';
        putColorBorders(email,'red');
        return false;
    }

    document.querySelector('#emailError').textContent = '';
    putColorBorders(email,'green');
    return true;
}

function validatePassword(password) {
    if (validateEmpty(password, '#passwordError', 'Password is required')) {
        putColorBorders(password,'red');
        return false;
    }

    if (password.value.trim().length < 6) {
        document.querySelector('#passwordError').textContent = 'Password must be at least 6 characters';
        putColorBorders(password,'red');
        return false;
    }

    document.querySelector('#passwordError').textContent = '';
    putColorBorders(password,'green');
    return true;
}

function validateConfirmPassword(confirmPassword) {
    if (validateEmpty(confirmPassword, '#confirmPasswordError', 'Confirm Password is required')) {
        putColorBorders(confirmPassword,'red');
        return false;
    }

    if (inputPassword.value.trim() !== confirmPassword.value.trim()) {
        document.querySelector('#confirmPasswordError').textContent = 'Passwords do not match';
        putColorBorders(confirmPassword,'red');
        return false;
    }

    document.querySelector('#confirmPasswordError').textContent = '';
    putColorBorders(confirmPassword,'green');
    return true;
}

function validateEmpty(input, errorElementId, errorMessage) {
    if(input.value.trim() === '') {
        document.querySelector(errorElementId).textContent = errorMessage;
        return true;
    }
    return false;
}

function putColorBorders(input,color){
    input.style.border = `2px solid ${color}`;
}