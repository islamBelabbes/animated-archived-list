import { tryCatch } from "@/lib/utils";
import prisma from "@/lib/prisma";
import {
  sendCreated,
  sendNoContent,
  sendOk,
  sendServerError,
  sendToManyRequests,
} from "@/lib/responseHelper";
import { getMessages } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { ratelimit } from "@/lib/upstach";

export const GET = async (req) => {
  const url = new URL(req.url);
  const limit = url.searchParams.get("limit");
  const page = url.searchParams.get("page");
  const query = {
    take: limit ? parseInt(limit) : 8,
    skip: page ? parseInt(page) : 0,
    where: {
      type: "Inbox",
    },
  };

  const [data, error] = await tryCatch(getMessages(query));

  if (error) return sendServerError();

  return sendOk({
    data,
    message: "Messages fetched successfully",
  });
};

export const POST = async (req) => {
  // rate limiter start
  const { success } = await ratelimit.limit("ip");
  if (!success) return sendToManyRequests();
  // rate limiter end

  const { message, sender } = await req.json();

  const [data, error] = await tryCatch(
    prisma.message.create({
      data: {
        message,
        sender,
      },
    })
  );

  if (error) return sendServerError();

  await pusherServer.trigger("inbox-time", "new-message", {
    message: "hello world",
  });

  return sendCreated({
    data,
    message: "Message sent successfully",
  });
};

export const PUT = async (req) => {
  const { ids } = await req.json();
  const idsArray = ids.split(",").map((id) => id);

  const [__, error] = await tryCatch(
    prisma.message.updateMany({
      where: {
        id: {
          in: [...idsArray],
        },
      },
      data: {
        type: "Archive",
      },
    })
  );

  if (error) return sendServerError();
  return sendNoContent();
};
