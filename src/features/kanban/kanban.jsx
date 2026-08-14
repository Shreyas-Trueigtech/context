import React from "react";
import { useKanban } from "./hook/useKanban";
import KanbanBoard from "./components/KanbanBoard";

const Kanban = () => {
  const {
    columns,
    activeColumn,
    setActiveColumn,
    draggedItem,
    dragOverColumn,
    register,
    handleSubmit,
    reset,
    addNewTask,
    removeTask,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    totalTasks,
  } = useKanban();

  return (
    <KanbanBoard
      columns={columns}
      totalTasks={totalTasks}
      register={register}
      handleSubmit={handleSubmit}
      reset={reset}
      activeColumn={activeColumn}
      setActiveColumn={setActiveColumn}
      draggedItem={draggedItem}
      dragOverColumn={dragOverColumn}
      addNewTask={addNewTask}
      removeTask={removeTask}
      handleDragStart={handleDragStart}
      handleDragOver={handleDragOver}
      handleDragLeave={handleDragLeave}
      handleDrop={handleDrop}
    />
  );
};

export default Kanban;