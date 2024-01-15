import { v4 as uuid } from "uuid";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export const generateMessage = () => {
  let titles = [
    ["Apple's newest iPhone is here", "Watch our July event"],
    ["Your funds have been processed", "See your latest deposit online"],
    ["This Week in Sports", "The finals are heating up"],
    ["Changelog update", "Edge subroutines and more"],
    ["React Hawaii is here!", "Time for fun in the sun"],
  ];
  return {
    id: uuid(),
    content: titles[Math.floor(Math.random() * titles.length)],
  };
};

export const cn = (...args) => {
  return twMerge(clsx(args));
};

export const tryCatch = async (Promise) => {
  try {
    const data = await Promise;
    return [data, null];
  } catch (error) {
    return [null, error];
  }
};

export const isMessageSelected = ({ selectedMessages, targetMessageId }) => {
  return selectedMessages.some((message) => message === targetMessageId);
};
