import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editBoard } from "../store/boardSlice";

import { v4 as uuidv4 } from "uuid";

const EditBoardModel = ({ editBoardOpen, setEditBoardOpen }) => {
  const boards = useSelector((state) => state.boards);
  const dispatch = useDispatch();
  const [board, setBoard] = useState({});
  const [boardName, setBoardName] = useState("");
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const board = boards.list.find((board) => board.isActive);
    setBoard(board);
    setBoardName(board.name);
    setColumns(board.columns);
  }, []);

  const handleBoardNameChange = (e) => {
    const boardName = e.target.value;
    setBoardName(boardName);
    setBoard({
      ...board,
      name: boardName,
    });
  };
  const addNewColumn = () => {
    setColumns([...columns, { columnId: uuidv4(), name: "", tasks: [] }]);
  };

  const updateColumns = (i, columnName) => {
    setColumns([
      ...columns.slice(0, i),
      { ...columns[i], name: columnName },
      ...columns.slice(i + 1),
    ]);
  };

  const deleteColumn = (i) => {
    setColumns([...columns.slice(0, i), ...columns.slice(i + 1)]);
  };

  const handleClick = (e) => {
    if (e.target.classList.contains("outer-div")) {
      setEditBoardOpen(!editBoardOpen);
    }
  };

  const editActiveBoard = () => {
    if (!boardName) return;
    //check all column name are present
    const checkColumn = columns.find((column) => column.name === "");
    if (checkColumn) return;
    dispatch(
      editBoard({
        ...board,
        columns: columns,
      })
    );

    setEditBoardOpen(!editBoardOpen);
  };
  return (
    <div
      onClick={handleClick}
      className="outer-div fixed inset-0 z-40 bg-black
        bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
    >
      <div
        className="inner-div  bg-white dark:bg-[#2b2c37] flex flex-col gap-10 items-start
             text-black dark:text-white rounded-lg shadow-lg shadow-blue-300/20
            py-8 px-6 w-[310px] sm:min-w-[450px] overflow-scroll no-scrollbar overflow-y-scroll max-h-[600px]"
      >
        <h1 className="text-xl font-semibold ">Edit Board</h1>

        <div className="flex flex-col gap-2 w-full">
          <label className="text-lg font-thin">Board Name</label>
          <input
            type="text"
            placeholder="e.g Api Design"
            value={boardName}
            onChange={handleBoardNameChange}
            className="border-[1.5px]  border-slate-400 dark:bg-[#2b2c37]
                 py-2 px-3 font-semibold rounded-lg
                 focus:ring-1 ring-offset-1 ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-4 w-full">
          <label className="text-lg font-thin">Board Columns</label>
          {columns.map((column, i) => {
            return (
              <div key={i}>
                <input
                  type="text"
                  id={`input-${i + 1}`}
                  value={columns[i].name}
                  onChange={(e) => updateColumns(i, e.target.value)}
                  className="border-[1.5px] border-slate-400 dark:bg-[#2b2c37]
                 py-2 px-3 font-semibold rounded-lg
                 focus:ring-1 ring-offset-1 ring-blue-500 w-[90%]"
                />
                <span
                  onClick={() => deleteColumn(i)}
                  className="text-xl ml-1 md:ml-4 cursor-pointer active:text-blue-500"
                >
                  X
                </span>
              </div>
            );
          })}
          <button
            onClick={addNewColumn}
            className="py-2 text-[15px] font-semibold tracking-wide rounded-3xl bg-blue-600 dark:bg-white text-white dark:text-blue-500 items-center"
          >
            + Add New Column
          </button>
        </div>

        <button
          onClick={editActiveBoard}
          className="bg-blue-600 w-full py-2 text-[15px] tracking-wide font-semibold text-white rounded-3xl items-center"
        >
          Save Board
        </button>
      </div>
    </div>
  );
};

export default EditBoardModel;
