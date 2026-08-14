export const KANBAN_INITIAL_COLUMNS = {
  todo: {
    name: "To Do",
    dot: "bg-indigo-500",
    header: "text-indigo-600",
    ring: "ring-indigo-300",
    soft: "bg-indigo-50",
    items: [
      { id: "1", content: "Market research" },
      { id: "2", content: "Competitor analysis" },
    ],
  },
  inProgress: {
    name: "In Progress",
    dot: "bg-amber-500",
    header: "text-amber-600",
    ring: "ring-amber-300",
    soft: "bg-amber-50",
    items: [{ id: "3", content: "Landing page draft" }],
  },
  done: {
    name: "Done",
    dot: "bg-emerald-500",
    header: "text-emerald-600",
    ring: "ring-emerald-300",
    soft: "bg-emerald-50",
    items: [
      { id: "4", content: "Kickoff meeting" },
      { id: "5", content: "Budget approval" },
    ],
  },
  Working: {
    name: "Working",
    dot: "bg-gray-500",
    header: "text-gray-600",
    ring: "ring-emerald-300",
    soft: "bg-emerald-50",
    items: [
      { id: "4", content: "Kickoff meeting" },
      { id: "5", content: "Budget approval" },
    ],
  },
};
