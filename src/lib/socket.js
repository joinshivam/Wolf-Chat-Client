// lib/socket.js
import { io } from "socket.io-client";

export function createSocket(chatId) {
  const { hostname, port, protocol } = window.location;
  return io(`https://bauth-backend.onrender.com/`, {
    auth: { chatId },
    transports: ["websocket"],
  });
}
