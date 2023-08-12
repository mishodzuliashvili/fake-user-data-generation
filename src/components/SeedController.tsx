"use client";
import { useTable } from "@/app/context";
import { useState } from "react";
export const SeedController = () => {
  const { userSeed, setUserSeed } = useTable();
  const handleClick = () => {
    const randomNumber = Math.floor(Math.random() * 1000);
    setUserSeed(randomNumber);
  };
  return (
    <div className="flex gap-4 items-center flex-wrap w-full sm:w-auto">
      <button
        onClick={handleClick}
        className="px-4 py-3 bg-black font-medium text-white w-full sm:w-auto"
      >
        Random Seed
      </button>
      <input
        className="px-2 py-3 border-gray-300 border outline-none w-full sm:w-auto"
        type="text"
        value={userSeed}
        onChange={(e) => setUserSeed(parseFloat(e.target.value))}
        placeholder="Seed..."
      />
    </div>
  );
};
