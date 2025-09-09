"use client";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import {
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "../../../redux/feature/user/userApi";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import Loader from "../Loader";
import toast from "react-hot-toast";

const AllUsers = ({ isTeam }) => {
  const { theme, setTheme } = useTheme();
  const [email, setEmail] = useState("");
  const { isLoading, data, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [active, setActive] = useState(0);
  const [
    updateRole,
    { isLoading: isLoadingRole, error: roleError, isSuccess,data:roleData },
  ] = useUpdateUserRoleMutation();
  useEffect(() =>
    {
      if(isSuccess) {
        refetch();
        toast.success("Role updated successfully!");
        setActive(0);
      }
    },
    [roleData]
  );
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "role", headerName: "Role", flex: 0.5 },
    { field: "courses", headerName: "Courses", flex: 0.5 },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.2,
      renderCell: () => {
        return (
          <>
            <Button
              onClick={() => {
                setOpen(!open);
                setCourseId(params.row.id);
              }}
            >
              <AiOutlineDelete
                className="dark:text-black text-black"
                size={20}
              />
            </Button>
          </>
        );
      },
    },
    {
      field: "Mail",
      headerName: "EMail",
      flex: 0.3,
      renderCell: (params) => {
        return (
          <>
            <a href={`mailto:${params.row.email}`}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <AiOutlineMail size={20} style={{ color: "inherit" }} />
              </div>
            </a>
          </>
        );
      },
    },
  ];
  const rows = [];
  {
    if (isTeam === true) {
      const newData =
        data && data.users.filter((item) => item.role === "admin");
      newData &&
        newData.forEach((item) => {
          rows.push({
            id: item._id,
            name: item.name,
            email: item.email,
            role: item.role,
            courses: item.courses.length,
          });
        });
    } else {
      data &&
        data.users.forEach((item) => {
          rows.push({
            id: item._id,
            name: item.name,
            email: item.email,
            role: item.role,
            courses: item.courses.length,
          });
        });
    }
  }

  return (
    <>
      <div className="mt-[120px] flex flex-col">
        <div className="flex w-full relative">
          <a
            className="w-[10%] px-[10px] py-[8px] bg-green-500 rounded-2xl text-black text-center absolute right-[0px] mr-[20px] cursor-pointer"
            onClick={() => setActive(1)}
          >
            Make Admin
          </a>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <Box m="20px">
            <Box
              m="40px 0 0 0"
              height="80vh"
              sx={{
                "& .MuiDataGrid-sortIcon": {},
                "& .MuiDataGrid-row": {
                  color: theme === "dark" ? "#fff" : "#000",
                  borderBottom:
                    theme === "dark"
                      ? "1px solid #ffffff30!important"
                      : "1px solid #ccc!important",
                },
                "& .MuiDataGrid-row:hover": {
                  // backgroundColor: theme === "dark" ? "#2e3b55" : "#f5f5f5", // hover background
                  color: theme === "dark" ? "#000" : "#fff", // hover text color
                  cursor: "pointer", // pointer cursor
                },
                "& .MuiTablePagination-root": {
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none!important",
                },
                "& .name-column--cell": {
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-columnHeaders": {
                  borderTop: "none",
                  backgroundColor: theme === "dark" ? "#3e4396" : "#2f3787",
                  borderBottom: "none",
                },
                "& .MuiDataGrid-headerContainer": {
                  color: theme === "dark" ? "#fff" : "#000",
                  borderTop: "none",
                  backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                },

                "& .MuiDataGrid-columnHeaderTitle": {
                  // color: "#fff !important",

                  fontWeight: "600",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
                },
                "& .MuiDataGrid-footerContainer": {
                  color: theme === "dark" ? "#fff" : "#000",
                  borderTop: "none",
                  backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                },
                "& .MuiCheckbox-root": {
                  color:
                    theme === "dark" ? `#b7ebde !important` : `#000 !important`,
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  color: `#fff !important`,
                },
              }}
            >
              <DataGrid checkboxSelection rows={rows} columns={columns} />
            </Box>
          </Box>
        )}
      </div>
      {active === 1 && (
        <>
          {/* Background overlay (transparent black) */}
          <div className="fixed inset-0 bg-transparent backdrop-blur-[5px]  z-40"></div>

          {/* Popup container */}
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-[#1F2A40] rounded-2xl shadow-xl p-6 w-[400px]">
              <h2 className="text-xl font-semibold mb-4 text-center">
                Make Admin
              </h2>

              {/* Input field */}
              <input
                type="email"
                placeholder="Enter email to promote"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#2e3b55] dark:text-white"
              />
              <p>Enter the Email of the user, you want to make Admin.If you want to change role from admin to user then also enter the mail here.</p>

              {/* Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setActive(0)}
                  className="px-4 py-2 rounded-lg bg-gray-300 text-black hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    try {
                      const result = await updateRole({ email }).unwrap();
                    } catch (err) {
                      toast.error(
                        err?.data?.message || "Something went wrong!"
                      );
                    }
                  }}
                  className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AllUsers;
