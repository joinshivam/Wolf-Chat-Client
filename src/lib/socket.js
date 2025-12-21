// lib/socket.js
import { io } from "socket.io-client";

export function createSocket(chatId) {
  const { hostname, port, protocol } = window.location;
  return io(`https://server_wolf_chat.railway.app/`, {
    auth: { chatId },
    transports: ["websocket"],
  });
}
