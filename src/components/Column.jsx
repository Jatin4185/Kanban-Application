import React from "react";
import Task from "./Task";
import { FaCircle } from "react-icons/fa";
const Column = ({ column, color }) => {
  const numTask = column && column.tasks ? column.tasks.length : 0;

  return (
    <div className="min-w-[280px]">
      <div
        className="text-slate-400 flex justify-start 
      items-center space-x-2 mb-4 font-thin tracking-wider"
      >
        <span>
          <FaCircle className={color} />
        </span>
        <span>{`${column.name} (${numTask})`}</span>
      </div>
      <div className="flex flex-col gap-6 min-h-[600px]">
        {column.tasks.map((task) => (
          <Task key={task.taskId} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Column;
