import { validateRegistrationForm } from './register'
import { validateLoginForm } from './login'


document.querySelector('#loginForm')?.addEventListener('submit', validateLoginForm);
document.querySelector('#registrationForm')?.addEventListener('submit', validateRegistrationForm);