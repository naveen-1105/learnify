import React, { useEffect, useState } from "react";
import UserAnalytics from "../analytics/UserAnalytics";
import OrderAnalytics from "../analytics/OrderAnalytics";
import { CircularProgress } from "@mui/material";
import AllInvoices from "./Order/AllInvoices";
import { SlGraph } from "react-icons/sl";
import {
  useGetOrderAnalyticsQuery,
  useGetUserAnalyticsQuery,
} from "../../../redux/feature/analytics/analyticsApi";

const DashboardHero = () => {
  const { data, isLoading } = useGetUserAnalyticsQuery({});
  const { data: ordersData, isLoading: ordersLoading } =
    useGetOrderAnalyticsQuery({});

  const [userComparePercentage, setuserComparePercentage] = useState({});
  const [ordersComparePercentage, setOrdersComparePercentage] = useState({});

  useEffect(() => {
    if (data && ordersData) {
      console.log(data?.users?.last12Months.slice(-2));
      const usersLastTwoMonths = data?.users?.last12Months.slice(-2);
      const ordersLastTwoMonths = ordersData?.orders?.last12Months.slice(-2);

      const usersCurrentMonth = usersLastTwoMonths[1].count;
      const usersPreviousMonth = usersLastTwoMonths[0].count;

      const ordersCurrentMonth = ordersLastTwoMonths[1].count;
      const ordersPreviousMonth = ordersLastTwoMonths[0].count;

      const usersPercentChange =
        usersPreviousMonth !== 0
          ? ((usersCurrentMonth - usersPreviousMonth) / usersPreviousMonth) *
            100
          : 100;

      const ordersPercentChange =
        ordersPreviousMonth !== 0
          ? ((ordersCurrentMonth - ordersPreviousMonth) / ordersPreviousMonth) *
            100
          : 100;

      setuserComparePercentage({
        currentMonth: usersCurrentMonth,
        previousMonth: usersPreviousMonth,
        percentChange: usersPercentChange,
      });

      setOrdersComparePercentage({
        currentMonth: ordersCurrentMonth,
        previousMonth: ordersPreviousMonth,
        percentChange: ordersPercentChange,
      });
    }
  },[data, ordersData]);


  return (
    <div className="w-full flex flex-col gap-[30px] py-[30px] px-[20px]">
      <div className="w-full flex  gap-[10px] ">
        <div className="w-[80%] bg-gray-800 h-[300px] ">
          <UserAnalytics isDashboardHero={true} />
        </div>
        <div className="w-[20%] flex flex-col gap-[10px] h-[300px]">
          <div className="w-full flex bg-gray-800 h-[50%] p-[20px]">
            <div className="flex flex-col justify-between">
              <SlGraph />
              <p>{userComparePercentage?.percentChange}</p>
              <p>User Joined</p>
            </div>
            <div>
              <CircularProgress
                
                variant="determinate"
                value={userComparePercentage.percentChange > 99 ? 99 : userComparePercentage.percentChange}
              />
            </div>
          </div>
          <div className="w-full flex bg-gray-800 h-[50%] p-[20px]">
            <div className="flex flex-col justify-between">
              <SlGraph />
              <p>{ordersComparePercentage?.percentChange}</p>
              <p>Sales Obtained</p>
            </div>
            <div>
              <CircularProgress
                
                variant="determinate"
                value={ordersComparePercentage.percentChange > 99 ? 99 : ordersComparePercentage.percentChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex gap-[10px]">
        <div className="w-[60%] bg-gray-800 h-[300px]">
          <OrderAnalytics isDashboardHero={true} />
        </div>
        <div className="w-[40%] h-[300px]">
          <AllInvoices isDashboardHero={true} />
        </div>
        <div />
      </div>
    </div>
  );
};

export default DashboardHero;
