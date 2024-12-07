import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { jwtDecode } from "jwt-decode";

// Define a type for the slice state
export interface AuthState {
  user: any;
  logout: boolean;
}

// Define the initial state using that type
const initialState: AuthState = {
  user: null,
  logout: false,
};

export const AuthSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    onLoginSuccess: (state, action: PayloadAction<any>) => {
      const decodedToken: any = jwtDecode(action?.payload);
      state.user = {
        email: decodedToken?.email,
        role: decodedToken?.role,
        providerData: [
          {
            displayName: null,
            email: decodedToken?.email,
            phoneNumber: null,
            photoURL: null,
            providerId: "password",
            uid: decodedToken?.user_sub,
          },
        ],
      };
    },
    onLogout: (state) => {
      state.logout = true;
      state.user = null;
    },
  },
});

export const { onLoginSuccess, onLogout } = AuthSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.auth.user;

export default AuthSlice.reducer;
