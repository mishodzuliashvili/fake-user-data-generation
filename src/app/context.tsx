"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import Regions from "../utils/regions";
import {
  generateRandomUsersFactory,
  introduceErrors,
} from "@/utils/generateRandomUsers";
import { Region, User } from "@/types";

const TableContext = createContext(
  {} as {
    region: Region;
    setRegion: React.Dispatch<React.SetStateAction<Region>>;
    users: User[];
    erroredUsers: User[];
    fetchUsers: () => void;
    errorAmount: number;
    setErrorAmount: React.Dispatch<React.SetStateAction<number>>;
    setUserSeed: React.Dispatch<React.SetStateAction<number>>;
    userSeed: number;
  }
);

export function TableProvider({ children }: { children: React.ReactNode }) {
  const [region, setRegion] = useState<Region>(Regions.US);
  const [errorAmount, setErrorAmount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [userSeed, setUserSeed] = useState<number>(0);
  const [users, setUsers] = useState<User[]>([]);
  const [erroredUsers, setErroredUsers] = useState<User[]>([]);
  const [generateRandomUser, setGenerateRandomUser] = useState<any>(null);
  const usersPerPage = 10;

  const fetchUsers = (amount = usersPerPage) => {
    const pageSeed = userSeed + page;
    region.faker.seed(pageSeed);

    const newUsers = Array.from({ length: amount }, () => generateRandomUser());
    setUsers((users) => [...users, ...newUsers]);
    setPage((page) => page + 1);
  };

  useEffect(() => {
    const generateRandomUser = generateRandomUsersFactory(region.faker);
    setGenerateRandomUser(() => generateRandomUser);
    setUsers([]);
  }, [region, userSeed]);

  useEffect(() => {
    console.log("changed");
    if (generateRandomUser !== null) {
      fetchUsers(20);
    }
  }, [generateRandomUser]);

  useEffect(() => {
    setErroredUsers(introduceErrors(users, errorAmount, region));
  }, [errorAmount, users]);
  return (
    <TableContext.Provider
      value={{
        region,
        setRegion,
        users,
        erroredUsers,
        fetchUsers,
        errorAmount,
        setErrorAmount,
        setUserSeed,
        userSeed,
      }}
    >
      {children}
    </TableContext.Provider>
  );
}

export function useTable() {
  return useContext(TableContext);
}
