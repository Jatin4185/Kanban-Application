import { createSlice } from "@reduxjs/toolkit";
import data from "../data.json";

export const boardSlice = createSlice({
  name: "boards",
  initialState: {
    list: data.boards,
    activeBoardId: "",
  },
  reducers: {
    setActiveBoard: (state, action) => {
      const boardId = action.payload.boardId;
      state.activeBoardId = boardId;
      state.list.forEach((board) => {
        board.isActive = false;
        if (board.boardId === boardId) {
          board.isActive = true;
        }
      });
    },
    createBoard: (state, action) => {
      state.list.push(action.payload);
    },
    editBoard: (state, action) => {
      console.log(action.payload);
      const index = state.list.findIndex(
        (board) => board.boardId === action.payload.boardId
      );
      if (index != -1) {
        state.list[index] = action.payload;
      }
    },
    deleteBoard: (state, action) => {
      const newList = state.list.filter(
        (board) => board.boardId !== action.payload.boardId
      );
      state.list = newList;
      const boardId = state.list ? state.list[0].boardId : "";
      if (boardId) {
        state.list[0].isActive = true;
      }
      state.activeBoardId = boardId;
    },

    addNewTask: (state, action) => {
      // console.log("Hello");
      console.log(action);
      const task = action.payload.task;
      const activeBoard = state.list.find(
        (board) => board.boardId === state.activeBoardId
      );
      const taskAddToColumn = activeBoard.columns.find(
        (column) => column.name === task.status
      );

      taskAddToColumn.tasks.push(task);

      const newColumns = activeBoard.columns.map((column) =>
        column.columnId === taskAddToColumn.columnId ? taskAddToColumn : column
      );

      activeBoard.columns = newColumns;

      state.list.map((board) => (board.isActive ? activeBoard : board));
    },
    updateTask: (state, action) => {
      console.log(action);

      const activeBoard = state.list.find(
        (board) => board.boardId === state.activeBoardId
      );

      if (!activeBoard) return;

      const columnInWhichTaskPresent = activeBoard.columns.find((column) => {
        return column.tasks.some(
          (task) => task.taskId === action.payload.taskId
        );
      });

      if (
        columnInWhichTaskPresent &&
        columnInWhichTaskPresent.name === action.payload.status
      ) {
        const columns = activeBoard.columns.map((column) => {
          return {
            ...column,
            tasks: column.tasks.map((task) =>
              task.taskId === action.payload.taskId ? action.payload : task
            ),
          };
        });
        activeBoard.columns = columns;
        state.list.map((board) => (board.isActive ? activeBoard : board));
        return;
      }
      const columnsAfterDeletingTask = activeBoard.columns.map((column) => {
        return {
          ...column,
          tasks: column.tasks.filter(
            (task) => task.taskId !== action.payload.taskId
          ),
        };
      });

      const columnsAfterAddingTask = columnsAfterDeletingTask.map((column) => {
        if (column.name === action.payload.status) {
          const newTasks = column.tasks;
          newTasks.push(action.payload);
          return { ...column, tasks: newTasks };
        } else {
          return column;
        }
      });

      activeBoard.columns = columnsAfterAddingTask;
      state.list.map((board) => (board.isActive ? activeBoard : board));
    },
    deleteTask: (state, action) => {
      const activeBoard = state.list.find(
        (board) => board.boardId === state.activeBoardId
      );
      if (!activeBoard) return;

      const newColumns = activeBoard.columns.map((column) => {
        return {
          ...column,
          tasks: column.tasks.filter(
            (task) => task.taskId != action.payload.taskId
          ),
        };
      });

      activeBoard.columns = newColumns;

      state.list.map((board) => (board.isActive ? activeBoard : board));
    },
    dragDropInSingleList: (state, action) => {
      console.log(action);

      const activeBoard = state.list.find(
        (board) => board.boardId === state.activeBoardId
      );
      if (!activeBoard) return;

      const { sourceIndex, destinationIndex } = action.payload;

      const columns = activeBoard.columns.map((column) => {
        if (column.columnId === action.payload.columnId) {
          const task = column.tasks[sourceIndex];
          let newTasks = column.tasks;
          newTasks = [
            ...newTasks.slice(0, sourceIndex),
            ...newTasks.slice(sourceIndex + 1),
          ];
          newTasks = [
            ...newTasks.slice(0, destinationIndex),
            task,
            ...newTasks.slice(destinationIndex),
          ];
          return {
            ...column,
            tasks: newTasks,
          };
        } else {
          return column;
        }
      });

      activeBoard.columns = columns;
      state.list.map((board) => (board.isActive ? activeBoard : board));
    },

    dragDrapBetweenTwoList: (state, action) => {
      const {
        destinationColumnId,
        destinationIndex,
        sourceColumnId,
        sourceIndex,
        taskId,
      } = action.payload;

      const activeBoard = state.list.find(
        (board) => board.boardId === state.activeBoardId
      );

      if (!activeBoard) return;

      const srcColumn = activeBoard?.columns.find(
        (column) => column.columnId === sourceColumnId
      );

      const task = srcColumn?.tasks.find((task) => task.taskId === taskId);

      if (!task) return;

      const columns = activeBoard?.columns?.map((column) => {
        if (column.columnId === sourceColumnId) {
          return {
            ...column,
            tasks: [
              ...column.tasks.slice(0, sourceIndex),
              ...column.tasks.slice(sourceIndex + 1),
            ],
          };
        } else if (column.columnId === destinationColumnId) {
          return {
            ...column,
            tasks: [
              ...column.tasks.slice(0, destinationIndex),
              task,
              ...column.tasks.slice(destinationIndex + 1),
            ],
          };
        } else {
          return column;
        }
      });

      activeBoard.columns = columns;
      state.list.map((board) => (board.isActive ? activeBoard : board));
    },
  },
});

//action export left
export const {
  setActiveBoard,
  createBoard,
  editBoard,
  deleteBoard,
  addNewTask,
  updateTask,
  deleteTask,
  dragDropInSingleList,
  dragDrapBetweenTwoList,
} = boardSlice.actions;
export default boardSlice.reducer;
