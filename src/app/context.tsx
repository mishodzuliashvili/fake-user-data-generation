"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import Regions from "../utils/regions";
import { generateRandomUsersFactory } from "@/utils/generateRandomUsers";
import { Region, User } from "@/types";
import { introduceErrors } from "@/utils/generateErrors";
import calculatePageSeed from "@/utils/calculatePageSeed";
import generateRandomSeed from "@/utils/generateRandomSeed";

const TableContext = createContext(
  {} as {
    region: Region;
    setRegion: React.Dispatch<React.SetStateAction<Region>>;
    users: User[];
    erroredUsers: User[];
    incrementPage: () => void;
    errorAmount: number;
    setErrorAmount: React.Dispatch<React.SetStateAction<number>>;
    setUserSeed: React.Dispatch<React.SetStateAction<number>>;
    userSeed: number;
  }
);

const USERS_PER_PAGE = 10;
const FIRST_PAGE_SIZE = 20;

export function TableProvider({ children }: { children: React.ReactNode }) {
  const [region, setRegion] = useState<Region>(Regions.US);
  const [errorAmount, setErrorAmount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [userSeed, setUserSeed] = useState<number>(0);
  const [users, setUsers] = useState<User[]>([]);
  const [erroredUsers, setErroredUsers] = useState<User[]>([]);
  const [generateRandomUser, setGenerateRandomUser] = useState<any>(null);

  useEffect(() => {
    setUserSeed(generateRandomSeed());
  }, []);

  const fetchUsers = (pageSize = USERS_PER_PAGE, pageNum: number) => {
    applySeed(pageNum);
    const newUsers = Array.from({ length: pageSize }, () =>
      generateRandomUser()
    );
    applySeed(pageNum);
    const newErrorUsers = introduceErrors(newUsers, errorAmount, region);
    return {
      newUsers,
      newErrorUsers,
    };
  };

  useEffect(() => {
    setGenerateRandomUser(() => generateRandomUsersFactory(region.faker));
  }, [region, userSeed]);

  const incrementPage = () => {
    const { newErrorUsers, newUsers } = fetchUsers(USERS_PER_PAGE, page + 1);
    setPage(page + 1);
    setUsers([...users, ...newUsers]);
    setErroredUsers([...erroredUsers, ...newErrorUsers]);
  };

  useEffect(() => {
    if (generateRandomUser) {
      const { newErrorUsers, newUsers } = fetchUsers(20, 1);
      setPage(1);
      setUsers(newUsers);
      setErroredUsers(newErrorUsers);
    }
  }, [generateRandomUser]);

  function getUsersByPage(pageNum: number) {
    const startIndex =
      pageNum === 1 ? 0 : FIRST_PAGE_SIZE + (pageNum - 2) * USERS_PER_PAGE;
    const endIndex = FIRST_PAGE_SIZE + (pageNum - 1) * USERS_PER_PAGE;
    const normalUsers = users.slice(startIndex, endIndex);
    return normalUsers;
  }

  function applySeed(pageNum: number) {
    const pageSeed = calculatePageSeed(pageNum, userSeed);
    region.faker.seed(pageSeed);
  }

  function getErroredUsers(untilPage: number) {
    const erroredUsers: User[] = [];
    for (let i = 1; i <= untilPage; i++) {
      applySeed(i);
      const normalUsers = getUsersByPage(i);
      const newErrorUsers = introduceErrors(normalUsers, errorAmount, region);
      erroredUsers.push(...newErrorUsers);
    }
    return erroredUsers;
  }

  useEffect(() => {
    if (generateRandomUser) {
      const newErrorUsers = getErroredUsers(page);
      setErroredUsers(newErrorUsers);
    }
  }, [errorAmount]);

  return (
    <TableContext.Provider
      value={{
        region,
        setRegion,
        users,
        erroredUsers,
        incrementPage,
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
