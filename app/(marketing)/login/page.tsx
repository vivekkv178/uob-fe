"use client";
import React from "react";
import { AuthProvider, useAuthContext } from "./context/context";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Forgot from "./components/Forgot";
import { FORGOT, SIGN_IN, SIGN_UP } from "./utils/constants";
import { Toaster } from "@vivekkv178/library";

const Auth = () => {
  const { commonState } = useAuthContext();

  const getImageUrl = () => {
    const auth = commonState?.authComponent;
    const name =
      auth === SIGN_IN
        ? "Login"
        : auth === SIGN_UP
          ? "Sign_Up"
          : "Forgot_Password";
    return `https://raw.githubusercontent.com/vivekkv178/cdn/main/library/${name}.png`;
  };

  return (
    <div className="w-full lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        {commonState?.authComponent === SIGN_IN && <SignIn />}
        {commonState?.authComponent === SIGN_UP && <SignUp />}
        {commonState?.authComponent === FORGOT && <Forgot />}
      </div>
      <div className="hidden bg-muted lg:block">
        <img src={getImageUrl()} alt="Image" className="h-screen w-full" />
      </div>
    </div>
  );
};

const AuthPage = () => {
  return (
    <>
      <AuthProvider>
        <Auth />
        <Toaster />
      </AuthProvider>
    </>
  );
};

export default AuthPage;
