import React, { useRef, useState } from "react";
import { generateMessage } from "../utils/utils";
import MessageList from "./MessageList";
import TopBar from "./TopBar";
function ArchivedList() {
  const [data, setData] = useState([]);
  const archiveListRef = useRef();
  const handleAddMessage = () => {
    const message = generateMessage(); // object
    setData([{ ...message, isSelected: false }, ...data]);
    archiveListRef.current.scrollTop = 0;
  };

  const toggleSelected = (id) => {
    const newData = data.map((item) => {
      return item.id === id ? { ...item, isSelected: !item.isSelected } : item;
    });
    setData(newData);
  };

  const handleArchive = () => {
    const newData = data.filter((item) => !item.isSelected);
    setData(newData);
  };

  return (
    <div
      ref={archiveListRef}
      className="w-[500px] bg-white rounded  h-[300px]  overflow-auto box flex flex-col"
    >
      <TopBar onAdd={handleAddMessage} onArchive={handleArchive} />
      <MessageList data={data} handleClick={toggleSelected} />
    </div>
  );
}

export default ArchivedList;
