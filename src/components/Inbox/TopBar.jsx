const TopBar = ({ onAdd, onArchive }) => {
  return (
    <div className="flex justify-between p-3 border-b border-gray-200 w-[inherit] fixed bg-white z-10 ">
      <button onClick={onAdd}>Add</button>
      <button
        onClick={onArchive}
        disabled
        className="disabled:cursor-not-allowed disabled:opacity-60"
      >
        Archive
      </button>
    </div>
  );
};

export default TopBar;
