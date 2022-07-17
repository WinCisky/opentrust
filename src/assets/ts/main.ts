import { validateRegistrationForm } from './register'
import { validateLoginForm } from './login'
import { logInSubmitted } from './test'


document.querySelector('#loginForm')?.addEventListener('submit', validateLoginForm);
document.querySelector('#registrationForm')?.addEventListener('submit', validateRegistrationForm);
document.querySelector('#testForm')?.addEventListener('submit', logInSubmitted);