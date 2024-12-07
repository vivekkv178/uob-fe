import React, { createContext, SetStateAction, useContext } from "react";
import useCommonState from "../hooks/useCommonState";

type CommonState = {
  // Define the structure of your common state here
  listLoading: boolean;
  summary: any;
  selectedAccountType: any;
  setselectedAccountType: any;
  getAccountInfo: any;
};

type ComponentContextType = {
  commonState: CommonState;
};

type ComponentProviderProps = {
  children: React.ReactNode;
};

const ComponentContext = createContext<ComponentContextType | null>(null);

export const ComponentProvider: React.FC<ComponentProviderProps> = ({
  children,
}) => {
  const commonState = useCommonState(); // Assuming this returns CommonState
  return (
    <ComponentContext.Provider value={{ commonState }}>
      {children}
    </ComponentContext.Provider>
  );
};

export const useComponentContext = () => {
  const context = useContext(ComponentContext);
  if (!context) {
    throw new Error(
      "useComponentContext must be used within an ComponentProvider",
    );
  }
  return context;
};
