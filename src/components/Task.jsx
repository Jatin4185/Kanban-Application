import React, { useState } from "react";
import TaskModel from "../modals/TaskModel";
import { MdDelete, MdEdit } from "react-icons/md";
import EditTaskModel from "../modals/EditTaskModel";
import DeleteTaskModel from "../modals/DeleteTaskModel";

const Task = ({ task }) => {
  const [taskModelOpen, setTaskModelOpen] = useState(false);
  const [editTaskOpen, setEditTaskOpen] = useState(false);
  const [deleteTaskOpen, setDeleteTaskOpen] = useState(false);
  //const subTask = task.subtasks ? task.subtasks : [];

  const numOfSubTaskCompleted = task.subtasks.reduce((acc, curr) => {
    if (curr.isCompleted) {
      acc++;
    }
    return acc;
  }, 0);

  const totalSubTask = task.subtasks.length;
  return (
    <>
      <div
        className=" p-6 bg-white dark:bg-[#2b2c37] text-black sm:w-[280px]
     dark:text-white rounded-lg shadow-lg shadow-blue shadow-blue-400/30 dark:shadow-blue-400/10 group"
      >
        <h1
          onClick={() => setTaskModelOpen(true)}
          className=" cursor-pointer text-sm md:text-md font-semibold 
        transition duration-300 delay-100 ease-in-out
      group-hover:text-blue-500 tracking-wide"
        >
          {task.title}
        </h1>
        <h3 className="text-xs py-2 font-semibold dark:text-slate-400 text-slate-600 tracking-wide">
          {numOfSubTaskCompleted} of {totalSubTask} completed tasks
        </h3>
        <div className="w-full flex justify-between mt-1  text-blue-500">
          <MdEdit
            size={20}
            onClick={() => setEditTaskOpen(!editTaskOpen)}
            className="cursor-pointer"
          />
          <MdDelete
            size={20}
            onClick={() => setDeleteTaskOpen(!deleteTaskOpen)}
            className="cursor-pointer"
          />
        </div>
      </div>
      {taskModelOpen && (
        <TaskModel
          task={task}
          taskModelOpen={taskModelOpen}
          setTaskModelOpen={setTaskModelOpen}
        />
      )}
      {editTaskOpen && (
        <EditTaskModel
          task={task}
          editTaskOpen={editTaskOpen}
          setEditTaskOpen={setEditTaskOpen}
        />
      )}
      {deleteTaskOpen && (
        <DeleteTaskModel
          task={task}
          deleteTaskOpen={deleteTaskOpen}
          setDeleteTaskOpen={setDeleteTaskOpen}
        />
      )}
    </>
  );
};

export default Task;
