import { pusherClient } from "@/lib/pusher";
import { isMessageSelected } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

const getMessages = async () => {
  const url = new URL(
    `http://${process.env.NEXT_PUBLIC_SERVER_URL}/api/message`
  );
  const response = await axios.get(url);
  return response.data.data;
};

function useInbox(initialData) {
  const [selected, setSelected] = useState([]);

  const { data, refetch } = useQuery({
    queryKey: ["messages"],
    queryFn: getMessages,
    refetchOnWindowFocus: false,
    initialData: initialData,
  });

  const toggleSelected = (id) => {
    if (
      isMessageSelected({ selectedMessages: selected, targetMessageId: id })
    ) {
      return setSelected((selected) => {
        return selected.filter((item) => item !== id);
      });
    }

    return setSelected((selected) => [...selected, id]);
  };

  const handleArchive = () => {
    const newData = data.filter((item) => !item.isSelected);
    setData(newData);
  };

  useEffect(() => {
    const channel = "inbox-time";
    const channelClient = pusherClient.subscribe(channel);
    channelClient.bind("new-message", function (data) {
      refetch();
    });

    return () => pusherClient.unsubscribe(channel);
  }, []);

  return {
    messages: data,
    selectedMessages: selected,
    toggleSelected,
    handleArchive,
  };
}

export default useInbox;
