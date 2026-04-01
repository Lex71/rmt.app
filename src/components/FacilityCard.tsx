import type { UseMutateFunction } from "@tanstack/react-query";
import type { Facility } from "@/types";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  // CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface FacilityCardProps {
  _id: string;
  name: string;
  address: string;
  onRemove?: UseMutateFunction<Facility, Error, string, unknown>;
}

export default function FacilityCard(props: FacilityCardProps) {
  const { _id, name, address, onRemove } = props;

  const navigate = useNavigate();

  const onEdit = (id: string) => {
    navigate(`/facilities/${id}`);
  };

  return (
    <>
      {/* <Card className="justify-between self-start"> */}
      <Card className="text-center justify-between">
        <CardHeader>
          <CardTitle>
            <div className="font-bold text-xl mb-2">{name}</div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-base text-wrap wrap-anywhere">{address}</div>
        </CardContent>
        <CardFooter className="gap-1">
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
      {/* // <div className="max-w-sm rounded overflow-hidden shadow-lg">
    //   <div className="px-6 py-4">
    //     <div className="font-bold text-xl mb-2">{name}</div>
    //     <div className="text-gray-700 text-base">{address}</div>
    //   </div>
    //   <div className="flex flex-nowrap gap-1">
    //     <button
    //       className="grow rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6
    //       font-semibold text-white shadow-xs hover:bg-indigo-500
    //       focus-visible:outline-2 focus-visible:outline-offset-2
    //       focus-visible:outline-indigo-600 cursor-pointer"
    //       onClick={() => {
    //         onEdit(_id);
    //       }}
    //     >
    //       Edit
    //     </button>
    //     {onRemove && (
    //       <button
    //         className="grow rounded-md bg-red-600 px-3 py-1.5 text-sm/6
    //         font-semibold text-white shadow-xs hover:bg-red-500
    //         focus-visible:outline-2 focus-visible:outline-offset-2
    //         focus-visible:outline-red-600 cursor-pointer"
    //         onClick={() => onRemove(_id)}
    //       >
    //         Delete
    //       </button>
    //     )}
    //   </div>
    // </div> */}
    </>
  );
}
