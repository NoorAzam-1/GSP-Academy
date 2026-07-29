export const getDaysDifference = (dateString) => {
  const today = new Date();
  const targetDate = new Date(dateString);
  const diffTime = targetDate - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const formatCurrency = (amount) => {
  return `₹${Number(amount).toLocaleString()}`;
};

export const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const getInitials = (name) => {
  if (!name) return "??";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

export const getTodayString = () => {
  return new Date().toISOString().split("T")[0];
};

export const getCurrentMonth = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return months[new Date().getMonth()];
};

export const isToday = (dateString) => {
  if (!dateString) return false;
  return dateString === getTodayString();
};

export const isOverdue = (dateString) => {
  if (!dateString) return false;
  return new Date(dateString) < new Date();
};
