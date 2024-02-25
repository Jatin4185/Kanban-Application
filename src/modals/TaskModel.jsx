import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../store/boardSlice";

const TaskModel = ({ task, taskModelOpen, setTaskModelOpen }) => {
  const boards = useSelector((state) => state.boards);
  const dispatch = useDispatch();

  const [checkboxes, setCheckBoxes] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    const board = boards.list.find((board) => board.isActive);
    const columnNames = board.columns.map((column) => column.name);
    setCheckBoxes(task.subtasks);
    setOptions(columnNames);
    setSelectedOption(task.status);
  }, []);

  const handleClick = (e) => {
    if (e.target.classList.contains("outer-div")) {
      dispatch(
        updateTask({
          ...task,
          subtasks: checkboxes,
          status: selectedOption,
        })
      );
      setTaskModelOpen(!taskModelOpen);
    }
  };

  const taskCompleted = checkboxes.reduce((acc, curr) => {
    if (curr.isCompleted) {
      acc++;
    }
    return acc;
  }, 0);

  const handleChange = (i) => {
    setCheckBoxes([
      ...checkboxes.slice(0, i),
      { ...checkboxes[i], isCompleted: !checkboxes[i].isCompleted },
      ...checkboxes.slice(i + 1),
    ]);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="outer-div  fixed inset-0 z-20  bg-black
    bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
      >
        <div
          className={`flex
           inner-div  bg-white dark:bg-[#2b2c37] flex-col gap-10 items-start
        text-black dark:text-white rounded-lg shadow-lg shadow-blue-300/20
        py-8 px-6 w-[250px] sm:w-[450px] overflow-scroll no-scrollbar overflow-y-scroll max-h-[610px]`}
        >
          <div className="w-full flex justify-between items-center relative">
            <h1 className="font-semibold">{task.title}</h1>
          </div>

          <div className="w-full flex flex-col justify-between gap-2">
            <span>Subtasks {`${taskCompleted} of ${checkboxes.length}`}</span>
            {checkboxes.map((subtask, i) => {
              return (
                <div
                  key={i}
                  className="flex justify-start items-center bg-blue-100 dark:bg-[#20212c] px-2 py-3 rounded-lg gap-3 font-semibold"
                >
                  <input
                    type="checkbox"
                    checked={subtask.isCompleted}
                    id={`subtask${i + 1}`}
                    onChange={() => handleChange(i)}
                    className="w-[15px] h-[15px] cursor-pointer"
                  />
                  <span
                    className={`${
                      subtask.isCompleted && "line-through text-slate-400"
                    } `}
                  >
                    {subtask.title}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-4 w-full">
            <label htmlFor="status">Current Status</label>
            <select
              className="cursor-pointer
          px-4 py-2 rounded-lg dark:text-white dark:bg-[#2b2c37] ring-1 ring-offset-1 ring-slate-800 active:ring-blue-500"
              name="selectedOption"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskModel;
