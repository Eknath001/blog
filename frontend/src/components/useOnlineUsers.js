import { useEffect, useState } from "react";
import { io } from "socket.io-client";

// Create one global socket instance
export const socket = io("http://localhost:8000", {
  withCredentials: true,
});

const useOnlineUsers = (userId) => {
  const [onlineUsers, setOnlineUsers] = useState(0);

  useEffect(() => {
    if (userId) {
      socket.emit("user-joined", userId);
    }

    socket.on("online-users", (count) => {
      setOnlineUsers(count);
    });

    return () => {
      if (userId) {
        socket.emit("user-left", userId);
      }
      socket.off("online-users");
    };
  }, [userId]);

  return onlineUsers;
};

export default useOnlineUsers;
