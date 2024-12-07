import React from "react";
import { Icon } from "@iconify/react";
import { Button } from "@vivekkv178/library";
import { Input } from "@vivekkv178/library";
import { Label } from "@vivekkv178/library";
import { useAuthContext } from "../context/context";
import { SIGN_IN } from "../utils/constants";

export default function Forgot() {
  const { commonState } = useAuthContext();
  const { loading, formData, handleChange, handleForgotPassword } = commonState;
  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Forgot password?</h1>
        <p className="text-balance text-muted-foreground">
          Enter your email below to reset your password.
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
        <Button className="w-full" onClick={handleForgotPassword}>
          {loading ? (
            <Icon
              icon="lucide:loader-circle"
              className="h-6 w-6 animate-spin"
            />
          ) : (
            "Forgot Password"
          )}
        </Button>
      </div>
      <div className="mt-4 text-center text-sm">
        Remember your password?
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
