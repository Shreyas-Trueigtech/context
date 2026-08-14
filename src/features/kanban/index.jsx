import React from "react";
import { useKanban } from "./hook/useKanban";
import KanbanBoard from "./components/KanbanBoard";

const Kanban = () => {
  const kanban = useKanban();

  return <KanbanBoard {...kanban} />;
};

export default Kanban;