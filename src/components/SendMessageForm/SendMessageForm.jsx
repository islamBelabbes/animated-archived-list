"use client";
import React from "react";
import SideModal from "../Modal/SideModal";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import BlockUi from "../BlockUi";

function SendMessageForm({ closeModal }) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => {
      return axios.post(
        `http://${process.env.NEXT_PUBLIC_SERVER_URL}/api/message`,
        {
          message: data.message,
          sender: data.sender,
        }
      );
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const sender = formData.get("sender");
    const message = formData.get("message");

    await toast.promise(mutateAsync({ sender, message }), {
      pending: "Promise is pending",
      success: "Message sent successfully 👌",
      error: "Promise rejected 🤯",
    });

    // todo : trigger pusher event
  };

  return (
    <SideModal onClickOutSide={closeModal}>
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
              className="w-full primary_input"
              name="sender"
            />

            {/* message */}
            <textarea
              cols="30"
              rows="10"
              className="w-full primary_input"
              placeholder=" Enter your message"
              name="message"
            ></textarea>

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
