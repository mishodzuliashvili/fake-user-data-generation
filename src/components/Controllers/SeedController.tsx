"use client";
import { useTable } from "@/app/context";
import generateRandomSeed from "@/utils/generateRandomSeed";
import InputNumber from "rc-input-number";
export const SeedController = () => {
  const { userSeed, setUserSeed } = useTable();
  const handleClick = () => {
    const randomNumber = generateRandomSeed();
    setUserSeed(randomNumber);
  };
  return (
    <div className="flex gap-4 items-center flex-wrap w-full sm:w-auto">
      <button
        onClick={handleClick}
        className="px-4 py-3 bg-black font-medium text-white w-full sm:w-auto duration-300 hover:bg-gray-800"
      >
        Random Seed
      </button>
      <InputNumber
        aria-label="Number input example of very small increments"
        value={userSeed}
        precision={0}
        className="seed px-2 py-3 pr-0 border-tsecondary border w-full sm:w-auto"
        onChange={(newValue) => {
          if (newValue || newValue === 0) {
            setUserSeed(newValue);
          }
        }}
      />
    </div>
  );
};
