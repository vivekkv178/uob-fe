"use client";

import React from "react";

import { UsersProvider, useUsersContext } from "./context/context";
import { Loader2 } from "lucide-react";
import { useAppSelector } from "@/lib/reduxHooks";
import { RBAC_EDIT, ROLES } from "@/lib/constants";
import { AgGridReact } from "ag-grid-react";
import { themeQuartz } from "@ag-grid-community/theming";

// to use myTheme in an application, pass it to the theme grid option
const myTheme = themeQuartz.withParams({
  accentColor: "#212130",
  // backgroundColor: "#FEF9F5",
  browserColorScheme: "light",
  foregroundColor: "#212130",
  headerBackgroundColor: "#e6e9ed",
  headerFontSize: 14,
  headerTextColor: "#212130",
});

function Users() {
  const { commonState } = useUsersContext();
  const authState = useAppSelector((state) => state.auth);
  const userRole: ROLES = authState?.user?.role ?? ROLES.USER;
  const editableRoles = RBAC_EDIT[userRole];

  return (
    <>
      {commonState?.listLoading || !authState?.user ? (
        <div className="tw-grid tw-place-items-center">
          <Loader2 className="tw-h-12 tw-w-12 tw-animate-spin" />
        </div>
      ) : (
        <>
          <div className="tw-text-center tw-text-xl tw-font-bold">{`Accounts in the Organization.`}</div>
          <AgGridReact
            theme={myTheme}
            defaultColDef={commonState?.defaultColDef}
            ref={commonState?.gridRef}
            // onGridReady={(params) => {}}
            rowData={commonState?.rowData}
            columnDefs={commonState?.colDefs}
            pagination={true}
            onRowDoubleClicked={(params) =>
              commonState?.redirectToDetails(params)
            }
          />
        </>
      )}
    </>
  );
}

const ManageUsers = () => {
  return (
    <UsersProvider>
      <Users />
    </UsersProvider>
  );
};

export default ManageUsers;
