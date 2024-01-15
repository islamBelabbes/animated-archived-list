import PusherServer from "pusher";
import PusherClient from "pusher-js";
export const pusherServer = new PusherServer({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.NEXT_PUBLIC_PUSHER_key,
  secret: process.env.PUSHER_secret,
  cluster: "eu",
  useTLS: true,
});

export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_key,
  {
    cluster: "eu",
  }
);
