import ErrorAmountController from "./ErrorAmountController";
import ExportCSV from "./ExportCSV";
import RegionController from "./RegionConstroller";
import { SeedController } from "./SeedController";
import "./index.css";
const Controllers = () => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <RegionController />
      <ErrorAmountController />
      <SeedController />
      <ExportCSV />
    </div>
  );
};

export default Controllers;
