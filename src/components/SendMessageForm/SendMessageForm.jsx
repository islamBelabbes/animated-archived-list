"use client";
import React, { useState } from "react";
import SideModal from "../Modal/SideModal";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import BlockUi from "../BlockUi";
import { sendMessage } from "@/lib/api";
import { cn } from "@/lib/utils";

function SendMessageForm({ closeModal }) {
  const [errors, setErrors] = useState({
    sender: null,
    message: null,
  });
  const { mutateAsync, isPending } = useMutation({
    mutationFn: sendMessage,
  });

  console.log(errors);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const sender = formData.get("sender");
    const message = formData.get("message");
    // some validation
    // Reset errors
    setErrors({
      sender: null,
      message: null,
    });

    if (!sender) {
      setErrors((errors) => ({ ...errors, sender: "please enter your name" }));
      return;
    }

    if (!message) {
      setErrors((errors) => ({ ...errors, message: "please enter a message" }));
      return;
    }

    await toast.promise(mutateAsync({ sender, message }), {
      pending: "Promise is pending",
      success: "Message sent successfully 👌",
      error: {
        render({ data }) {
          if (data.response.status === 429) {
            return "Too many requests. Please try again later.";
          }
          return "Something went wrong. Please try again later.";
        },
      },
    });
  };

  return (
    <SideModal onClickOutSide={null}>
      <div className="flex flex-col w-full h-full gap-2 p-3">
        {/* back button */}
        <button onClick={closeModal} className="primary_button">
          {" 🪐 Back"}
        </button>

        <BlockUi
          isBlock={isPending}
          classNames={{ spinner: "rounded", container: "w-full" }}
        >
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            {/* sender name */}
            <input
              type="text"
              placeholder="Enter your name"
              className={cn("w-full primary_input", {
                "!border-red-600": errors.sender,
              })}
              name="sender"
            />
            {errors.sender && <span>{errors.sender}</span>}

            {/* message */}
            <textarea
              cols="30"
              rows="10"
              className={cn("w-full primary_input", {
                "!border-red-600": errors.message,
              })}
              placeholder=" Enter your message"
              name="message"
            ></textarea>
            {errors.message && <span>{errors.message}</span>}
            {/* send button */}
            <button className="w-full primary_button" disabled={isPending}>
              Send message 🚀
            </button>
          </form>
        </BlockUi>
      </div>
    </SideModal>
  );
}

export default SendMessageForm;
