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
  searchTerm,
  setSearchTerm,
  openNewTaskPopup,
  openNewTablePopup,
  closeNewTablePopup,
  closeTaskPopup,
  popScreen,
  popTableScreen,
  saveTask,
  editingTask,
  ...columnProps
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
            <div className="relative w-full md:w-80">
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
            <Button
              type="button"
              variant="secondary"
              onClick={openNewTablePopup}
              className="gap-1.5"
            >
              <Plus size={18} /> Add Column
            </Button>
            <Button
              type="button"
              onClick={() =>
                openNewTaskPopup(Object.keys(columns)[0] || "todo")
              }
              className="gap-1.5"
            >
              <Plus size={18} /> Add Task
            </Button>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
          {Object.entries(columns).map(([columnId, column]) => (
            <KanbanColumn
              key={columnId}
              columnId={columnId}
              column={column}
              register={register}
              handleSubmit={handleSubmit}
              {...columnProps}
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

      {popTableScreen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl border border-border bg-white p-4 shadow-xl">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Add New Column</h2>
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                onClick={closeNewTablePopup}
                aria-label="Close add column editor"
              >
                <X size={14} />
              </Button>
            </div>

            <Input
              autoFocus
              {...register("newTaskTable")}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleSubmit(() => addNewTable())();
                }
                if (event.key === "Escape") {
                  closeNewTablePopup();
                }
              }}
              placeholder="Column name..."
              className="rounded-md border bg-background text-sm"
            />

            <div className="mt-4 flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={closeNewTablePopup}
              >
                Cancel
              </Button>
              <Button type="button" onClick={handleSubmit(() => addNewTable())}>
                Add Column
              </Button>
            </div>
          </div>
        </div>
      )}

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
                onClick={closeTaskPopup}
                aria-label="Close task editor"
              >
                <X size={14} />
              </Button>
            </div>
            <div className="flex flex-col gap-2">
            <Input
              autoFocus
              {...register("task")}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();

                  handleSubmit(() => addNewTask(columnId))();
                }

                if (event.key === "Escape") {
                  setActiveColumn(null);

                  reset({
                    task: "",
                  });
                }
              }}
              placeholder="Task tittle..."
              rows={2}
              className="min-h-0 resize-none rounded-md border bg-background text-sm"
            />

            <Textarea
              autoFocus
              {...register("taskDesc")}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();

                  handleSubmit(() => addNewTask(columnId))();
                }

                if (event.key === "Escape") {
                  setActiveColumn(null);

                  reset({
                    task: "",
                  });
                }
              }}
              placeholder="Description the task..."
              rows={2}
              className="min-h-0 resize-none rounded-md border bg-background text-sm"
            />
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={closeTaskPopup}>
                Cancel
              </Button>
              <Button type="button" onClick={handleSubmit(() => saveTask())}>
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
