import React, { useEffect, useState } from "react";
import { MoreVertical } from "lucide-react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";

import EditBoardModel from "../modals/EditBoardModel";
import DeleteBoardModel from "../modals/DeleteBoardModel";
import AddNewTaskModel from "../modals/AddNewTaskModel";

const Navbar = ({
  selectedBoardName,
  selectedBoardId,
  sideBarOpen,
  setSideBarOpen,
}) => {
  const [isOptionOpen, setOptionOpen] = useState(false);
  const [editBoardOpen, setEditBoardOpen] = useState(false);
  const [deleteBoardOpen, setDeleteBoardOpen] = useState(false);
  const [addTaskOpen, setAddTaskOpen] = useState(false);

  const handleEditBoard = () => {
    setOptionOpen(!isOptionOpen);
    setEditBoardOpen(!editBoardOpen);
  };

  const handleDeleteBoard = () => {
    setOptionOpen(!isOptionOpen);
    setDeleteBoardOpen(!deleteBoardOpen);
  };
  return (
    <>
      <header className="sm:col-span-2">
        <div
          className="flex justify-start bg-white
      items-center h-[80px] dark:bg-[#2b2c37]
      p-4 fixed inset-0 top-0"
        >
          <div className="flex justify-start items-center space-x-4 w-[150px] md:min-w-[261px]">
            {sideBarOpen ? (
              <RxCross2
                size={32}
                className="text-blue-500 cursor-pointer"
                onClick={() => setSideBarOpen(!sideBarOpen)}
              />
            ) : (
              <GiHamburgerMenu
                size={32}
                className="text-blue-500 cursor-pointer"
                onClick={() => setSideBarOpen(!sideBarOpen)}
              />
            )}

            <h1 className="text-xl sm:text-4xl font-bold  text-black dark:text-blue-500">
              kanban
            </h1>
          </div>
          <div className="flex justify-between items-center flex-1">
            <h1 className="text-sm sm:text-2xl font-bold text-black dark:text-white">
              {selectedBoardName}
            </h1>
            <div className="flex justify-between items-center space-x-2">
              <button
                onClick={() => setAddTaskOpen(!addTaskOpen)}
                className="px-3 py-1   md:px-6 md:py-3 bg-blue-500 hover:bg-blue-600 transition delay-150 
          duration-300 ease-in-out font-bold rounded-[50%] md:rounded-3xl text-white"
              >
                <span className="hidden md:block">+ Add New Task</span>
                <span className="block md:hidden text-lg">+</span>
              </button>
              <MoreVertical
                size={32}
                onClick={() => setOptionOpen(!isOptionOpen)}
                className="text-slate-400"
              />
            </div>
          </div>
        </div>
        {isOptionOpen && (
          <div
            className="z-40 fixed right-[10px] top-[75px] bg-white dark:bg-[#191a20]
          p-4 flex flex-col gap-2 font-semibold cursor-pointer text-md tracking-wide"
          >
            <span
              onClick={handleEditBoard}
              className="text-black dark:text-white"
            >
              Edit Board
            </span>
            <span onClick={handleDeleteBoard} className=" text-red-500">
              Delete Board
            </span>
          </div>
        )}
      </header>
      {editBoardOpen && (
        <EditBoardModel
          editBoardOpen={editBoardOpen}
          setEditBoardOpen={setEditBoardOpen}
        />
      )}
      {deleteBoardOpen && (
        <DeleteBoardModel
          boardId={selectedBoardId}
          boardName={selectedBoardName}
          deleteBoardOpen={deleteBoardOpen}
          setDeleteBoardOpen={setDeleteBoardOpen}
        />
      )}
      {addTaskOpen && (
        <AddNewTaskModel
          addTaskOpen={addTaskOpen}
          setAddTaskOpen={setAddTaskOpen}
        />
      )}
    </>
  );
};

export default Navbar;
