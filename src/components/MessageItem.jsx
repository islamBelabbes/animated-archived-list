import { motion } from "framer-motion";
import { cn } from "../utils/utils";

const MessageItem = ({ message, handleClick }) => {
  return (
    <motion.div
      layout
      className={cn("flex flex-col cursor-pointer", {
        "rounded bg-cyan-500": message.isSelected,
      })}
      onClick={handleClick}
      initial={{ opacity: 0, fontWeight: 100 }}
      animate={{
        fontWeight: 700,
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
      <span className="font-bold">{message.content[0]}</span>
      <span className="font-normal opacity-65">{message.content[1]}</span>
    </motion.div>
  );
};

export default MessageItem;
