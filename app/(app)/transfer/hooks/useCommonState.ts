import { useEffect, useState } from "react";
import { toast } from "@vivekkv178/library";
import useApi from "@/lib/useApi";
import { BE_ROUTES, HttpMethod } from "@/lib/constants";
import { useAppSelector } from "@/lib/reduxHooks";
import { replaceUrl } from "@vivekkv178/library";
import { TRANSFER_CONSTANTS } from "../utils/constants";

const useCommonState = () => {
  const [listLoading, setListLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const authState = useAppSelector((state) => state.auth);

  const [userData, setUserData] = useState<any>({});
  const [transferData, setTransferData] = useState<any>({});

  const [selectedAccountType, setselectedAccountType] = useState(
    TRANSFER_CONSTANTS.MORTGAGE_TRANSFER,
  );

  const api = useApi();

  const getAccountInfo = (infoType: any): any => {
    return userData?.[selectedAccountType]?.[infoType];
  };

  const onDataChange = (params: any) => {
    let newTransferData = { ...transferData };

    newTransferData[params.target.id] = params.target.value;
    setTransferData(newTransferData);
  };

  const validateData = () => {
    return parseInt(transferData?.amount) > 0;
  };

  const onInitiateTransfer = async () => {
    try {
      if (validateData()) {
        setButtonLoading(true);
        const data = await api.callApi({
          url: replaceUrl(BE_ROUTES.GET_USER, {
            email: authState?.user?.email,
          }),
          method: HttpMethod.POST,
          data: {
            from_account: userData["SAVINGS_ACCOUNT"]?.account_number,
            to_account: userData["MORTGAGE_ACCOUNT"]?.account_number,
            amount: parseInt(transferData?.amount),
            instructions: parseInt(transferData?.instructions),
          },
        });
      } else {
        toast({
          variant: "destructive",
          title: "Validation Error.",
          description: "Please validate the data",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error while initiating a Transfer.",
        description: error?.response?.data?.message || "",
      });
    } finally {
      setButtonLoading(false);
    }
  };

  const getUserDetails = async () => {
    try {
      setListLoading(true);
      const data = await api.callApi({
        url: replaceUrl(BE_ROUTES.GET_USER, { email: authState?.user?.email }),
        method: HttpMethod.GET,
      });
      setUserData({
        SAVINGS_ACCOUNT: {
          account_title: "Savings Account",
          account_number: "12345",
          account_type: TRANSFER_CONSTANTS.MORTGAGE_TRANSFER,
          available_balance: "S$7892.00",
          last_transaction_date: "21/08/2024",
        },
        MORTGAGE_ACCOUNT: {
          account_title: "Mortgage Account",
          account_number: "67890",
          account_type: TRANSFER_CONSTANTS.OTHER_TRANSFER,
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
    if (authState?.user?.email) getUserDetails();
  }, [authState?.user?.email]);

  const refreshHandler = () => {
    getUserDetails();
  };

  return {
    listLoading,
    buttonLoading,
    userData,
    transferData,
    selectedAccountType,
    refreshHandler,
    setselectedAccountType,
    getAccountInfo,
    onDataChange,
    onInitiateTransfer,
  };
};

export default useCommonState;
