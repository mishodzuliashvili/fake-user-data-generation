"use client";
import { useTable } from "@/app/context";
import { Region } from "@/types";
import Regions from "@/utils/regions";
import Select from "react-select";

const options = Object.values(Regions).map((region) => ({
  value: region,
  label: region.label,
}));

const RegionController = () => {
  const { setRegion, region } = useTable();

  return (
    <div className="w-full sm:w-auto">
      <Select
        id="react-select-3-live-region"
        instanceId="react-select-3-live-region"
        className="w-full sm:w-64"
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.isFocused ? "grey" : "#cccccc",
            padding: "0.25rem",
          }),
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary25: "#cccccc",
            primary: "black",
          },
        })}
        value={options.find((option) => option.value === region)}
        onChange={(selectedOption) =>
          setRegion(selectedOption?.value as Region)
        }
        options={options}
      />
    </div>
  );
};

export default RegionController;
