export const FE_ROUTES = {
  ROOT: "/",
  LOGIN: "/login",
  HOME: "/home",
  MANAGE_ACCOUNTS: "/accounts",
  TRANSFER: "/transfer",
};

export const BE_ROUTES = {
  GET_USERS: "/v1/config/user",
  GET_USER: "/v1/config/user/{email}",
  CREATE_USER: "/v1/config/user",
  UPDATE_USER: "/v1/config/user",
  DELETE_USER: "/v1/config/user/{email}",
  SIGN_UP: "/v1/auth/sign-up",
  SIGN_IN: "/v1/auth/sign-in",
};

export enum ROLES {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
}

export const RBAC_ROUTES = {
  [ROLES.USER]: [ROLES.USER, ROLES.ADMIN, ROLES.SUPER_ADMIN],
  [ROLES.ADMIN]: [ROLES.ADMIN, ROLES.SUPER_ADMIN],
  [ROLES.SUPER_ADMIN]: [ROLES.SUPER_ADMIN],
};

export const RBAC_EDIT = {
  [ROLES.SUPER_ADMIN]: [ROLES.USER, ROLES.ADMIN, ROLES.SUPER_ADMIN],
  [ROLES.ADMIN]: [ROLES.ADMIN, ROLES.USER],
  [ROLES.USER]: [ROLES.USER],
};

export type Route = {
  icon: string;
  path: string;
  title: string;
  role: ROLES;
  customClick?: boolean;
  badge?: number;
};

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
  OPTIONS = "OPTIONS",
  HEAD = "HEAD",
}

export const COMMON_CONSTANTS = {
  ACCESS_TOKEN: "accessToken",
};
