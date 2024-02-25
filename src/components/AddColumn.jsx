import React, { useState } from "react";
import EditBoardModel from "../modals/EditBoardModel";

const AddColumn = ({ numberOfCol }) => {
  const [editBoardOpen, setEditBoardOpen] = useState(false);
  return (
    <>
      <div
        className={`min-w-[280px] pt-[40px] block ${
          numberOfCol === 0 ? "flex-1" : ""
        }`}
      >
        {numberOfCol !== 0 ? (
          <div
            onClick={() => setEditBoardOpen(!editBoardOpen)}
            className="bg-[#E9EFFA] dark:bg-[#2b2c37] min-h-[600px]
      flex flex-col justify-center items-center rounded-lg 
     tracking-wide
      text-xl font-bold text-slate-400 hover:text-blue-500 cursor-pointer"
          >
            + New Column
          </div>
        ) : (
          <div
            className="bg-[#E9EFFA] dark:bg-[#2b2c37] min-h-[600px]
      flex flex-col justify-center items-center rounded-lg 
     tracking-wide"
          >
            <span className="text-slate-500 py-4">
              This board is empty.Create a new column to get started.
            </span>
            <span
              onClick={() => setEditBoardOpen(!editBoardOpen)}
              className="bg-blue-500 px-6 py-3 rounded-3xl font-semibold text-white cursor-pointer
              transition delay-100 
          duration-300 ease-in-out hover:bg-indigo-500"
            >
              + Add New Column
            </span>
          </div>
        )}
      </div>
      {editBoardOpen && (
        <EditBoardModel
          editBoardOpen={editBoardOpen}
          setEditBoardOpen={setEditBoardOpen}
        />
      )}
    </>
  );
};

export default AddColumn;
