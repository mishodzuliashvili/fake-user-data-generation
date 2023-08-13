"use client";
import React, { useState } from "react";
import { useTable } from "@/app/context";
import MyRange from "../Inputs/MyRange";
import InputNum from "rc-input-number";
const STEP = 0.01;
const MIN = 0;
const MAX = 10;
const INPUT_MAX = 1000;

const ErrorAmountController = () => {
  const { setErrorAmount, errorAmount } = useTable();

  return (
    <div className="flex items-center gap-6 w-full sm:w-72 pl-4">
      <MyRange
        step={STEP}
        min={MIN}
        max={MAX}
        value={errorAmount > 10 ? 10 : errorAmount}
        onChange={(value: number) => setErrorAmount(value)}
      />

      <InputNum
        aria-label="Number input example of very small increments"
        min={MIN}
        max={INPUT_MAX}
        step={STEP}
        value={errorAmount}
        precision={2}
        className="w-16 px-2 py-3 pr-0"
        onChange={(newValue) => {
          if (newValue || newValue === 0) {
            setErrorAmount(newValue);
          }
        }}
      />
    </div>
  );
};

export default ErrorAmountController;
