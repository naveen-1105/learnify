"use client";
import { useGetOrderAnalyticsQuery } from "../../../redux/feature/analytics/analyticsApi";
import React from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  LabelList,
  Tooltip,
  CartesianGrid,
} from "recharts";
import Loader from "../Loader";

const OrderAnalytics = (isDashBoardHero) => {
  const { data, isLoading } = useGetOrderAnalyticsQuery();

  console.log("Raw order analytics data:", data);

  const analyticsData = [];

  if (data?.orders?.last12Months) {
    data.orders.last12Months.forEach((item) => {
      analyticsData.push({ name: item.month, orders: item.count });
    });
  }

  const minValue = 0;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="h-screen p-5">
          <div className={`${isDashBoardHero? 'mt-[0px]' : 'mt-[50px]'}`}>
            <h1 className="text-[32px] text-white">Order Analytics</h1>
            <p className="text-[20px] text-white">Last 12 months</p>
          </div>

          <div className={`w-full flex items-center justify-center ${isDashBoardHero? 'mt-[0px]' : 'mt-[10px]'}`}>
            <ResponsiveContainer width="90%" height={isDashBoardHero ? 200 : 400}>
              <LineChart data={analyticsData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                <XAxis dataKey="name" stroke="#E2E8F0" />
                <YAxis domain={[minValue, "auto"]} stroke="#E2E8F0" />
                <Tooltip contentStyle={{ backgroundColor: "#1A202C", border: "none", color: "#fff" }} />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#48BB78"
                  strokeWidth={3}
                  activeDot={{ r: 8 }}
                >
                  <LabelList dataKey="orders" position="top" fill="#48BB78" />
                </Line>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderAnalytics;
