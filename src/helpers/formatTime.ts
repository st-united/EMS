const formatTime = (datetime: string) => {
  const date = new Date(datetime);
  const formattedDate = date.toLocaleString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour12: false,
  });
  return formattedDate;
};

const formatDateTime = (datetime: string) => {
  const date = new Date(datetime);

  const dateStr = date.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const timeStr = date.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return `${dateStr} ${timeStr}`;
};

export { formatTime, formatDateTime };
