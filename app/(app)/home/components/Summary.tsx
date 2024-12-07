import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SUMMARY_CONSTANTS } from "../utils/constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from "@vivekkv178/library";
import { useComponentContext } from "../context/context";

export const Summary = () => {
  const { commonState } = useComponentContext();

  return (
    <Tabs
      defaultValue={commonState?.selectedAccountType}
      onValueChange={commonState?.setselectedAccountType}
    >
      <TabsList>
        <TabsTrigger
          className="data-[state=active]:tw-bg-white"
          value={SUMMARY_CONSTANTS.SAVINGS_ACCOUNT}
        >
          Savings
        </TabsTrigger>
        <TabsTrigger
          className="data-[state=active]:tw-bg-white"
          value={SUMMARY_CONSTANTS.MORTGAGE_ACCOUNT}
        >
          Mortgage
        </TabsTrigger>
      </TabsList>
      <TabsContent value={commonState?.selectedAccountType}>
        <Card>
          <CardHeader>
            <CardTitle>
              {commonState?.getAccountInfo("account_title")}
            </CardTitle>
            <CardDescription>
              Please find the summary of your account below.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="account_number">Account Number</Label>
              <Input
                disabled
                id="account_number"
                value={commonState?.getAccountInfo("account_number")}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="account_type">Account Type</Label>
              <Input
                disabled
                id="account_type"
                value={commonState?.getAccountInfo("account_type")}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="available_balance">Available Balance</Label>
              <Input
                disabled
                id="available_balance"
                value={commonState?.getAccountInfo("available_balance")}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="last_transaction_date">
                Last Transaction Date
              </Label>
              <Input
                disabled
                id="last_transaction_date"
                value={commonState?.getAccountInfo("last_transaction_date")}
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
