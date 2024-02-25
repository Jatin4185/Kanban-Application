import React from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setActiveBoard } from "../store/boardSlice";

const BoardName = ({ boardId, boardName, isActive }) => {
  const dispatch = useDispatch();

  const handleBoardSelected = () => {
    if (isActive) return;
    dispatch(setActiveBoard({ boardId }));
  };

  return (
    <div
      className={`flex justify-start items-center
  px-2 py-4 font-semibold text-black dark:text-white text-lg mt-2 cursor-pointer w-[230px] rounded-r-3xl 
   ${
     isActive
       ? "bg-blue-500 transition delay-100 duration-300 hover:bg-slate-300"
       : ""
   } hover:bg-slate-300 dark:hover:bg-white hover:text-blue-500 dark:hover:text-blue-500`}
      onClick={handleBoardSelected}
    >
      <MdSpaceDashboard size={28} className="text-slate-400 mx-2" />
      <span className="tracking-wide">{boardName}</span>
    </div>
  );
};

export default BoardName;
