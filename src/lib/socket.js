// lib/socket.js
import { io } from "socket.io-client";

export function createSocket(chatId) {
  const { hostname, port, protocol } = window.location;
  return io(`http://localhost:5000`, {
    auth: { chatId },
    transports: ["websocket"],
  });
}
