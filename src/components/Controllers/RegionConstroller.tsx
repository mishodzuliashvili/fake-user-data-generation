"use client";
import { useTable } from "@/app/context";
import { Region } from "@/types";
import Regions from "@/utils/regions";
import MySelect from "../Inputs/MySelect";

const options = Object.values(Regions).map((region) => ({
  value: region,
  label: region.label,
}));

type Option = {
  value: Region;
  label: string;
};

const RegionController = () => {
  const { setRegion, region } = useTable();

  return (
    <div className="w-full sm:w-auto">
      <MySelect
        value={options.find((option) => option.value === region)}
        onChange={(selectedOption: Option) =>
          setRegion(selectedOption.value as Region)
        }
        options={options}
      />
    </div>
  );
};

export default RegionController;
