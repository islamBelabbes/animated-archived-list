"use client";

import SendMessageForm from "@/components/SendMessageForm/SendMessageForm";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="app">
      <AnimatePresence>
        {isOpen && <SendMessageForm closeModal={() => setIsOpen(false)} />}
      </AnimatePresence>

      <div className="flex gap-3">
        <div
          className="cursor-pointer primary_button"
          onClick={() => setIsOpen(true)}
        >
          Send Message
        </div>
        <Link className="cursor-pointer primary_button" href={"/dashboard"}>
          Dashboard
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
