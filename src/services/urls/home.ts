import { request } from "@/lib/api";
import type { HomeResponse } from "@/types";
export const getAll = (): Promise<HomeResponse> =>
  request({
    url: `/home`,
    method: "GET",
  });
