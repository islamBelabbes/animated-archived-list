"use client";
import Overlay from "./Overlay";
import { motion } from "framer-motion";

const variants = {
  visible: { translateX: 0, opacity: 1 },
  hidden: { translateX: "100vw", opacity: 0 },
  exit: { translateX: "100vw", opacity: 0 },
  transition: { duration: 0.5, ease: "easeInOut" },
};
function SideModal({ children, onClickOutSide }) {
  return (
    <Overlay
      className={"flex justify-end"}
      onClickOutside={onClickOutSide}
      animate
    >
      <motion.div
        className="md:w-[500px] w-full h-full bg-white cursor-auto"
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition="transition"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </Overlay>
  );
}

export default SideModal;
