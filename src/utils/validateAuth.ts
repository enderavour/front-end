import { emailRegex, passwordRegex } from "./regex";

export const validateAuthForm = (email: string, password: string) => {
  return {
    emailValid: emailRegex.test(email),
    passwordValid: passwordRegex.test(password)
  }
};
