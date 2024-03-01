import React from "react";
import { useSelector } from "react-redux";
import Column from "./Column";
import AddColumn from "./AddColumn";
import { DragDropContext } from "react-beautiful-dnd";
import {
  dragDrapBetweenTwoList,
  dragDropInSingleList,
} from "../store/boardSlice";
import { useDispatch } from "react-redux";

const Board = ({ sideBarOpen }) => {
  const boards = useSelector((state) => state.boards);
  const dispatch = useDispatch();

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

  const onDragEndHandler = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      // drag and drop two list
      console.log(result);
      dispatch(
        dragDrapBetweenTwoList({
          taskId: result.draggableId,
          sourceColumnId: source.droppableId,
          sourceIndex: source.index,
          destinationColumnId: destination.droppableId,
          destinationIndex: destination.index,
        })
      );
    } else {
      // drag and drop on a single list
      if (source.index === destination.index) return;
      dispatch(
        dragDropInSingleList({
          columnId: source.droppableId,
          sourceIndex: source.index,
          destinationIndex: destination.index,
        })
      );
    }
  };

  return (
    <main
      className={`flex px-8 py-4 gap-16 ${
        sideBarOpen ? "col-start-2" : "col-start-1 col-span-2"
      } bg-[#f4f7fd] dark:bg-[#20212c] overflow-scroll scrollbar`}
    >
      <DragDropContext onDragEnd={(result) => onDragEndHandler(result)}>
        {columns.map((column) => (
          <Column key={column.columnId} column={column} color={nextColor()} />
        ))}
        <AddColumn numberOfCol={columns.length} />
      </DragDropContext>
    </main>
  );
};

export default Board;
