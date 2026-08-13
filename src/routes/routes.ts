export enum AddRoutes
{
  ROOT = "/",
  ABOUT = "/about",
  USERS = "/users",
  COMPANIES = "/companies",
  LOGIN = "/login",
  REGISTER = "/register",
  AUTH_CALLBACK = "auth/callback",
  AUTH_SIGNIN = "/auth/signin"
};

export enum ApiRoutes
{
  USERS_ME = "/users/me"
}

export const RoutePaths = {
  user: (id: number) => `/users/${id}`,
  company: (id: number) => `/companies/${id}`
};
