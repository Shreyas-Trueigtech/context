import React from "react";
import { GripVertical, Pencil, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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

        <span className="flex-1 leading-snug text-sm text-foreground">
          {item.content}
        </span>

        <Button
          variant="ghost"
          size="icon-xs"
          onClick={() => editTask(columnId, item.id)}
          aria-label="Delete task"
          className="shrink-0 opacity-0 transition group-hover:opacity-100"
        >
          <Pencil size={14} />
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
