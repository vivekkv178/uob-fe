import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TRANSFER_CONSTANTS } from "../utils/constants";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from "@vivekkv178/library";
import { useComponentContext } from "../context/context";
import { Icon } from "@iconify/react";

export const Transfer = () => {
  const { commonState } = useComponentContext();

  return (
    <Tabs
      defaultValue={commonState?.selectedAccountType}
      onValueChange={commonState?.setselectedAccountType}
    >
      <TabsList>
        <TabsTrigger
          className="data-[state=active]:tw-bg-white"
          value={TRANSFER_CONSTANTS.MORTGAGE_TRANSFER}
        >
          Mortgage Transfer
        </TabsTrigger>
        <TabsTrigger
          className="data-[state=active]:tw-bg-white"
          value={TRANSFER_CONSTANTS.OTHER_TRANSFER}
        >
          Other Transfers
        </TabsTrigger>
      </TabsList>
      <TabsContent value={TRANSFER_CONSTANTS.MORTGAGE_TRANSFER}>
        <Card>
          <CardHeader>
            <CardTitle>Mortgage Transfer</CardTitle>
            <CardDescription>
              Please fill in the neccessary details required.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="from_account">From Account</Label>
              <Input
                disabled
                id="from_account"
                value={commonState?.userData["SAVINGS_ACCOUNT"]?.account_number}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="to_account">To Account</Label>
              <Input
                disabled
                id="to_account"
                value={
                  commonState?.userData["MORTGAGE_ACCOUNT"]?.account_number
                }
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="amount">Amount to Transfer</Label>
              <Input
                id="amount"
                min="1"
                value={commonState?.transferData?.amount}
                type="number"
                onChange={commonState?.onDataChange}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="instructions">Instructions</Label>
              <Input
                id="instructions"
                value={commonState?.transferData?.instructions}
                onChange={commonState?.onDataChange}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={commonState?.onInitiateTransfer}
              disabled={commonState?.buttonLoading}
            >
              {commonState?.buttonLoading ? (
                <Icon
                  icon="lucide:loader-circle"
                  className="h-4 w-4 animate-spin"
                />
              ) : (
                " Initiate Transfer"
              )}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
