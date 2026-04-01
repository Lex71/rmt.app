import type { UseMutateFunction } from "@tanstack/react-query";
import type { Table } from "@/types";
import TableCard from "@/components/TableCard";
import { Link } from "react-router";

interface TableListProps {
  items: Table[];
  remove?: UseMutateFunction<Table, Error, string, unknown>;
}

export default function TableList(props: TableListProps) {
  const { items, remove } = props;
  return (
    <>
      <div className="flex flex-wrap justify-center gap-4">
        {items.map((item) => (
          <TableCard key={item._id} {...item} onRemove={remove} />
        ))}
      </div>
      {items.length === 0 && (
        <p className="text-center text-sm">
          No tables yet.{" "}
          <Link to="/tables" className="text-indigo-400 hover:text-indigo-300">
            Add
          </Link>{" "}
          a new one..
        </p>
      )}
    </>
  );
}
