import React, { createContext, useContext } from "react";
import useCommonState from "../hooks/useCommonState";

type CommonState = {
  // Define the structure of your common state here
  listLoading: boolean;
  refreshHandler: () => void;
  colDefs: any;
  defaultColDef: any;
  gridRef: any;
  rowData: any;
  redirectToDetails: any;
};

type UsersContextType = {
  commonState: CommonState;
};

type UsersProviderProps = {
  children: React.ReactNode;
};

const UsersContext = createContext<UsersContextType | null>(null);

export const UsersProvider: React.FC<UsersProviderProps> = ({ children }) => {
  const commonState = useCommonState(); // Assuming this returns CommonState
  return (
    <UsersContext.Provider value={{ commonState }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsersContext = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsersContext must be used within an UsersProvider");
  }
  return context;
};
