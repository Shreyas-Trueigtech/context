import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { KANBAN_INITIAL_COLUMNS } from "../constant/kanbanConstants";
import { useDebounce } from "./useDebounce";

export const useKanban = () => {
  const [columns, setColumns] = useState(KANBAN_INITIAL_COLUMNS);
  const [activeColumn, setActiveColumn] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [popScreen, setPopScreen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const form = useForm({
    defaultValues: {
      task: "",
      newTaskTable: "",
    },
  });

  const { register, handleSubmit, reset, watch } = form;

  const newTask = watch("task");
  const newTaskTable = watch("newTaskTable");

  const addNewTable = () => {
    const name = newTaskTable?.trim();

    if (!name) return;

    const columnId = name.toLowerCase().replace(/\s+/g, "-");

    setColumns((prev) => ({
      ...prev,
      [columnId]: {
        name,
        dot: "bg-indigo-500",
        header: "text-indigo-600",
        ring: "ring-indigo-300",
        soft: "bg-indigo-50",
        items: [],
      },
    }));

    closeNewTablePopup();
  };

  const openNewTablePopup = () => {
    reset({ newTaskTable: "" });
    setPopScreen(true);
  };

  const closeNewTablePopup = () => {
    setPopScreen(false);
    reset({ newTaskTable: "" });
  };

  const addNewTask = (columnId) => {
    const value = newTask?.trim();

    if (!value) return;

    if (editingTask) {
      setColumns((prev) => ({
        ...prev,

        [editingTask.columnId]: {
          ...prev[editingTask.columnId],

          items: prev[editingTask.columnId].items.map((item) =>
            item.id === editingTask.taskId
              ? {
                  ...item,
                  content: value,
                }
              : item,
          ),
        },
      }));

      closeTaskPopup();

      return;
    }

    setColumns((prev) => ({
      ...prev,

      [columnId]: {
        ...prev[columnId],

        items: [
          ...prev[columnId].items,
          {
            id: Date.now().toString(),
            content: value,
          },
        ],
      },
    }));

    closeTaskPopup();
  };

  const removeTask = (columnId, taskId) => {
    setColumns((prev) => ({
      ...prev,

      [columnId]: {
        ...prev[columnId],

        items: prev[columnId].items.filter((item) => item.id !== taskId),
      },
    }));
  };

  const openNewTaskPopup = (columnId) => {
    setEditingTask(null);

    reset({
      task: "",
    });

    setActiveColumn(columnId);
    setPopScreen(true);
  };

  const editTask = (columnId, taskId) => {
    const task = columns[columnId]?.items.find((item) => item.id === taskId);

    if (!task) return;

    setEditingTask({
      columnId,
      taskId,
    });

    reset({
      task: task.content,
    });

    setActiveColumn(columnId);
    setPopScreen(true);
  };

  const closeTaskPopup = () => {
    setPopScreen(false);
    setEditingTask(null);
    setActiveColumn(null);

    reset({
      task: "",
    });
  };

  const handleDragStart = (columnId, item) => {
    setDraggedItem({
      columnId,
      item,
    });
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

  const filteredColumns = useMemo(() => {
    const search = debouncedSearchTerm.trim().toLowerCase();

    if (!search) {
      return columns;
    }

    return Object.entries(columns).reduce((result, [columnId, column]) => {
      const filteredItems = column.items.filter((item) =>
        item.content.toLowerCase().includes(search),
      );

      result[columnId] = {
        ...column,
        items: filteredItems,
      };

      return result;
    }, {});
  }, [columns, debouncedSearchTerm]);

  const totalTasks = useMemo(
    () =>
      Object.values(columns).reduce(
        (sum, column) => sum + column.items.length,
        0,
      ),
    [columns],
  );

  return {
    columns: filteredColumns,
    allColumns: columns,

    newTask,
    newTaskTable,
    form,
    register,
    handleSubmit,
    reset,

    addNewTable,
    activeColumn,
    setActiveColumn,

    popScreen,
    setPopScreen,
    openNewTaskPopup,
    closeTaskPopup,

    editingTask,
    editTask,

    addNewTask,
    removeTask,
    draggedItem,
    dragOverColumn,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    openNewTablePopup,
    closeNewTablePopup,
    totalTasks,
    searchTerm,
    setSearchTerm,
    debouncedSearchTerm,
  };
};
