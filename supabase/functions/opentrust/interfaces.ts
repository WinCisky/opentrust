export interface RegistrationCredentials {
  recaptcha: string;
  email: string;
}

export interface LoginCredentials {
  recaptcha: string;
  email: string;
  hashedPassword: string;
}
