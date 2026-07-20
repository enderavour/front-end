export const saveAuth = (token: string, expiresAt: number, userId: number) => {
  localStorage.setItem("token", token);
  localStorage.setItem("expiresAt", String(expiresAt));
  localStorage.setItem("userId", String(userId));
};


export const loadAuth = () => {
  const token = localStorage.getItem("token");
  const expiresAt = localStorage.getItem("expiresAt");
  const userId = localStorage.getItem("userId");

  if (!token || !expiresAt || !userId) return;

  return {
    token,
    expiresAt: Number(expiresAt),
    userId: Number(userId)
  };
};

export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiresAt");
}
