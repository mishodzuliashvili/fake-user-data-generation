import ErrorAmountController from "./ErrorAmountController";
import ExportCSV from "./ExportCSV";
import RegionController from "./RegionConstroller";
import { SeedController } from "./SeedController";

const Controllers = () => {
  return (
    <div className="flex gap-4 items-center flex-wrap px-8 py-3">
      <RegionController />
      <ErrorAmountController />
      <SeedController />
      <ExportCSV />
    </div>
  );
};

export default Controllers;
