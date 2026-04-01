import { useApiGet } from "@/services/queryClient";
import { getAll } from "@/services/urls/home";
import type { Facility, Table } from "@/types";
import { useEffect } from "react";
import { toast } from "sonner";
export default function useHome() {
  const { data, isPending, isError, error, refetch } = useApiGet<
    Table[] | Facility[],
    Error
  >(["home"], getAll);

  useEffect(() => {
    if (isError) {
      toast.error("Home::failed", {
        description: (error as Error).message,
      });
    }
  }, [isError, error, data]);

  return { data, isPending, isError, error, refetch } as const;
}
