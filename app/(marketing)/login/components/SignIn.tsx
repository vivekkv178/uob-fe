import React from "react";
import { Button } from "@vivekkv178/library";
import { Input } from "@vivekkv178/library";
import { Label } from "@vivekkv178/library";
import { Icon } from "@iconify/react";
import { useAuthContext } from "../context/context";
import { FORGOT, SIGN_UP } from "../utils/constants";

const SignIn = () => {
  const { commonState } = useAuthContext();
  const { loading, formData, handleChange, handleEmailSignIn } = commonState;
  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-balance text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="test@example.com"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            {/* <div
              className="ml-auto inline-block text-sm underline cursor-pointer"
              onClick={() => commonState.setAuthComponent(FORGOT)}
            >
              Forgot your password?
            </div> */}
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <Button className="w-full" onClick={handleEmailSignIn}>
          {loading ? (
            <Icon
              icon="lucide:loader-circle"
              className="h-6 w-6 animate-spin"
            />
          ) : (
            "Login"
          )}
        </Button>
        {/* <Button variant="outline" className="w-full" onClick={handleSignIn}>
          <Icon icon="logos:google-icon" className="h-4 w-4 mr-2" />
          Login with Google
        </Button> */}
      </div>
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?
        <span
          // href="#"
          className="ml-2 underline cursor-pointer"
          onClick={() => commonState.setAuthComponent(SIGN_UP)}
        >
          Sign up
        </span>
      </div>
    </div>
  );
};

export default SignIn;
