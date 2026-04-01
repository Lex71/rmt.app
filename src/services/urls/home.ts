import { request } from "@/services/axiosClient";
import type { HomeResponse } from "@/types";
export const getAll = (): Promise<HomeResponse> =>
  request({
    url: `/home`,
    method: "GET",
  });
