import Link from "next/link";

const PlusButton = ({ onModalOpen }) => {
  return (
    <button
      onClick={onModalOpen}
      className="px-12 flex items-center h-full rounded-md justify-between  bg-[#0070f3] shadow-sm"
    >
      Add Book +
    </button>
  );
};

export default PlusButton;
