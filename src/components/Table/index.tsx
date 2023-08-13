"use client";
import InfiniteScroll from "react-infinite-scroll-component";
import { useTable } from "@/app/context";
import { User } from "@/types";
import "./index.css";
import UserRecord from "./UserRecord";
const Table = () => {
  const { erroredUsers, incrementPage } = useTable();
  return (
    <InfiniteScroll
      dataLength={erroredUsers.length}
      next={incrementPage}
      hasMore={true}
      loader={<p>Loading...</p>}
      endMessage={<p>No more data to load.</p>}
    >
      <table className="responsive-table">
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
    </InfiniteScroll>
  );
};

export default Table;
