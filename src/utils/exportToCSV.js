import { showToast } from "../component/ShowToast";

/**
 * Converts an array of objects to CSV format and triggers a download.
 * @param {Array} data - The data to be converted to CSV.
 * @param {Array} headers - The headers for the CSV file.
 * @param {string} filename - The name of the file to be downloaded.
 */
export const exportToCSV = (data, headers, filename = "export.csv") => {
  if (!data || !data.length) {
    showToast("No data available to export");
    console.error("No data available to export");
    return;
  }

  const csvRows = [];
  csvRows.push(headers.join(","));

  data.forEach((item) => {
    const row = headers.map((header) =>
      JSON.stringify(item[header], (key, value) =>
        value === null ? "" : value
      )
    );
    csvRows.push(row.join(","));
  });

  const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
