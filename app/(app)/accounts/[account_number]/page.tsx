"use client";
import React from "react";

import { ComponentProvider, useComponentContext } from "./context/context";
import { Icon } from "@iconify/react";
import { useAppSelector } from "@/lib/reduxHooks";
import { Summary } from "./components/Summary";

function Home(props: any) {
  const { commonState } = useComponentContext();
  const authState = useAppSelector((state) => state.auth);

  return (
    <>
      {commonState?.listLoading || !authState?.user ? (
        <div className="tw-grid tw-place-items-center">
          <Icon
            icon="lucide:loader-circle"
            className="tw-h-12 tw-w-12 tw-animate-spin"
          />
        </div>
      ) : (
        <>
          <div className="tw-text-center tw-text-xl tw-font-bold">{`Please find the details of the Account ${props.account_number} below:`}</div>
          <Summary />
        </>
      )}
    </>
  );
}

const Manage = ({ params }: { params: { account_number: string } }) => {
  return (
    <ComponentProvider>
      <Home account_number={params?.account_number} />
    </ComponentProvider>
  );
};

export default Manage;
