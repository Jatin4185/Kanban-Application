import React, { useState } from "react";
import { createBoard } from "../store/boardSlice";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const AddNewBoardModal = ({ isAddBoardOpen, setAddBoardOpen }) => {
  const dispatch = useDispatch();
  const [boardName, setBoardName] = useState("");
  const [columnNames, setColumnNames] = useState(["Todo", "Doing"]);

  //   console.log("modal component renders");

  const addNewColumn = () => {
    setColumnNames([...columnNames, ""]);
  };

  const updateColumnName = (i, columnName) => {
    setColumnNames([
      ...columnNames.slice(0, i),
      columnName,
      ...columnNames.slice(i + 1),
    ]);
  };

  const deleteColumn = (i) => {
    setColumnNames([...columnNames.slice(0, i), ...columnNames.slice(i + 1)]);
  };

  const createNewBoard = () => {
    if (!boardName) return;

    const columns = columnNames.map((columnName) => {
      return {
        columnId: uuidv4(),
        name: columnName,
        tasks: [],
      };
    });

    const checkColumn = columns.find((column) => column.name === "");
    if (checkColumn) return;

    dispatch(
      createBoard({
        boardId: uuidv4(),
        name: boardName,
        isActive: false,
        columns: columns ? columns : [],
      })
    );

    setAddBoardOpen(!isAddBoardOpen);
  };

  const handleClick = (e) => {
    if (e.target.classList.contains("outer-div")) {
      setAddBoardOpen(!isAddBoardOpen);
    }
  };
  return (
    <div
      onClick={handleClick}
      className="outer-div fixed inset-0 z-40 bg-black
    bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
    >
      <div
        className="inner-div bg-white dark:bg-[#2b2c37] flex flex-col gap-10 items-start
         text-black dark:text-white rounded-lg shadow-lg shadow-blue-300/20
        py-8 px-6 md:min-w-[450px]  overflow-scroll no-scrollbar overflow-y-scroll max-h-[550px]"
      >
        <h1 className="text-xl font-semibold ">Add New Board</h1>

        <div className="flex flex-col gap-2 w-full">
          <label className="text-lg font-thin">Board Name</label>
          <input
            type="text"
            placeholder="e.g Api Design"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            className="border-[1.5px]  border-slate-400 dark:bg-[#2b2c37]
             py-2 px-3 font-semibold rounded-lg
             focus:ring-1 ring-offset-1 ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-4 w-full">
          <label className="text-lg font-thin">Board Columns</label>
          {columnNames.map((columnName, i) => {
            return (
              <div key={i}>
                <input
                  type="text"
                  id={`input-${i + 1}`}
                  value={columnNames[i]}
                  onChange={(e) => updateColumnName(i, e.target.value)}
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
          onClick={createNewBoard}
          className="bg-blue-600 w-full py-2 text-[15px] tracking-wide font-semibold text-white rounded-3xl items-center"
        >
          Create New Board
        </button>
      </div>
    </div>
  );
};

export default AddNewBoardModal;
