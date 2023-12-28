// Email

const email = document.getElementById("emailInput")
const emailError = document.getElementById("emailError")

function checkEmail () {
    if (email.validity.valueMissing) {
        emailError.textContent = "Enter an email address"
    } else if (email.validity.typeMismatch) {
        emailError.textContent = "Enter a valid email address"
    } else if (email.validity.tooShort) {
        emailError.textContent = "Email is too short"
    }
    emailError.className = "error active"
}

email.addEventListener("input", () => {
    if (email.validity.valid) {
        emailError.textContent = ""
        emailError.className = "error"
    } else {
        checkEmail()
    }
})


// Zip

function checkZip() {
    const constraints = {
        ch: [
            "^(CH-)?\\d{4}$",
            "Switzerland ZIPs must have exactly 4 digits: e.g. CH-1950 or 1950"
        ],
        fr: [
            "^(F-)?\\d{5}$",
            "France ZIPs must have exactly 5 digits: e.g. F-75012 or 75012"
        ],
        de: [
            "^(D-)?\\d{5}$",
            "Germany ZIPs must have exactly 5 digits: e.g. D-12345 or 12345",
        ],
        nl: [
          "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
          "Netherland ZIPs must have exactly 4 digits, followed by 2 letters except SA, SD and SS",
        ],
    };

    const country = document.getElementById("country").value
    const zipField = document.getElementById("zipCode")

    const constraint = new RegExp(constraints[country][0], "");

    if (constraint.test(zipField.value)) {
        zipField.setCustomValidity("");
    } else {
        zipField.setCustomValidity(constraints[country][1]);
    }
}
window.onload = () => {
    document.getElementById("country").onchange = checkZip
    document.getElementById("zipCode").onchange = checkZip
}

// Password

function checkPassword(password) {
    const minLength = 8
    const hasLetter = /[a-zA-Z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)

    return (
        password.length >= minLength && hasLetter && hasNumber && hasSpecialChar
    )
}

document.getElementById("password").addEventListener("input", function() {
    const password = this.value
    const isValid = checkPassword(password)

    this.setCustomValidity(
        isValid ? "" : "Password is wrong"
    )
})

// Confirm Password

document.getElementById("passwordConfirm").addEventListener("input", function() {
    const confirmPassword = this.value

    if (confirmPassword === document.getElementById("password").value) {
        this.setCustomValidity("")
    } else {
        this.setCustomValidity("Password aren't the same")
    }
})

