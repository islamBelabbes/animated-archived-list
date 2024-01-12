import { AnimatePresence, motion } from "framer-motion";
import MessageItem from "./MessageItem";

const MessageList = ({ data, handleClick }) => {
  if (!data.length > 0) {
    return (
      <span className="flex items-center justify-center h-full p-3 mt-[49px]">
        No messages
      </span>
    );
  }

  return (
    <motion.div className="flex flex-col gap-2 p-3 mt-[49px] ">
      <AnimatePresence>
        {data.map((message) => (
          <MessageItem
            key={message.id}
            message={message}
            handleClick={() => handleClick(message.id)}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default MessageList;
