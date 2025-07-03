import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  import.meta.env.VITE_NODE_ENV === "production"
    ? undefined
    : "http://localhost:4000";

export const socket = io(URL, {
  autoConnect: false,
  transports: ["websocket"],
  debug: true, // Enable debugging
});
