export const saveToStorage = (token: string, userId: number) => {
  localStorage.setItem("token", token);
  localStorage.setItem("userId", String(userId));
};


export const getFromStorage = () => {
  const token = localStorage.getItem("token");
  const expiresAt = localStorage.getItem("expiresAt");
  const userId = localStorage.getItem("userId");

  if (!token || !expiresAt || !userId) return;

  return {
    token,
    expiresAt: Number(expiresAt),
    userId: Number(userId),
    loading: false,
    error: null
  };
};

export const clearStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
}
