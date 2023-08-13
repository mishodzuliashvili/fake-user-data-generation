"use client";
import { useTable } from "@/app/context";
import downloadCsv from "@/utils/downloadCSV";
import { Parser } from "@json2csv/plainjs";

const ExportCSV = () => {
  const { erroredUsers, region } = useTable();

  const dataOfUsers = erroredUsers.map((user) => {
    if (region.hasMiddleName) {
      return user;
    } else {
      const newUser = { ...user };
      delete newUser.middleName;
      return newUser;
    }
  });

  const handleExport = () => {
    try {
      const parser = new Parser({});
      const csv = parser.parse(dataOfUsers);
      downloadCsv("fake_user_data.csv", csv);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <button
        onClick={handleExport}
        className="px-4 py-3 text-black font-medium border border-gray-300 duration-300 hover:text-gray-500"
      >
        Export CSV
      </button>
    </div>
  );
};

export default ExportCSV;
