"use client";
import { useTable } from "@/app/context";
import { Parser } from "@json2csv/plainjs";

function downloadCsv(filename: string, csvData: string) {
  const blob = new Blob([csvData], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("href", url);
  a.setAttribute("download", filename);
  a.click();
}

const ExportCSV = () => {
  const { erroredUsers } = useTable();
  const handleExport = () => {
    try {
      const parser = new Parser({});
      const csv = parser.parse(erroredUsers);
      downloadCsv("fake_user_data.csv", csv);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <button
        onClick={handleExport}
        className="px-4 py-3 text-black font-medium border border-gray-300"
      >
        Export CSV
      </button>
    </div>
  );
};

export default ExportCSV;
