import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const variants = {
  animate: {
    opacity: 1,
    transition: {
      ease: "linear",
      opacity: { delay: 0.1 },
    },
  },
  exit: {
    hanging: 0,
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  },
  transition: { duration: 0.5, ease: "easeInOut" },
};
const MessageItem = ({ data, handleClick, isSelected }) => {
  const { message, sender } = data;
  return (
    <motion.div
      layout
      className={cn("flex flex-col cursor-pointer p-2", {
        "rounded bg-cyan-500 ": isSelected,
      })}
      onClick={handleClick}
      variants={variants}
      animate="animate"
      exit="exit"
    >
      <span className="font-bold">{message}</span>
      <span className="font-normal opacity-65">{sender}</span>
    </motion.div>
  );
};

export default MessageItem;
