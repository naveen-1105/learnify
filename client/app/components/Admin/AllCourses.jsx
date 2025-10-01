"use client";
import React from "react";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { useTheme } from "next-themes";
import { FiEdit2 } from "react-icons/fi";
import Link from "next/link";
import {useDeleteCourseMutation, useGetAllCoursesQuery} from "../../../redux/feature/course/CoursesApi"
import Loader from "../Loader";
import toast from "react-hot-toast";

const AllCourses = () => {
  const { theme, setTheme } = useTheme();
  const {isLoading, data,isSuccess, error, refetch} = useGetAllCoursesQuery({},{refetchOnMountOrArgChange: true});
  const [deleteCourse, { isLoading: deleteLoading,isSuccess: deleteSuccess }] = useDeleteCourseMutation();

  useEffect(() => {
    if(deleteSuccess && !isLoading && !deleteLoading){
        refetch();
        toast.success("Course deleted succcessfully")
    }
  },[deleteSuccess, isLoading, deleteLoading, refetch])

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "title", headerName: "Course Title", flex: 1 },
    { field: "ratings", headerName: "Ratings", flex: 0.5 },
    { field: "purchased", headerName: "Purchased", flex: 0.5 },
    { field: "created_at", headerName: "Created At", flex: 0.5 },
    {
      field: "edit",
      headerName: "Edit",
      flex: 0.2,
      renderCell: (params) => {
        return (
          <> 
          <div className="w-full h-full flex justify-center items-center">
            <Link href={`/admin/edit-course/${params.row.id}`}>
              <FiEdit2 className="dark:text-white text-black" size={20} />
            </Link>
          </div>
            
          </>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={async() => {
                console.log(params);
                await deleteCourse(params.row.id);
              }}
            >
              <AiOutlineDelete
                className="dark:text-white text-black"
                size={20}
              />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];
  {
    data && data.courses.forEach((item) => {
      rows.push({
        id: item._id,
        title: item.name,
        ratings : item.ratings,
        purchased : item.purchased,
        createdAt :item.createdAxt,
      })
    })
  }

  return (
    <>
      <div className="mt-[120px]">
        {isLoading ? (
          <Loader />
        ) : (
          <Box m="20px">
            <Box
              m="40px 0 0 0"
              height="80vh"
              sx={{
                // "& .MuiDataGrid-root": {
                //   border: "none",
                //   outline: "none",
                // },
                // "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                //   color: theme === "dark" ? "#fff" : "#000",
                // },
                "& .MuiDataGrid-sortIcon": {
                  // color: "#fff",
                },
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
    </>
  );
};

export default AllCourses;
