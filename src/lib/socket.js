import { io } from "socket.io-client";

export function createSocket(chatId) {
  const socket = io(`https://bauth-backend.onrender.com/`, {
    auth: { chatId },
    transports: ["websocket"],
  });
  socket.on("connect_error", (err) => {
    return { isAlive: false, message: err.message };
  })

  return socket;
}
