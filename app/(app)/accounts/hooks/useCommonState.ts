import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "@vivekkv178/library";
import useApi from "@/lib/useApi";
import { BE_ROUTES, HttpMethod } from "@/lib/constants";
import { useAppSelector } from "@/lib/reduxHooks";
import { AgGridReact } from "ag-grid-react";
import { SUMMARY_CONSTANTS } from "../../home/utils/constants";
import { useRouter } from "next/navigation";

const useUsersState = () => {
  const [listLoading, setListLoading] = useState(false);

  const gridRef = useRef<AgGridReact>(null);
  const router = useRouter();

  const [rowData, setRowData] = useState<any>([]);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs]: any[] = useState([
    {
      headerName: "S.No",
      valueGetter: "node.rowIndex + 1",
    },
    {
      field: "account_number",
      headerName: "Account Number",
    },
    {
      field: "account_type",
      headerName: "Account Type",
    },
    {
      field: "last_transaction_date",
      headerName: "Last Transaction Date",
    },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      editable: false,
      sortable: false,
      filter: true,
    };
  }, []);

  const redirectToDetails = (params: any) => {
    console.log(params);

    router.push(`/accounts/${params?.data?.account_number}`);
  };

  const authState = useAppSelector((state) => state.auth);

  const api = useApi();

  const listData = async () => {
    try {
      setListLoading(true);
      const response = await api.callApi({
        url: BE_ROUTES.GET_USERS,
        method: HttpMethod.GET,
      });
      setRowData([
        {
          account_title: "Savings Account",
          account_number: "12345",
          account_type: SUMMARY_CONSTANTS.SAVINGS_ACCOUNT,
          available_balance: "S$7892.00",
          last_transaction_date: "21/08/2024",
        },
        {
          account_title: "Mortgage Account",
          account_number: "67890",
          account_type: SUMMARY_CONSTANTS.MORTGAGE_ACCOUNT,
          available_balance: "S$4532.00",
          last_transaction_date: "2/10/2024",
        },
      ]);
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
    if (authState?.user) listData();
  }, [authState?.user]);

  const refreshHandler = () => {
    listData();
  };

  return {
    listLoading,
    refreshHandler,
    colDefs,
    defaultColDef,
    gridRef,
    rowData,
    redirectToDetails,
  };
};

export default useUsersState;
