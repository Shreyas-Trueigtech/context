import React from "react";
import { GripVertical, Info, Pencil, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const KanbanTaskCard = ({
  item,
  columnId,
  draggedItem,
  removeTask,
  editTask,
  handleDragStart,
}) => {  
  return (
    <Card
      draggable
      onDragStart={() => handleDragStart(columnId, item)}
      className={`group cursor-grab border bg-background p-3 shadow-sm transition hover:shadow-md active:cursor-grabbing ${
        draggedItem?.item.id === item.id ? "opacity-40" : ""
      }`}
    >
      <div className="flex items-start gap-2">
        <GripVertical
          size={14}
          className="mt-0.5 shrink-0 text-muted-foreground group-hover:text-foreground"
        />

        <div className="flex-1 flex flex-col gap-1 text-sm text-foreground">
          <p className="font-medium leading-snug line-clamp-2">
            {item.content}
          </p>
          {item.description && (
            <p className="text-xs text-muted-foreground leading-snug line-clamp-2">
              {item.description}
            </p>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={() => editTask(columnId, item.id)}
          aria-label="Edit task"
          className="shrink-0 opacity-0 transition group-hover:opacity-100"
        >
          <Pencil size={14} />
        </Button>

        <Button
          variant="ghost"
          size="icon-xs"
          onClick={() => editTask(columnId, item.id)}
          aria-label="info task"
          className="shrink-0 opacity-0 transition group-hover:opacity-100"
        >
          <Info size={14} />
        </Button>

        <Button
          variant="ghost"
          size="icon-xs"
          onClick={() => removeTask(columnId, item.id)}
          aria-label="Delete task"
          className="shrink-0 opacity-0 transition group-hover:opacity-100"
        >
          <X size={14} />
        </Button>
      </div>
    </Card>
  );
};

export default KanbanTaskCard;
