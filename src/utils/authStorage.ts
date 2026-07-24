export const setToStorage = (token: string, expiresAt: number) => {
  localStorage.setItem("token", token);
  localStorage.setItem("expiresAt", String(expiresAt));
};


export const getFromStorage = () => {
  const token = localStorage.getItem("token");
  const expiresAt = localStorage.getItem("expiresAt");

  if (!token || !expiresAt) return;

  return {
    token,
    expiresAt: Number(expiresAt)
  };
};

export const clearStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiresAt");
}
