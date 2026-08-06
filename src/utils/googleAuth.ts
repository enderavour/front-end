export const handleGoogleLogin = () => {
  window.location.href = process.env.GOOGLE_AUTH_LOGIN_URL ?? "";
}
