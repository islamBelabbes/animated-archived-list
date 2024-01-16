import { archiveMessages, getMessages } from "@/lib/api";
import { pusherClient } from "@/lib/pusher";
import { isMessageSelected, tryCatch } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function useInbox(initialData) {
  const [selected, setSelected] = useState([]);
  const queryClient = useQueryClient();
  const { data, refetch } = useQuery({
    queryKey: ["messages"],
    refetchOnWindowFocus: false,
    queryFn: getMessages,
    initialData: initialData,
  });

  const { mutateAsync } = useMutation({
    mutationFn: ({ ids }) => archiveMessages(ids.join(",")),
    onMutate: ({ ids }) => {
      queryClient.setQueryData(["messages"], (old) => {
        return old.filter((message) => !ids.includes(message.id));
      });
    },
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

  const handleArchive = async () => {
    if (!selected.length > 0)
      return toast.error("please select messages to archive", {
        toastId: "no-message-to-archive",
        position: "top-center",
      });
    const [__, error] = await tryCatch(mutateAsync({ ids: selected }));
    if (error) {
      toast.error("something went wrong");
    }

    return refetch();
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
