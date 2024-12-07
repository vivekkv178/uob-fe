import React from "react";
import { Button } from "@vivekkv178/library";
import { Input } from "@vivekkv178/library";
import { Label } from "@vivekkv178/library";
import { Icon } from "@iconify/react";
import { useAuthContext } from "../context/context";
import { SIGN_IN } from "../utils/constants";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@vivekkv178/library";

export default function SignUp() {
  const { commonState } = useAuthContext();
  const { loading, formData, passwordError, handleSignUp, handleChange } =
    commonState;
  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <p className="text-balance text-muted-foreground">
          Enter your email below to create your account
        </p>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="name"
            placeholder="Test"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>
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
          <div className="tw-flex tw-align-middle">
            <Label htmlFor="password">Password</Label>
            <Popover>
              <PopoverTrigger className="ml-auto">
                <Badge
                  variant="outline"
                  className="ml-auto h-6 w-6 shrink-0 items-center justify-center rounded-full"
                >
                  ?
                </Badge>
              </PopoverTrigger>
              <PopoverContent>
                <ul className="tw-ml-2 tw-list-disc">
                  <b>Password requirements:</b>
                  <li> Minimum length of 8 characters </li>
                  <li> Contains at least 1 letter. </li>
                  <li> Contains at least 1 number. </li>
                  <li> Contains at least 1 special character.</li>
                </ul>
              </PopoverContent>
            </Popover>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
          {formData.password && passwordError ? (
            <div className="tw-text-red-500">{passwordError}</div>
          ) : null}
        </div>
        <Button className="w-full" onClick={handleSignUp}>
          {loading ? (
            <Icon
              icon="lucide:loader-circle"
              className="h-6 w-6 animate-spin"
            />
          ) : (
            "Create Account"
          )}
        </Button>
        {/* <Button variant="outline" className="w-full" onClick={handleSignIn}>
          <Icon icon="logos:google-icon" className="h-4 w-4 mr-2" />
          Sign Up with Google
        </Button> */}
      </div>
      <div className="mt-4 text-center text-sm">
        Already have an account?
        <span
          // href="#"
          className="ml-2 underline cursor-pointer"
          onClick={() => commonState.setAuthComponent(SIGN_IN)}
        >
          Sign in
        </span>
      </div>
    </div>
  );
}
