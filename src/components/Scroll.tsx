"use client";
import InfiniteScroll from "react-infinite-scroll-component";
import UserRecord from "./UserRecord";
import { useTable } from "@/app/context";
import { User } from "@/types";

export const Scroll = () => {
  const { erroredUsers, fetchUsers } = useTable();
  return (
    <InfiniteScroll
      dataLength={erroredUsers.length}
      next={fetchUsers}
      hasMore={true}
      loader={<p className="px-8">Loading...</p>}
      endMessage={<p>No more data to load.</p>}
    >
      <div className="px-8">
        <table>
          <thead>
            <tr>
              <th>index</th>
              <th>id</th>
              <th>name</th>
              <th>address</th>
              <th>phoneNumber</th>
            </tr>
          </thead>
          <tbody>
            {erroredUsers.map((user: User) => (
              <UserRecord key={user.id} record={user} />
            ))}
          </tbody>
        </table>
      </div>
    </InfiniteScroll>
  );
};
