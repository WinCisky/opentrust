import { validateRegistrationForm } from './register'
import { validateLoginForm } from './login'


document.querySelector('#loginForm')?.addEventListener('click', validateLoginForm);
document.querySelector('#registrationForm')?.addEventListener('click', validateRegistrationForm);