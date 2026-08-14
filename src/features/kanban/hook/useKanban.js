import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { KANBAN_INITIAL_COLUMNS } from "../constant/kanbanConstants";

export const useKanban = () => {
  const [columns, setColumns] = useState(KANBAN_INITIAL_COLUMNS);
  const [activeColumn, setActiveColumn] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);

  const form = useForm({
    defaultValues: {
      task: "",
    },
  });

  const { register, handleSubmit, reset, watch } = form;
  const newTask = watch("task");

  const addNewTask = (columnId) => {
    const value = newTask?.trim();
    if (!value) return;

    setColumns((prev) => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        items: [
          ...prev[columnId].items,
          { id: Date.now().toString(), content: value },
        ],
      },
    }));

    reset({ task: "" });
    setActiveColumn(null);
  };

  const removeTask = (columnId, taskId) => {
    setColumns((prev) => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        items: prev[columnId]?.items.filter((item) => item.id !== taskId),
      },
    }));
  };

  const handleDragStart = (columnId, item) => {
    setDraggedItem({ columnId, item });
  };

  const handleDragOver = (event, columnId) => {
    event.preventDefault();
    setDragOverColumn(columnId);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (event, columnId) => {
    event.preventDefault();
    setDragOverColumn(null);

    if (!draggedItem) return;

    const { columnId: sourceColumnId, item } = draggedItem;

    setColumns((prev) => {
      const next = { ...prev };

      next[sourceColumnId] = {
        ...next[sourceColumnId],
        items: next[sourceColumnId].items.filter(
          (current) => current.id !== item.id,
        ),
      };

      next[columnId] = {
        ...next[columnId],
        items: [...next[columnId].items, item],
      };

      return next;
    });

    setDraggedItem(null);
  };

  const totalTasks = useMemo(
    () =>
      Object.values(columns).reduce(
        (sum, column) => sum + column.items.length,
        0,
      ),
    [columns],
  );

  return {
    columns,
    newTask,
    form,
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
    totalTasks,
  };
};
