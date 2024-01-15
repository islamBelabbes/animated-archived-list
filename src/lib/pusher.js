import PusherServer from "pusher";
import PusherClient from "pusher-js";
export const pusherServer = new PusherServer({
  appId: "1741153",
  key: "28645399f9a4a700049d",
  secret: "3aa0c629c889ac34a6ed",
  cluster: "eu",
  useTLS: true,
});

export const pusherClient = new PusherClient("28645399f9a4a700049d", {
  cluster: "eu",
});
