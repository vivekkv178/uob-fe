"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { onLoginSuccess } from "@/lib/reducers/auth";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/reduxHooks";
import { useRouter } from "next/navigation";
import { COMMON_CONSTANTS, FE_ROUTES } from "@/lib/constants";
import { getCookie } from "cookies-next";

const Layout = (props: any) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const checkUser = async () => {
    const accessToken: any = getCookie(COMMON_CONSTANTS.ACCESS_TOKEN);
    if (accessToken) dispatch(onLoginSuccess(accessToken));
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  );
};

export default Layout;
