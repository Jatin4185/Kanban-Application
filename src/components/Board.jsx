import React from "react";
import { useSelector } from "react-redux";
import Column from "./Column";
import AddColumn from "./AddColumn";

const Board = ({ sideBarOpen }) => {
  const boards = useSelector((state) => state.boards);

  const color = [
    "text-green-500",
    "text-orange-500",
    "text-blue-500",
    "text-pink-500",
    "text-yellow-500",
    "text-red-500",
    "text-voilet-500",
  ];
  let i = -1;
  const nextColor = () => {
    const n = color.length;
    i = (i + 1) % n;

    return color[i];
  };

  const board = boards.list.find(
    (board) => board.boardId === boards.activeBoardId
  );

  const columns = board && board.columns ? board.columns : [];

  return (
    <main
      className={`h-screen flex px-8 py-4 gap-16 ${
        sideBarOpen ? "col-start-2" : "col-start-1 col-span-2"
      } bg-[#f4f7fd] dark:bg-[#20212c] overflow-auto`}
    >
      {columns.map((column) => (
        <Column key={column.columnId} column={column} color={nextColor()} />
      ))}
      <AddColumn numberOfCol={columns.length} />
    </main>
  );
};

export default Board;
