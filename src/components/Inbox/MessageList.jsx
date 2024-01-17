import { AnimatePresence, motion } from "framer-motion";
import MessageItem from "./MessageItem";

const MessageList = (props) => {
  return (
    <motion.div className="flex flex-col gap-2 p-3 mt-[49px]">
      <ListRender {...props} />
    </motion.div>
  );
};

const MessageListPlaceHolder = () => {
  return Array(10)
    .fill(0)
    .map((_, index) => (
      <div key={index} className="flex flex-col gap-2 p-2 animate-pulse">
        <span className="w-10/12 h-4 bg-slate-200"></span>
        <span className="w-1/3 h-3 bg-slate-200"></span>
      </div>
    ));
};

const ListRender = ({ data, handleClick, selectedMessages, isLoading }) => {
  if (isLoading) return <MessageListPlaceHolder />;

  if (!data.length) {
    return <span className="flex justify-center">No messages</span>;
  }

  return (
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
  );
};
export default MessageList;
