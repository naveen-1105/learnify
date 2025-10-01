"use client";
import React, { useEffect, useState } from "react";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ThemeSwitcher from "../../../app/utils/ThemeSwitcher";
import socketIO from "socket.io-client";
import {
  useGetAllNotificationsQuery,
  useUpdateNotificationStatusMutation,
} from "../../../redux/feature/notifications/notificationApi";
import { formatDate } from "../../utils/FormatDate";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI;
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const DashBoard = () => {
  const [open, setOpen] = useState(false);
  const { data, refetch } = useGetAllNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [updateNotificationStatus, { isSuccess }] =
    useUpdateNotificationStatusMutation();
  const [notifications, setNotifications] = useState([]);
  const [audio] = useState(
    new Audio(
      "https://res.cloudinary.com/dbs6iskoj/video/upload/v1758922720/mixkit-correct-answer-tone-2870_nreddg.wav"
    )
  );

  const playerNotificationSound = () => {
    audio.play();
  };
  console.log("notification :",notifications);
  useEffect(() => {
    if (data) {
      console.log("newNotification :" ,data);
      setNotifications(
        data.notifications.filter((item) => item.status === "unread")
      );
    }
    if (isSuccess) {
      refetch();
    }
    audio.load();
  }, [data, isSuccess]);

  useEffect(() => {
  const handler = () => {
    refetch();
    playerNotificationSound();
  };
  socketId.on("newNotification", handler);

  return () => {
    socketId.off("newNotification", handler);
  };
}, [refetch]);

  const handelNotificationStatusChange = async (id) => {
    await updateNotificationStatus(id);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className="flex w-full h-1/25 justify-end items-center pr-[20px] pt-[20px] relative z-999999999">
      <ThemeSwitcher />

      <Badge badgeContent={notifications.length} color="success">
        <NotificationsIcon
          color="white"
          className="cursor-pointer"
          onClick={handleClick}
        />
      </Badge>
      {open && (
        <div className="w-[30%]  bg-gradient-to-b from-blue-900 to-blue-950 h-[auto] top-[50px] right-[20px] absolute rounded-[16px]">
          {notifications.map((notification, index) => {
            return (
              <>
                <div
                  className={`p-3 ${
                    index !== notifications.length - 1
                      ? "border-b border-gray-300"
                      : null
                  }`}
                >
                  <div className="flex justify-between text-[15px] text-green-500">
                    <h1>
                      {notification.title}
                    </h1>
                    <p>{formatDate(notification.createdAt)}</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[15px]">{notification.message}</p>
                    <p className="text-[15px] text-right hover:text-green-500 cursor-pointer" onClick={() => handelNotificationStatusChange(notification._id)}>{notification.status}</p>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DashBoard;
