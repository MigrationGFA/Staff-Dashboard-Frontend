export const formatDate = (isoString) => {
  if (!isoString) return "";
  return new Date(isoString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }); // -> "01 Feb 2024"
};
