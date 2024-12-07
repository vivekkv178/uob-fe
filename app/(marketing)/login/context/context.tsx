import React, { Dispatch, createContext, useContext } from "react";
import useCommonState from "../hooks/useCommonState";

type CommonState = {
  // Define the structure of your common state here
  authComponent: string;
  loading: boolean;
  formData: { name: string; email: string; password: string };
  passwordError: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEmailSignIn: () => void;
  handleForgotPassword: () => void;
  handleSignUp: () => void;
  setAuthComponent: Dispatch<React.SetStateAction<string>>;
};

type AuthContextType = {
  commonState: CommonState;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const commonState = useCommonState(); // Assuming this returns CommonState
  return (
    <AuthContext.Provider value={{ commonState }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
