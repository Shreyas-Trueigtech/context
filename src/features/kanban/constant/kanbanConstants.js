export const KANBAN_INITIAL_COLUMNS = {
  todo: {
    name: "To Do",
    dot: "bg-indigo-500",
    header: "text-indigo-600",
    ring: "ring-indigo-300",
    soft: "bg-indigo-50",
    items: [
      {
        id: "1",
        content: "Market research",
        description:
          "Research target audience, market size, and demand for the product.",
      },
      {
        id: "2",
        content: "Competitor analysis",
        description:
          "Identify key competitors and evaluate their strengths and weaknesses.",
      },
    ],
  },
  inProgress: {
    name: "In Progress",
    dot: "bg-amber-500",
    header: "text-amber-600",
    ring: "ring-amber-300",
    soft: "bg-amber-50",
    items: [
      {
        id: "3",
        content: "Competitor analysis",
        description:
          "Identify key competitors and evaluate their strengths and weaknesses.",
      },
    ],
  },
  done: {
    name: "Done",
    dot: "bg-emerald-500",
    header: "text-emerald-600",
    ring: "ring-emerald-300",
    soft: "bg-emerald-50",
    items: [],
  },
  Working: {
    name: "Working",
    dot: "bg-gray-500",
    header: "text-gray-600",
    ring: "ring-emerald-300",
    soft: "bg-emerald-50",
    items: [],
  },
};
