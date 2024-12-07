import { useEffect, useState } from "react";
import { toast } from "@vivekkv178/library";
import useApi from "@/lib/useApi";
import { BE_ROUTES, HttpMethod } from "@/lib/constants";
import { useAppSelector } from "@/lib/reduxHooks";
import { replaceUrl } from "@vivekkv178/library";
import { SUMMARY_CONSTANTS } from "../utils/constants";

const useCommonState = () => {
  const [listLoading, setListLoading] = useState(false);

  const authState = useAppSelector((state) => state.auth);

  const [summary, setSummary] = useState<any>({});

  const [selectedAccountType, setselectedAccountType] = useState(
    SUMMARY_CONSTANTS.SAVINGS_ACCOUNT,
  );

  const api = useApi();

  const getAccountInfo = (infoType: any): any => {
    return summary?.[selectedAccountType]?.[infoType];
  };

  const getSummaryData = async () => {
    try {
      setListLoading(true);
      const data = await api.callApi({
        url: replaceUrl(BE_ROUTES.GET_USER, { email: authState?.user?.email }),
        method: HttpMethod.GET,
      });
      setSummary({
        [SUMMARY_CONSTANTS.SAVINGS_ACCOUNT]: {
          account_title: "Savings Account",
          account_number: "12345",
          account_type: SUMMARY_CONSTANTS.SAVINGS_ACCOUNT,
          available_balance: "S$7892.00",
          last_transaction_date: "21/08/2024",
        },
        [SUMMARY_CONSTANTS.MORTGAGE_ACCOUNT]: {
          account_title: "Mortgage Account",
          account_number: "67890",
          account_type: SUMMARY_CONSTANTS.MORTGAGE_ACCOUNT,
          available_balance: "S$4532.00",
          last_transaction_date: "2/10/2024",
        },
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error while fetching.",
        description: error?.response?.data?.message || "",
      });
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    if (authState?.user?.email) getSummaryData();
  }, [authState?.user?.email]);

  const refreshHandler = () => {
    getSummaryData();
  };

  return {
    listLoading,
    summary,
    selectedAccountType,
    refreshHandler,
    setselectedAccountType,
    getAccountInfo,
  };
};

export default useCommonState;
