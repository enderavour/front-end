export const handleGoogleLogin = () => {
  window.location.href = `${process.env.REACT_APP_API_URL}/auth/google/login`;
}
