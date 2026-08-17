import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { KANBAN_INITIAL_COLUMNS } from "../constant/kanbanConstants";
import { useDebounce } from "./useDebounce";

export const useKanban = () => {
  const [columns, setColumns] = useState(KANBAN_INITIAL_COLUMNS);
  const [activeColumn, setActiveColumn] = useState(null);
  const [modalColumnId, setModalColumnId] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [popScreen, setPopScreen] = useState(false);
  const [popTableScreen, setPopTableScreen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const form = useForm({
    defaultValues: {
      task: "",
      taskDesc: "",
      newTaskTable: "",
    },
  });

  const { register, handleSubmit, reset, watch } = form;

  const newTask = watch("task")?.trim();
  const newTaskDesc = watch("taskDesc")?.trim();

  // const newTaskObj = {
  //   task: newTask,
  //   description: newTaskDesc,
  // };

  const newTaskTable = watch("newTaskTable");

  const saveTask = () => {
    const value = {
      content: newTask,
      description: newTaskDesc,
    };

    if (!value.content) return;

    if (editingTask) {
      updateTask(editingTask.columnId, editingTask.taskId, value);
    } else if (modalColumnId) {
      addNewTask(modalColumnId, value);
    } else if (activeColumn) {
      addNewTask(activeColumn, value);
    } else {
      const firstColumnId = Object.keys(columns)[0] || "todo";
      addNewTask(firstColumnId, value);
    }

    closeTaskPopup();
  };

  const addNewTable = () => {
    const name = newTaskTable?.trim();

    if (!name) return;

    const baseColumnId = name.toLowerCase().replace(/\s+/g, "-");
    const columnId = columns[baseColumnId]
      ? `${baseColumnId}-${Date.now()}`
      : baseColumnId;

    const colorPalettes = [
      {
        dot: "bg-indigo-500",
        header: "text-indigo-600",
        ring: "ring-indigo-300",
        soft: "bg-indigo-50",
      },
      {
        dot: "bg-amber-500",
        header: "text-amber-600",
        ring: "ring-amber-300",
        soft: "bg-amber-50",
      },
      {
        dot: "bg-emerald-500",
        header: "text-emerald-600",
        ring: "ring-emerald-300",
        soft: "bg-emerald-50",
      },
      {
        dot: "bg-purple-500",
        header: "text-purple-600",
        ring: "ring-purple-300",
        soft: "bg-purple-50",
      },
      {
        dot: "bg-rose-500",
        header: "text-rose-600",
        ring: "ring-rose-300",
        soft: "bg-rose-50",
      },
      {
        dot: "bg-sky-500",
        header: "text-sky-600",
        ring: "ring-sky-300",
        soft: "bg-sky-50",
      },
      {
        dot: "bg-gray-500",
        header: "text-gray-600",
        ring: "ring-gray-300",
        soft: "bg-gray-50",
      },
    ];
    const theme =
      colorPalettes[Object.keys(columns).length % colorPalettes.length];

    setColumns((prev) => ({
      ...prev,
      [columnId]: {
        name,
        dot: theme.dot,
        header: theme.header,
        ring: theme.ring,
        soft: theme.soft,
        items: [],
      },
    }));

    closeNewTablePopup();
  };

  const openNewTablePopup = () => {
    setActiveColumn(null);
    setPopScreen(false);
    reset({ newTaskTable: "" });
    setPopTableScreen(true);
  };

  const closeNewTablePopup = () => {
    setPopTableScreen(false);
    reset({ newTaskTable: "" });
  };

  const removeColumn = (columnId) => {
    setColumns((prev) => {
      const updatedColumns = { ...prev };

      delete updatedColumns[columnId];

      return updatedColumns;
    });
  };

  const addNewTask = (columnId, explicitValue) => {

    const value =
      explicitValue !== undefined
        ? explicitValue
        : { content: newTask, description: newTaskDesc };

        

        console.log('value',value);
        
    const content = value?.content?.trim();
    if (!content) return;

    setColumns((prev) => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        items: [
          ...prev[columnId].items,
          {
            id: Date.now().toString(),
            content,
            description: value?.description?.trim(),
          },
        ],
      },
    }));

    setActiveColumn(null);
    reset({ task: "", taskDesc: "" });
  };

  const updateTask = (columnId, taskId, updatedFields) => {
    const content = updatedFields?.content?.trim();
    if (!content) return;

    setColumns((prev) => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        items: prev[columnId].items.map((item) =>
          item.id === taskId
            ? {
                ...item,
                content,
                description: updatedFields?.description?.trim() ?? "",
              }
            : item,
        ),
      },
    }));
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
    setModalColumnId(columnId || Object.keys(columns)[0] || "todo");
    setActiveColumn(null);
    setPopTableScreen(false);

    reset({ task: "", taskDesc: "" });

    setPopScreen(true);
  };

  const editTask = (columnId, taskId) => {
    const task = columns[columnId]?.items.find((item) => item.id === taskId);
    if (!task) return;

    setEditingTask({ columnId, taskId });
    setModalColumnId(columnId);
    setActiveColumn(null);
    setPopTableScreen(false);

    reset({
      task: task.content,
      taskDesc: task.description ?? "", // ← prefill description
    });

    setPopScreen(true);
  };

  const closeTaskPopup = () => {
    setPopScreen(false);
    setEditingTask(null);
    setModalColumnId(null);

    reset({ task: "", taskDesc: "" });
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
    popTableScreen,
    setPopTableScreen,
    openNewTaskPopup,
    closeTaskPopup,

    editingTask,
    editTask,

    saveTask,
    updateTask,
    removeColumn,
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
