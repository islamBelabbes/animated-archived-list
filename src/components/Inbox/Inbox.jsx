"use client";
import { useRef, useState } from "react";
import MessageList from "./MessageList";
import TopBar from "./TopBar";
import useInbox from "./useInbox";
import SendMessageForm from "../SendMessageForm/SendMessageForm";
import { AnimatePresence } from "framer-motion";
function Inbox({ initialData }) {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, selectedMessages, handleArchive, toggleSelected } =
    useInbox(initialData);
  if (!messages) return;
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
      />
    </div>
  );
}

export default Inbox;
