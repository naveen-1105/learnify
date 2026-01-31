"use client";
import React, { useEffect, useState } from "react";
import { DataGrid, showToolBar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useTheme } from "next-themes";
import { useGetAllCoursesQuery } from "../../../../redux/feature/course/CoursesApi";
import { useGetAllOrdersQuery } from "../../../../redux/feature/orders/orderApi";
import { useGetAllUsersQuery } from "../../../../redux/feature/user/userApi";
import Loader from "../../Loader";
import { format } from "timeago.js";
import { AiOutlineMail } from "react-icons/ai";

const AllInvoices = ({ isDashBoardHero }) => {
  const { theme } = useTheme();
  const {
    data: ordersData,
    isLoading: isOrdersLoading,
    error: ordersError,
  } = useGetAllOrdersQuery({});
  const {
    data: usersData,
    isLoading: isUsersLoading,
    error: usersError,
  } = useGetAllUsersQuery({});
  const {
    data: coursesData,
    isLoading: isCoursesLoading,
    error: coursesError,
  } = useGetAllCoursesQuery({});

  useEffect(() => {
    if (ordersError) {
      console.error("Orders Error:", ordersError);
    }
    if (usersError) {
      console.error("Users Error:", usersError);
    }
    if (coursesError) {
      console.error("Courses Error:", coursesError);
    }
  }, [ordersError, usersError, coursesError]);

  const [orderData, setOrderData] = useState([]);

  // Combine orders, users, and courses once all data is loaded
  useEffect(() => {
    if (ordersData && usersData && coursesData) {
      console.log(ordersData);
      console.log(usersData);
      console.log(coursesData);
      const temp = ordersData.orders.map((order) => {
        const user = usersData.users.find((u) => u._id === order.userId);
        const course = coursesData.courses.find(
          (c) => c._id === order.courseId
        );
        return {
          ...order,
          userName: user?.name || "Unknown",
          userEmail: user?.email || "N/A",
          title: course?.name || "N/A",
          price: course ? "$" + course.price : "N/A",
        };
      });
      setOrderData(temp);
    }
  }, [ordersData, usersData, coursesData]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    {
      field: "userName",
      headerName: "Name",
      flex: isDashBoardHero ? 0.6 : 0.5,
    },
    ...(!isDashBoardHero
      ? [
          { field: "userEmail", headerName: "Email", flex: 1 },
          { field: "title", headerName: "Course Title", flex: 1 },
        ]
      : []),
    { field: "price", headerName: "Price", flex: 0.5 },
    ...(isDashBoardHero
      ? [{ field: "created_at", headerName: "Created At", flex: 0.5 }]
      : [
          {
            field: "emailIcon",
            headerName: "Email",
            flex: 0.2,
            renderCell: (params) => (
              <a href={`mailto:${params.row.userEmail}`}>
                <AiOutlineMail
                  className="dark:text-white text-black"
                  size={20}
                />
              </a>
            ),
          },
        ]),
  ];

  // Prepare rows for DataGrid
  const rows = orderData.map((item) => ({
    id: item._id,
    userName: item.userName,
    userEmail: item.userEmail,
    title: item.title,
    price: item.price,
    created_at: format(item.createdAt),
  }));

  const isDataLoading = isOrdersLoading || isUsersLoading || isCoursesLoading;

  return (
    <div className={!isDashBoardHero ? "mt-[0px]" : "mt-[120px]"}>
      {isDataLoading ? (
        <Loader />
      ) : (
        <Box m={!isDashBoardHero ? "0" : "40px"}>
          <Box
            m={!isDashBoardHero ? "0" : "40px 0 0 0"}
            height={!isDashBoardHero ? "300px" : "1000px"}
            overflow={"hidden"}
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              ...(isDashBoardHero
                ? {
                    "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                      color: "#000",
                    },
                  }
                : {}),

              ...(isDashBoardHero
                ? {
                    "& .MuiDataGrid-sortIcon": {
                      color: theme !== "dark" ? "#fff" : "#000",
                    },
                  }
                : {}),
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom:
                  theme === "dark"
                    ? "1px solid #ffffff30!important"
                    : "1px solid #ccc!important",
              },

              "& .MuiDataGrid-row:hover": {
                backgroundColor: theme === "dark" ? "#2c2c54" : "#f5f5f5",
                color: theme === "dark" ? "#fff" : "#000",
              },

              "& .MuiTablePagination-root": {
                color: theme !== "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none!important",
              },
              "& .name-column--cell": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                borderBottom: "none",
                color: "#000",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
              },
              "& .MuiDataGrid-footerContainer": {
                color: theme !== "dark" ? "#fff" : "#000",
                borderTop: "none",
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
              },
              "& .MuiCheckbox-root": {
                color:
                  theme !== "dark" ? `#b7ebde !important` : `#000 !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `#fff !important`,
              },
            }}
          >
            <DataGrid
              checkboxSelection={!isDashBoardHero ? false : true}
              rows={rows}
              columns={columns}
              components={!isDashBoardHero ? {} : { Toolbar: showToolBar }}
            />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default AllInvoices;
