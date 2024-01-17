import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const MessageItem = ({ data, handleClick, isSelected }) => {
  const { message, sender } = data;
  return (
    <motion.div
      layout
      className={cn("flex flex-col cursor-pointer p-2", {
        "rounded bg-cyan-500 ": isSelected,
      })}
      onClick={handleClick}
      initial={false}
      // initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          ease: "linear",
          opacity: { delay: 0.1 },
        },
      }}
      exit={{
        hanging: 0,
        opacity: 0,
        transition: {
          duration: 0.1,
        },
      }}
    >
      <span className="font-bold">{message}</span>
      <span className="font-normal opacity-65">{sender}</span>
    </motion.div>
  );
};

export default MessageItem;
