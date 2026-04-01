import type { UseMutateFunction } from "@tanstack/react-query";
import type { Table } from "@/types";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

interface TableCardProps {
  _id: string;
  name: string;
  description?: string;
  seats: number;
  onRemove?: UseMutateFunction<Table, Error, string, unknown>;
}

export default function TableCard(props: TableCardProps) {
  const { _id, name, description, seats, onRemove } = props;

  const navigate = useNavigate();

  const onEdit = (id: string) => {
    navigate(`/tables/${id}`);
  };
  return (
    <>
      {/* <Card className="justify-between self-start"> */}
      <Card className="text-center justify-between">
        <CardHeader>
          <CardTitle>
            <div className="font-bold text-xl mb-2">{name}</div>
          </CardTitle>
          <CardDescription>
            <div className="text-base text-wrap wrap-anywhere">
              {description}
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* <div className="inline-block bg-gray-500 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
            Seats: {seats}
          </div> */}
          <Badge className="bg-custom-primary text-primary">
            Seats: {seats}
          </Badge>
        </CardContent>
        <CardFooter className="">
          <Button
            className="grow rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6
          font-semibold text-white shadow-xs hover:bg-indigo-500
          focus-visible:outline-2 focus-visible:outline-offset-2
          focus-visible:outline-indigo-600 cursor-pointer"
            onClick={() => {
              onEdit(_id);
            }}
          >
            Edit
          </Button>
          {onRemove && (
            <Button
              className="grow rounded-md bg-red-600 px-3 py-1.5 text-sm/6
            font-semibold text-white shadow-xs hover:bg-red-500
            focus-visible:outline-2 focus-visible:outline-offset-2
            focus-visible:outline-red-600 cursor-pointer"
              onClick={() => onRemove(_id)}
            >
              Delete
            </Button>
          )}
        </CardFooter>
      </Card>
      {/* <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{name}</div>
          <div className="text-base">{description}</div>
        </div>
        <div className="px-6 pt-4 pb-2">
          <div className="inline-block bg-gray-400 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
            Seats: {seats}
          </div>
        </div>
        <div className="flex flex-nowrap gap-1">
          <Button
            className="grow rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6
          font-semibold text-white shadow-xs hover:bg-indigo-500
          focus-visible:outline-2 focus-visible:outline-offset-2
          focus-visible:outline-indigo-600 cursor-pointer"
            onClick={() => {
              onEdit(_id);
            }}
          >
            Edit
          </Button>
          {onRemove && (
            <Button
              className="grow rounded-md bg-red-600 px-3 py-1.5 text-sm/6
            font-semibold text-white shadow-xs hover:bg-red-500
            focus-visible:outline-2 focus-visible:outline-offset-2
            focus-visible:outline-red-600 cursor-pointer"
              onClick={() => onRemove(_id)}
            >
              Delete
            </Button>
          )}
        </div>
      </div> */}
    </>
  );
}
