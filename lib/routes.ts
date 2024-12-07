import { FE_ROUTES, ROLES, Route } from "./constants";

export const routes: Route[] = [
  {
    icon: "lucide:home",
    path: FE_ROUTES.HOME,
    title: "Home",
    role: ROLES.USER,
  },
  {
    customClick: true,
    icon: "lucide:users-round",
    path: FE_ROUTES.MANAGE_ACCOUNTS,
    title: "Manage Accounts",
    role: ROLES.ADMIN,
  },
  {
    icon: "lucide:rotate-3d",
    path: FE_ROUTES.TRANSFER,
    title: "Transfer",
    role: ROLES.USER,
  },
];
