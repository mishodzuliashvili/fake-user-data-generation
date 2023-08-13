import React from "react";
import { BiMessageAltError } from "react-icons/bi";
import { Range, getTrackBackground } from "react-range";

const MyRange = ({ step, min, max, value, onChange }) => {
  return (
    <Range
      values={[value]}
      step={step}
      min={min}
      max={max}
      onChange={(newValues) => onChange(newValues[0])}
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
                values: [value],
                colors: ["black", "#ccc"],
                min: min,
                max: max,
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
              border: "1px solid #cccccc",
              outline: "none",
            }}
          >
            <div
              style={{
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
  );
};

export default MyRange;
