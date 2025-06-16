const passwordInput = document.getElementById("password");
const strengthMeter = document.getElementById("strength-meter-fill");
const strengthText = document.getElementById("strength-text");

const lengthReq = document.getElementById("length").querySelector('span:first-child');
const uppercaseReq = document.getElementById("uppercase").querySelector('span:first-child');        
const lowercaseReq = document.getElementById("lowercase").querySelector('span:first-child');
const numberReq = document.getElementById("number").querySelector('span:first-child');
const specialCharReq = document.getElementById("special").querySelector('span:first-child');

const lengthRegex = /(?=).{8,}/;
const uppercaseRegex = /(?=.*[A-Z])/;
const lowercaseRegex = /(?=.*[a-z])/;
const numberRegex = /(?=.*[0-9])/;
const specialCharRegex = /(?=.*[!@#$%^&*])/;

passwordInput.addEventListener("input", updateStrengthMeter);

function updateStrengthMeter() {
    const password = passwordInput.value;
    let strength = 0;
    const requirements = [
        {regex: lengthRegex, element: lengthReq},
        {regex: uppercaseRegex, element: uppercaseReq}, 
        {regex: lowercaseRegex, element: lowercaseReq},
        {regex: numberRegex, element: numberReq},
        {regex: specialCharRegex, element: specialCharReq}
    ]

    requirements.forEach(req => {
        const isValid = req.regex.test(password);
        if (isValid) {
            strength += 20;
            req.element.className="check-icon";
            req.element.textContent = "✓";
            
        } else {
            req.element.className="X-icon";
            req.element.textContent = "✗";
        }
    });

strengthMeter.style.width = `${strength}%`;
if(strength===0){
    strengthText.textContent = "No password entered";
    strengthMeter.style.backgroundColor = '#e0e0e0';
} else if (strength < 30) {
    strengthText.textContent = "Very Weak";
    strengthMeter.style.backgroundColor = '#ff4d4d';
}else if (strength < 50) {
    strengthText.textContent = "Weak";
    strengthMeter.style.backgroundColor = '#ffA64D';
}else if (strength < 70) {
    strengthText.textContent = "Medium";
    strengthMeter.style.backgroundColor = '#ffff4d';
}else if (strength < 90) {
    strengthText.textContent = "Strong";
    strengthMeter.style.backgroundColor = '#A3ff4d';
}else{
    strengthText.textContent = "Very Strong";
    strengthMeter.style.backgroundColor = '#4dffff';
}
}

function togglePasswordVisibility() {
    if(passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
}
updateStrengthMeter();