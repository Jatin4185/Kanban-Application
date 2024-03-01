import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setActiveBoard } from "./store/boardSlice";
import Board from "./components/Board";
import SideBar from "./components/SideBar";
const App = () => {
  const boards = useSelector((state) => state.boards);
  const dispatch = useDispatch();
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme || "light";
  });
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const element = document.documentElement;

  useEffect(() => {
    switch (theme) {
      case "dark":
        element.classList.add("dark");
        localStorage.setItem("theme", "dark");
        break;
      case "light":
        element.classList.remove("dark");
        localStorage.removeItem("theme");
        break;
      default:
        break;
    }
  }, [theme]);

  const selectedBoardId = boards.activeBoardId
    ? boards.activeBoardId
    : boards?.list[0].boardId;

  if (!boards.activeBoardId) {
    dispatch(setActiveBoard({ boardId: selectedBoardId }));
  }

  const selectedBoard = boards.list.find(
    (board) => board.boardId === selectedBoardId
  );
  const selectedBoardName = selectedBoard ? selectedBoard.name : "";

  // console.log(uuidv4());
  return (
    <div className="grid grid-col-1 sm:grid-cols-[261px_1fr] grid-rows-[80px_1fr]">
      <Navbar
        selectedBoardName={selectedBoardName}
        selectedBoardId={selectedBoardId}
        sideBarOpen={sideBarOpen}
        setSideBarOpen={setSideBarOpen}
      />
      <SideBar theme={theme} setTheme={setTheme} sideBarOpen={sideBarOpen} />
      <Board sideBarOpen={sideBarOpen} />
    </div>
  );
};

export default App;
