import { useEffect, useState } from "react";
import { SIGN_IN } from "../utils/constants";
import { toast } from "@vivekkv178/library";
import { useAppDispatch, useAppSelector } from "@/lib/reduxHooks";
import { onLoginSuccess } from "@/lib/reducers/auth";
import { useRouter } from "next/navigation";
import {
  BE_ROUTES,
  COMMON_CONSTANTS,
  FE_ROUTES,
  HttpMethod,
} from "@/lib/constants";
import useApi from "@/lib/useApi";
import { setCookie } from "cookies-next";

const useCommonState = () => {
  const router = useRouter();
  const [authComponent, setAuthComponent] = useState(SIGN_IN);
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const api = useApi();

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!minLength) {
      return "Password must be at least 8 characters long.";
    } else if (!hasLetter) {
      return "Password must contain at least one letter.";
    } else if (!hasNumber) {
      return "Password must contain at least one number.";
    } else if (!hasSpecialChar) {
      return "Password must contain at least one special character.";
    }
    return ""; // If no errors, return an empty string
  };

  useEffect(() => {
    const error = validatePassword(formData?.password);
    setPasswordError(error);
  }, [formData?.password]);

  const dispatch = useAppDispatch();

  //@todo : apiresponse type to be declared
  const signInHandler = (apiResponse: any) => {
    setCookie(COMMON_CONSTANTS.ACCESS_TOKEN, apiResponse?.access_token);
    dispatch(onLoginSuccess(apiResponse?.access_token));
    router.push(FE_ROUTES.HOME);
  };

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const apiResponse = await api.callApi({
        url: BE_ROUTES.SIGN_UP,
        method: HttpMethod.POST,
        data: formData,
      });
      signInHandler(apiResponse);
      toast({
        title: "Sign Up Successfull. Redirecting to home page.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error while sign Up.",
        description: error?.response?.data?.message || "",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignIn = async () => {
    try {
      setLoading(true);
      const apiResponse = await api.callApi({
        url: BE_ROUTES.SIGN_IN,
        method: HttpMethod.POST,
        data: {
          email: formData?.email,
          password: formData?.password,
        },
      });
      signInHandler(apiResponse);
      toast({
        title: "Sign In Successfull. Redirecting to home page.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error while sign in.",
        description: error?.response?.data?.message || "",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleForgotPassword = () => {};

  return {
    authComponent,
    loading,
    formData,
    passwordError,
    handleChange,
    handleSignUp,
    handleEmailSignIn,
    setAuthComponent,
    handleForgotPassword,
  };
};

export default useCommonState;
