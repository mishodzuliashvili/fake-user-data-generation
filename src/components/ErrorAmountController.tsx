"use client";
import React, { useState } from "react";
import { Range, getTrackBackground } from "react-range";
import { BiMessageAltError } from "react-icons/bi";
import { useTable } from "@/app/context";
const STEP = 0.01;
const MIN = 0;
const MAX = 10;

const ErrorAmountController = () => {
  const [values, setValues] = React.useState([0]);
  const [value, setValue] = useState("0");
  const { setErrorAmount } = useTable();
  const handleRangeChange = (values: number[]) => {
    setValues(values);
    setErrorAmount(values[0]);
    setValue(values[0].toString());
  };

  const handleInputChange = (value: string) => {
    setValue(value);
    const floatValue = parseFloat(value);
    if (Number.isNaN(floatValue)) return;
    setErrorAmount(floatValue);
    if (floatValue < 10) {
      setValues([floatValue]);
    } else if (floatValue !== 10) {
      setValues([10]);
    }
  };
  return (
    <div className="flex items-center gap-6 w-full sm:w-72 pl-4">
      <div className="w-full">
        <Range
          values={values}
          step={STEP}
          min={MIN}
          max={MAX}
          onChange={(values) => handleRangeChange(values)}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                height: "36px",
                display: "flex",
                width: "100%",
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: "5px",
                  width: "100%",
                  borderRadius: "0px",
                  background: getTrackBackground({
                    values: values,
                    colors: ["black", "#ccc"],
                    min: MIN,
                    max: MAX,
                  }),
                  alignSelf: "center",
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props, isDragged }) => {
            return (
              <div
                key={props.key}
                aria-valuemax={props["aria-valuemax"]}
                aria-valuemin={props["aria-valuemin"]}
                aria-valuenow={props["aria-valuenow"]}
                draggable={props.draggable}
                onKeyDown={props.onKeyDown}
                onKeyUp={props.onKeyUp}
                ref={props.ref}
                role={props.role}
                tabIndex={props.tabIndex}
                style={{
                  ...props.style,
                  height: "34px",
                  width: "34px",
                  borderRadius: "0px",
                  backgroundColor: "#FFF",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  // boxShadow: "0px 2px 6px #AAA",
                  border: "1px solid #cccccc",
                  outline: "none",
                }}
              >
                <div
                  style={{
                    // height: "16px",
                    // width: "5px",
                    fontSize: "1.3rem",
                    color: isDragged ? "black" : "#CCC",
                  }}
                >
                  <BiMessageAltError />
                </div>
              </div>
            );
          }}
        />
      </div>
      <input
        type="text"
        // step="0.01"
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
        className="w-16 px-2 py-3 pr-0 border-tsecondary outline-none"
        placeholder="Error..."
      />
    </div>
  );
};

export default ErrorAmountController;
