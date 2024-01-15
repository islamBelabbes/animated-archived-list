import { tryCatch } from "@/lib/utils";
import prisma from "@/lib/prisma";
import {
  sendCreated,
  sendNoContent,
  sendOk,
  sendServerError,
} from "@/lib/responseHelper";
import { getMessages } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";

export const GET = async (req) => {
  const url = new URL(req.url);
  const limit = url.searchParams.get("limit");
  const page = url.searchParams.get("page");

  const [data, error] = await tryCatch(
    getMessages({
      take: limit ? parseInt(limit) : 8,
      skip: page ? parseInt(page) : 0,
    })
  );

  if (error) return sendServerError();

  return sendOk({
    data,
    message: "Messages fetched successfully",
  });
};

export const POST = async (req) => {
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
