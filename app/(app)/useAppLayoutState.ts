import {
  COMMON_CONSTANTS,
  RBAC_ROUTES,
  ROLES,
  Route,
} from "./../../lib/constants";
import { useEffect, useState } from "react";
import { onLoginSuccess, onLogout } from "@/lib/reducers/auth";
import { FE_ROUTES } from "@/lib/constants";
import { routes } from "@/lib/routes";

import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/reduxHooks";
import { deleteCookie, getCookie } from "cookies-next";

const useAppLayoutState = () => {
  const authState = useAppSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [appRoutes, setAppRoutes] = useState<Route[]>([]);

  const getUserRole = () => {
    const role = authState?.user?.role;
    /* Role in the Backend can be anything. Hence handling it once again in FE */
    if (role === ROLES.SUPER_ADMIN) {
      return ROLES.SUPER_ADMIN;
    } else if (role === ROLES.ADMIN) {
      return ROLES.ADMIN;
    } else {
      return ROLES.USER;
    }
  };

  const filterRoutes = () => {
    const userRole = getUserRole();
    // Use the userRole only if it's defined
    if (userRole) {
      const appRoutes: Route[] = routes.filter((route) => {
        return RBAC_ROUTES[route.role].includes(userRole);
      });
      setAppRoutes(appRoutes);
    }
  };

  useEffect(() => {
    filterRoutes();
  }, [authState?.user]);

  const handleLogout = async () => {
    deleteCookie(COMMON_CONSTANTS.ACCESS_TOKEN);
    dispatch(onLogout());
    router.push(FE_ROUTES.LOGIN);
  };

  const checkUser = async () => {
    const accessToken: any = getCookie(COMMON_CONSTANTS.ACCESS_TOKEN);
    if (accessToken) dispatch(onLoginSuccess(accessToken));
    else router.push(FE_ROUTES.LOGIN);
  };

  useEffect(() => {
    checkUser();
  }, []);

  const providerData = authState?.user?.providerData
    ? authState?.user?.providerData[0]
    : null;

  return {
    appRoutes,
    providerData,
    handleLogout,
  };
};

export default useAppLayoutState;
