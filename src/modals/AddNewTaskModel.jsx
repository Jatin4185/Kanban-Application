import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewTask } from "../store/boardSlice";
import { v4 as uuidv4 } from "uuid";

const AddNewTaskModel = ({ addTaskOpen, setAddTaskOpen }) => {
  const boards = useSelector((state) => state.boards);
  const dispatch = useDispatch();
  const [subTasks, setSubTasks] = useState([
    { title: "", isCompleted: false },
    { title: "", isCompleted: false },
  ]);
  const [options, setOptions] = useState([]);
  const [formData, setFormData] = useState({
    taskName: "",
    description: "",
    selectedOption: "",
  });

  useEffect(() => {
    const board = boards.list.find((board) => board.isActive);
    const columnNames = board.columns.map((column) => column.name);
    setFormData({
      ...formData,
      selectedOption: columnNames[0],
    });
    setOptions(columnNames);
  }, []);

  const handleClick = (e) => {
    if (e.target.classList.contains("outer-div")) {
      setAddTaskOpen(!addTaskOpen);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const addNewSubTask = () => {
    setSubTasks([...subTasks, { title: "", isCompleted: false }]);
  };
  const updateSubTask = (i, subtask) => {
    setSubTasks([
      ...subTasks.slice(0, i),
      { title: subtask, isCompleted: false },
      ...subTasks.slice(i + 1),
    ]);
  };

  const deleteSubTask = (i) => {
    setSubTasks([...subTasks.slice(0, i), ...subTasks.slice(i + 1)]);
  };

  const handleCreateTask = () => {
    //dispatch  an action to create a new task
    if (!formData.taskName) return;
    const subtaskTitle = subTasks.find((subTasks) => subTasks.title === "");
    if (subtaskTitle) return;

    dispatch(
      addNewTask({
        task: {
          taskId: uuidv4(),
          title: formData.taskName,
          description: formData.description,
          status: formData.selectedOption,
          subtasks: subTasks,
        },
      })
    );
    setAddTaskOpen(!addTaskOpen);
  };
  return (
    <div
      onClick={handleClick}
      className="outer-div fixed inset-0 z-40 bg-black
    bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
    >
      <div
        className="inner-div bg-white dark:bg-[#2b2c37] flex flex-col gap-5 items-start
         text-black dark:text-white rounded-lg shadow-lg shadow-blue-300/20
        py-8 px-6 w-[280px] md:w-[450px] overflow-scroll no-scrollbar overflow-y-scroll max-h-[610px]"
      >
        <h1 className="text-xl font-semibold ">Add New Task</h1>

        <div className="flex flex-col gap-2 w-full">
          <label className="text-lg font-thin">Task Name</label>
          <input
            type="text"
            placeholder="e.g Take coffee break"
            name="taskName"
            value={formData.taskName}
            onChange={handleChange}
            className="border-[1.5px]  border-slate-400 dark:bg-[#2b2c37]
             py-2 px-3 font-semibold rounded-lg
             focus:ring-1 ring-offset-1 ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-4 w-full">
          <label className="text-lg font-thin">Description</label>

          <textarea
            type="text-area"
            placeholder="e.g. It's always good to take a break.This 15 minute break will recharge the batteries a litte."
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border-[1.5px]  border-slate-400 dark:bg-[#2b2c37]
            py-2 px-3 font-semibold rounded-lg
            focus:ring-1 ring-offset-1 ring-blue-500 h-[150px]"
          />
        </div>

        <div className="flex flex-col gap-4 w-full">
          <label className="text-lg font-thin">Subtasks</label>
          {subTasks.map((subtask, i) => {
            return (
              <div key={i}>
                <input
                  type="text"
                  placeholder="e.g Take coffee break"
                  id={`subTask${i + 1}`}
                  value={subtask.title}
                  onChange={(e) => updateSubTask(i, e.target.value)}
                  className="border-[1.5px] border-slate-400 dark:bg-[#2b2c37]
            py-2 px-3 font-semibold rounded-lg
            focus:ring-1 ring-offset-1 ring-blue-500 w-[90%]"
                />
                <span
                  onClick={() => deleteSubTask(i)}
                  className="text-xl ml-1 md:ml-4 cursor-pointer active:text-blue-500"
                >
                  X
                </span>
              </div>
            );
          })}
          <button
            onClick={addNewSubTask}
            className="py-2 text-[15px] font-semibold tracking-wide rounded-3xl bg-blue-600 dark:bg-white text-white dark:text-blue-500 items-center"
          >
            + Add New SubTask
          </button>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <label htmlFor="status">Current Status</label>
          <select
            className="
          px-4 py-2 rounded-lg text-black dark:text-white dark:bg-[#2b2c37] ring-1 ring-offset-1 ring-slate-800 active:ring-blue-500"
            name="selectedOption"
            value={formData.selectedOption}
            onChange={handleChange}
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button
            onClick={handleCreateTask}
            className="bg-blue-600 w-full py-2 text-[15px] tracking-wide font-semibold text-white rounded-3xl items-center"
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewTaskModel;
