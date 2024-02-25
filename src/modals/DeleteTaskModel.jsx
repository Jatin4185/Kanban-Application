import React from "react";
import { deleteTask } from "../store/boardSlice";
import { useDispatch } from "react-redux";

const DeleteTaskModel = ({ deleteTaskOpen, setDeleteTaskOpen, task }) => {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    if (e.target.classList.contains("outer-div")) {
      setDeleteTaskOpen(!deleteTaskOpen);
    }
  };

  const handleDeleteTask = () => {
    dispatch(deleteTask({ taskId: task.taskId }));
    setDeleteTaskOpen(!deleteTaskOpen);
  };

  const handleCancel = () => {
    setDeleteTaskOpen(!deleteTaskOpen);
  };

  return (
    <div
      onClick={handleClick}
      className="outer-div fixed inset-0 z-40 bg-black
        bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
    >
      <div
        className="inner-div bg-white dark:bg-[#2b2c37] flex flex-col gap-5 items-start
             text-slate-500 dark:text-white rounded-lg shadow-lg shadow-blue-300/20
            py-8 px-6 sm:w-[400px]"
      >
        <h1 className="text-red-600 font-bold text-xl">Delete this Task?</h1>
        <p className="text-[12px]">
          {`Are you sure you want to delete the ${task.title} task and its subtasks? This
          action will remove all columns and tasks and cannot be reversed.`}
        </p>
        <div className="flex gap-4 justify-between w-full font-semibold">
          <button
            onClick={handleDeleteTask}
            className="bg-red-600 basis-1/2 py-2 text-center text-white
            tracking-wide rounded-3xl hover:bg-red-700"
          >
            Delete
          </button>
          <button
            className="bg-slate-300 dark:bg-white text-blue-500 basis-1/2 py-2 
            rounded-3xl text-center tracking-wide dark:hover:bg-slate-300 hover:bg-slate-400"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTaskModel;
