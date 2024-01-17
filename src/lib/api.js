import axios from "axios";
import { tryCatch } from "./utils";

const messageApiUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/message`;
export const getMessages = async (page = 1) => {
  const url = new URL(`${messageApiUrl}?page=${page}`);
  const [response, error] = await tryCatch(axios.get(url));

  if (error) throw error;
  return response.data;
};

export const archiveMessages = async (ids) => {
  const url = new URL(messageApiUrl);
  const [response, error] = await tryCatch(axios.put(url, { ids }));

  if (error) throw error;
  return response.data.data;
};

export const sendMessage = async (data) => {
  const [response, error] = await tryCatch(
    axios.post(messageApiUrl, {
      message: data.message,
      sender: data.sender,
    })
  );

  if (error) throw error;
  return response.data.data;
};
