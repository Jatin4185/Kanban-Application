import React, { useState } from "react";
import { useSelector } from "react-redux";

import BoardName from "./BoardName";
import { MdSpaceDashboard, MdDarkMode, MdLightMode } from "react-icons/md";
import AddNewBoardModal from "../modals/AddNewBoardModal";

const SideBar = ({ theme, setTheme, sideBarOpen }) => {
  const boards = useSelector((state) => state.boards.list);
  const [isAddBoardOpen, setAddBoardOpen] = useState(false);

  return (
    <>
      <section
        className={`${
          !sideBarOpen ? "hidden" : "block"
        } row-start-2 min-w-[261px] bg-white dark:bg-[#2b2c37] 
      h-screen pt-2 fixed top-[80px] buttom-0`}
      >
        <h1 className="px-4 pt-4 text-black dark:text-slate-400 text-semibold">{`ALL BOARDS (${boards.length})`}</h1>
        {boards.map((board) => (
          <BoardName
            key={board.boardId}
            boardId={board.boardId}
            boardName={board.name}
            isActive={board.isActive}
            isCreate={false}
          />
        ))}
        <div
          onClick={() => setAddBoardOpen(true)}
          className="flex justify-start items-center
  px-2 py-4 font-semibold text-blue-500 text-lg mt-2 
  cursor-pointer w-[230px] rounded-r-3xl hover:bg-slate-300 dark:hover:bg-white hover:text-blue-500"
        >
          <MdSpaceDashboard size={28} className="text-slate-400 mx-2" />
          <span className="tracking-wide">{"Create New Board"}</span>
        </div>
        <div className="z-40 flex justify-center gap-6 items-center mx-4 my-4 px-4 py-3 rounded-lg bg-slate-200 dark:bg-[#20212c] text-slate-400">
          <MdDarkMode
            size={32}
            onClick={() => setTheme("dark")}
            className={`${theme == "dark" && "text-blue-500"}`}
          />
          <MdLightMode
            size={32}
            onClick={() => setTheme("light")}
            className={`${theme == "light" && "text-blue-500"}`}
          />
        </div>
      </section>
      {isAddBoardOpen && boards.length <= 6 && (
        <AddNewBoardModal
          isAddBoardOpen={isAddBoardOpen}
          setAddBoardOpen={setAddBoardOpen}
        />
      )}
    </>
  );
};

export default SideBar;
