"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import Regions from "../utils/regions";
import { generateRandomUsersFactory } from "@/utils/generateRandomUsers";
import { Region, User } from "@/types";
import { introduceErrors } from "@/utils/generateErrors";
import calculatePageSeed from "@/utils/calculatePageSeed";

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

  const fetchUsers = (pageSize = USERS_PER_PAGE, pageNum: number) => {
    const pageSeed = calculatePageSeed(pageNum, pageSize, userSeed);
    region.faker.seed(pageSeed);
    const newUsers = Array.from({ length: pageSize }, () =>
      generateRandomUser()
    );
    region.faker.seed(pageSeed);
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

  function fetchErroredUsers(
    untilPage: number,
    firstPageSize = 20,
    pageSize = USERS_PER_PAGE
  ) {
    // TODO: Make this shorter somehow
    const erroredUsers: User[] = [];
    const pageSeed = calculatePageSeed(1, firstPageSize, userSeed);
    region.faker.seed(pageSeed);
    const normalUsers = users.slice(0, firstPageSize);
    const newErrorUsers = introduceErrors(normalUsers, errorAmount, region);
    erroredUsers.push(...newErrorUsers);
    for (let i = 2; i <= untilPage; i++) {
      const pageSeed = calculatePageSeed(i, pageSize, userSeed);
      region.faker.seed(pageSeed);
      const normalUsers = users.slice(
        firstPageSize + (i - 2) * pageSize,
        firstPageSize + (i - 1) * pageSize
      );
      const newErrorUsers = introduceErrors(normalUsers, errorAmount, region);
      erroredUsers.push(...newErrorUsers);
    }
    return erroredUsers;
  }

  useEffect(() => {
    if (generateRandomUser) {
      const newErrorUsers = fetchErroredUsers(page, 20, USERS_PER_PAGE);
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
