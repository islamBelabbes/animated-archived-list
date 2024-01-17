"use client";
import { useState } from "react";
import MessageList from "./MessageList";
import TopBar from "./TopBar";
import useInbox from "./useInbox";
import SendMessageForm from "../SendMessageForm/SendMessageForm";
import { AnimatePresence } from "framer-motion";
import { ClipLoader } from "react-spinners";
import { motion } from "framer-motion";
function Inbox() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    messages,
    isLoading,
    selectedMessages,
    handleArchive,
    toggleSelected,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInbox();

  return (
    <div className="w-[500px] bg-white rounded  h-[300px]  overflow-auto box flex flex-col">
      <AnimatePresence>
        {isOpen && <SendMessageForm closeModal={() => setIsOpen(false)} />}
      </AnimatePresence>

      <TopBar onAdd={() => setIsOpen(true)} onArchive={handleArchive} />

      <MessageList
        data={messages}
        handleClick={toggleSelected}
        selectedMessages={selectedMessages}
        isLoading={isLoading}
      />

      {!isLoading && hasNextPage && (
        <motion.button
          layout
          onClick={fetchNextPage}
          disabled={isFetchingNextPage}
          className="primary_button"
        >
          {isFetchingNextPage ? <ClipLoader color="#4B6BFB" /> : "Load more"}
        </motion.button>
      )}
    </div>
  );
}

export default Inbox;
