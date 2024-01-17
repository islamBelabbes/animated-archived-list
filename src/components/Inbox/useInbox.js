import { archiveMessages, getMessages } from "@/lib/api";
import { pusherClient } from "@/lib/pusher";
import { tryCatch } from "@/lib/utils";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function useInbox() {
  const [selected, setSelected] = useState([]);
  const queryClient = useQueryClient();
  const {
    data,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["messages"],
    refetchOnWindowFocus: false,
    queryFn: ({ pageParam }) => getMessages(pageParam),
    getNextPageParam: ({ pagination }) => {
      return pagination.hasNext ? pagination.page + 1 : undefined;
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: ({ ids }) => archiveMessages(ids),
    onMutate: ({ ids }) => {
      queryClient.setQueryData(["messages"], (old) => {
        const data = old.pages.map((data) => {
          return {
            ...data,
            data: data.data.filter((item) => !ids.includes(item.id)),
          };
        });
        return { ...old, pages: data };
      });
    },
  });

  const toggleSelected = (id) => {
    if (selected.includes(id)) {
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

    setSelected([]);

    if (error) {
      toast.error("something went wrong archive aborted");
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

  const messages = data?.pages?.reduce((acc, page) => {
    return [...acc, ...page.data];
  }, []);

  return {
    messages,
    selectedMessages: selected,
    toggleSelected,
    handleArchive,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  };
}

export default useInbox;
