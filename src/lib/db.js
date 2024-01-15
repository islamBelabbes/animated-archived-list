import prisma from "./prisma";
import { tryCatch } from "./utils";

export const getMessages = async (query) => {
  const [data, error] = await tryCatch(
    prisma.message.findMany({
      ...query,
      orderBy: {
        createdAt: "desc",
      },
    })
  );

  if (error) throw error;

  return data;
};
