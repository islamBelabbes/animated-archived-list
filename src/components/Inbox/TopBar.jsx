const TopBar = ({ onAdd, onArchive, disabled }) => {
  const { add, archive } = disabled;
  return (
    <div className="flex justify-between p-3 border-b border-gray-200  sm:w-[inherit] w-full fixed bg-white z-10 translate-y-[-2px] ">
      <button onClick={onAdd} disabled={add}>
        Add
      </button>
      <button
        onClick={onArchive}
        className="disabled:cursor-not-allowed disabled:opacity-60"
        disabled={archive}
      >
        Archive
      </button>
    </div>
  );
};

export default TopBar;
