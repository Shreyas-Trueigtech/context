import React from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import KanbanTaskCard from "./KanbanTaskCard";
import { Input } from "@/components/ui/input";

const AddTaskForm = ({
  columnId,
  register,
  handleSubmit,
  reset,
  addNewTask,
  setActiveColumn,
}) => {
  return (
    <form
      className="mt-3 space-y-2 rounded-xl border border-border bg-muted/30 p-3"
      onSubmit={handleSubmit(() => addNewTask(columnId))}
    >
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

      <div className="flex items-center gap-2">
        <Button type="submit" size="sm">
          Add task
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            setActiveColumn(null);

            reset({
              task: "",
            });
          }}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

const KanbanColumn = ({
  columnId,
  column,
  dragOverColumn,
  draggedItem,
  activeColumn,
  setActiveColumn,
  register,
  handleSubmit,
  reset,
  removeColumn,
  addNewTask,
  removeTask,
  editTask,
  handleDragStart,
  handleDragOver,
  handleDragLeave,
  handleDrop,
}) => {
  return (
    <Card
      onDragOver={(event) => handleDragOver(event, columnId)}
      onDragLeave={handleDragLeave}
      onDrop={(event) => handleDrop(event, columnId)}
      className={`flex h-full flex-col bg-white p-0 transition-shadow ${
        dragOverColumn === columnId
          ? `ring-2 ${column.ring} shadow-lg`
          : "shadow-sm"
      }`}
    >
      <CardHeader className="px-4 pb-3 pt-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${column.dot}`} />

            <h2 className={`text-sm font-semibold ${column.header}`}>
              {column.name}
            </h2>

            <Badge variant="secondary" className="rounded-full">
              {column.items.length}
            </Badge>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            onClick={() => removeColumn(columnId)}
            className="text-muted-foreground hover:text-destructive"
            aria-label={`Delete ${column.name} column`}
          >
            <X size={14} />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex min-h-20 flex-1 flex-col gap-2 px-4 pb-4">
        {column.items.map((item) => (
          <KanbanTaskCard
            key={item.id}
            item={item}
            columnId={columnId}
            draggedItem={draggedItem}
            removeTask={removeTask}
            editTask={editTask}
            handleDragStart={handleDragStart}
          />
        ))}

        {column.items.length === 0 && dragOverColumn === columnId && (
          <div
            className={`flex-1 rounded-xl border-2 border-dashed ${column.ring} ${column.soft}`}
          />
        )}

        {activeColumn === columnId ? (
          <AddTaskForm
            columnId={columnId}
            register={register}
            handleSubmit={handleSubmit}
            reset={reset}
            addNewTask={addNewTask}
            setActiveColumn={setActiveColumn}
          />
        ) : (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              setActiveColumn(columnId);

              reset({
                task: "",
              });
            }}
            className="mt-2 justify-start gap-1.5 px-2 text-muted-foreground hover:text-foreground"
          >
            <Plus size={16} />
            Add task
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default KanbanColumn;
