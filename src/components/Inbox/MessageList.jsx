import { AnimatePresence, motion } from "framer-motion";
import MessageItem from "./MessageItem";

const MessageList = ({ data, handleClick, selectedMessages, isLoading }) => {
  if (isLoading) {
    return (
      <span className="flex items-center justify-center h-full p-3 mt-[49px]">
        Loading...
      </span>
    );
  }

  if (!data.length > 0) {
    return (
      <span className="flex items-center justify-center h-full p-3 mt-[49px]">
        No messages found
      </span>
    );
  }

  return (
    <motion.div className="flex flex-col gap-2 p-3 mt-[49px]">
      <AnimatePresence>
        {data.map((message) => (
          <MessageItem
            key={message.id}
            data={message}
            handleClick={() => handleClick(message.id)}
            isSelected={selectedMessages.includes(message.id)}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default MessageList;
