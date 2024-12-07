"use client";
import Link from "next/link";
import useAppLayoutState from "./useAppLayoutState";
import { AppLayout } from "@vivekkv178/library";
import { useAppSelector } from "@/lib/reduxHooks";
import { Toaster } from "@vivekkv178/library";

const Layout = (props: any) => {
  const { appRoutes, providerData, handleLogout } = useAppLayoutState();

  const authState = useAppSelector((state) => state.auth);

  return (
    <AppLayout
      NavigationComponent={Link}
      navbarProps={{
        navs: appRoutes,
      }}
      profileProps={{
        email: authState?.user?.email,
        name: providerData?.displayName,
        userImage: providerData?.photoURL,
        logoutHandler: handleLogout,
      }}
      sidebarProps={{
        logo: `${process.env.NEXT_PUBLIC_CDN_PATH}/uob/Logo.png`,
        logoStyles: "tw-h-[50px] tw-w-3/4",
      }}
    >
      {props.children}
      <Toaster />
    </AppLayout>
  );
};

export default Layout;
