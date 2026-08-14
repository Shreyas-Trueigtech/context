import React from "react";
import { ListTodo } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import KanbanColumn from "./KanbanColumn";

const KanbanBoard = ({
  columns,
  register,
  handleSubmit,
  reset,
  activeColumn,
  setActiveColumn,
  draggedItem,
  dragOverColumn,
  addNewTask,
  removeTask,
  handleDragStart,
  handleDragOver,
  handleDragLeave,
  handleDrop,
}) => {
  return (
    <div className="min-h-screen w-full bg-background p-6 md:p-10">
      <div className="">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
          {Object.entries(columns).map(([columnId, column]) => (
            <KanbanColumn
              key={columnId}
              columnId={columnId}
              column={column}
              dragOverColumn={dragOverColumn}
              draggedItem={draggedItem}
              activeColumn={activeColumn}
              setActiveColumn={setActiveColumn}
              register={register}
              handleSubmit={handleSubmit}
              reset={reset}
              addNewTask={addNewTask}
              removeTask={removeTask}
              handleDragStart={handleDragStart}
              handleDragOver={handleDragOver}
              handleDragLeave={handleDragLeave}
              handleDrop={handleDrop}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;
