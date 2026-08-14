import React from "react";
import { Plus, Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import KanbanColumn from "./KanbanColumn";

const KanbanBoard = ({
  columns,
  register,
  handleSubmit,
  addNewTable,
  reset,
  activeColumn,
  setActiveColumn,
  draggedItem,
  dragOverColumn,
  addNewTask,
  removeTask,
  editTask,
  handleDragStart,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  searchTerm,
  setSearchTerm,
  openNewTablePopup,
  closeNewTablePopup,
  popScreen,
  openNewTaskPopup,
  closeTaskPopup,
  editingTask,
}) => {
  return (
    <div className="min-h-screen w-full bg-background p-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Kanban Board</h1>

            <p className="text-sm text-muted-foreground">
              Manage and organize your tasks
            </p>
          </div>

          <div className="flex items-center justify-center gap-2">
            <div className="relative w-full bg-white md:w-80">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search tasks..."
                className="pl-9"
              />
            </div>
            <Button type="button" onClick={() => openNewTaskPopup("todo")}>
              <Plus size={18} /> Add
            </Button>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
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
              editTask={editTask}
              handleDragStart={handleDragStart}
              handleDragOver={handleDragOver}
              handleDragLeave={handleDragLeave}
              handleDrop={handleDrop}
            />
          ))}
        </div>

        {Object.values(columns).every((column) => column.items.length === 0) &&
          searchTerm.trim() && (
            <div className="mt-10 text-center text-sm text-muted-foreground">
              No tasks found for "{searchTerm}"
            </div>
          )}
      </div>

      {popScreen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl border border-border bg-white p-4 shadow-xl">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {editingTask ? "Edit task" : "Add task"}
              </h2>

              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                onClick={closeNewTablePopup}
                aria-label="Close task editor"
              >
                <X size={14} />
              </Button>
            </div>

            <Textarea
              autoFocus
              {...register("newTaskTable")}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  handleSubmit(() => addNewTable())();
                }

                if (event.key === "Escape") {
                  closeNewTablePopup();
                }
              }}
              placeholder="Describe the task..."
              rows={4}
              className="min-h-0 resize-none rounded-md border bg-background text-sm"
            />

            <div className="mt-4 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={closeTaskPopup}>
                Cancel
              </Button>

              <Button type="button" onClick={handleSubmit(() => addNewTable())}>
                {editingTask ? "Save changes" : "Add task"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KanbanBoard;
