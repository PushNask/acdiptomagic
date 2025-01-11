export const getStatusColor = (status: string) => {
  const colors = {
    new: "bg-purple-100 text-purple-800",
    in_progress: "bg-blue-100 text-blue-800",
    pending_payment: "bg-yellow-100 text-yellow-800",
    completed: "bg-green-100 text-green-800",
  };
  return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
};

export const getPriorityColor = (priority: string) => {
  const colors = {
    high: "bg-red-100 text-red-800",
    medium: "bg-yellow-100 text-yellow-800",
    low: "bg-green-100 text-green-800",
  };
  return colors[priority as keyof typeof colors] || "bg-gray-100 text-gray-800";
};