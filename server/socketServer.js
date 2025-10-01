import { Server as socketServerIO } from "socket.io";
import http from "http";
import NotificationModel from "./models/notificationModel.js";

export const initSocketServer = (server) => {
  const io = new socketServerIO(server);

  // In your server file where you handle socket connections
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("notification", async (data) => {
    try {
      console.log("Received notification data:", data);
      
      // ✅ Validate required fields
      if (!data.userId) {
        console.error("Notification error: userId is missing");
        socket.emit("notification-error", { message: "userId is required" });
        return;
      }

      if (!data.title || !data.message) {
        console.error("Notification error: title or message is missing");
        socket.emit("notification-error", { message: "title and message are required" });
        return;
      }

      // Create notification
      const notification = await NotificationModel.create({
        title: data.title,
        message: data.message,
        userId: data.userId,
        status: "unread"
      });

      console.log("Notification created successfully:", notification._id);
      
      // Emit to admin dashboard or relevant users
      io.emit("newNotification", notification);
      
    } catch (error) {
      console.error("Error creating notification:", error);
      socket.emit("notification-error", { message: error.message });
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
};
