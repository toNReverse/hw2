function checkName(event) {
    const input = event.currentTarget;
    
    if (formStatus[input.name] = input.value.length > 0) {
        input.parentNode.classList.remove('errorj');
    } else {
        input.parentNode.classList.add('errorj');
    }
}

function jsonCheckEmail(json) {
    if (formStatus.email = !json.exists) {
        document.querySelector('.email').classList.remove('errorj');
    } else {
        document.querySelector('.email span').textContent = "Email già utilizzata";
        document.querySelector('.email').classList.add('errorj');
    }
}

function checkEmail(event) {
    const input = event.currentTarget;
    const email = input.value.trim().toLowerCase();
    // Regex per validare il formato email (Trova tutte le parole o sequenze di caratteri che rispettano questo schema)
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if (emailRegex.test(email)) {   // verifica se rispetta il regex
        formStatus.email = true;
        input.parentNode.classList.remove('errorj');
    } else {
        formStatus.email = false;
        input.parentNode.classList.add('errorj');
    }
    }

function checkPassword(event) {
    const passwordInput = document.querySelector('.password input');
    if (formStatus.password = passwordInput.value.length >= 8) {
        document.querySelector('.password').classList.remove('errorj');
    } else {
        document.querySelector('.password').classList.add('errorj');
    }

}

function checkConfirmPassword(event) {
    const confirmPasswordInput = document.querySelector('.confirm_password input');
    if (formStatus.confirmPassword = confirmPasswordInput.value === document.querySelector('.password input').value) {
        document.querySelector('.confirm_password').classList.remove('errorj');
    } else {
        document.querySelector('.confirm_password').classList.add('errorj');
    }
}

function checkSignup(event) {
    const checkbox = document.querySelector('.allow input');
    formStatus[checkbox.name] = checkbox.checked;
  
    const requiredFields = ['upload', 'name', 'email', 'password', 'confirmPassword', 'allow'];
  
    for (let field of requiredFields) {
      if (!formStatus[field]) {
        event.preventDefault();
        return; // ferma la sottomissione al primo errore trovato
      }
    }
}

const formStatus = {'upload': true};    // per tracciare lo stato di validazione di ogni campo
document.querySelector('.name input').addEventListener('blur', checkName);
document.querySelector('.email input').addEventListener('blur', checkEmail);
document.querySelector('.password input').addEventListener('blur', checkPassword);
document.querySelector('.confirm_password input').addEventListener('blur', checkConfirmPassword);
document.querySelector('form').addEventListener('submit', checkSignup);