import React from "react";
import Task from "./Task";
import { FaCircle, FaSnapchat } from "react-icons/fa";
import { Droppable } from "react-beautiful-dnd";
const Column = ({ column, color }) => {
  const numTask = column && column.tasks ? column.tasks.length : 0;
  const getListStyle = (isDraggingOver, droppableStyle) => ({
    ...droppableStyle,
    backgroundColor: isDraggingOver ? "#ccffcc" : "",
  });
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
      <Droppable droppableId={column.columnId}>
        {(provided, snapshot) => (
          <div
            className="flex flex-col gap-6 min-h-[600px]"
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={getListStyle(
              snapshot.isDraggingOver,
              provided.droppableProps.style
            )}
          >
            {column.tasks.map((task, index) => (
              <Task key={task.taskId} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {/* <div className="flex flex-col gap-6 min-h-[600px]">
        {column.tasks.map((task) => (
          <Task key={task.taskId} task={task} />
        ))}
      </div> */}
    </div>
  );
};

export default Column;
