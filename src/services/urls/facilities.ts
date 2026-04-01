import type { Facility } from "@/types";
import { request } from "../axiosClient";

export const getOne = (id: string): Promise<Facility> =>
  request({
    url: `/facilities/${id}`,
    method: "GET",
  });

// export const getAll = (): Promise<Facility[]> =>
//   request({
//     url: `/facilities`,
//     method: "GET",
//   });
export const getAll = (
  queryParams?: Record<string, string>,
): Promise<Facility[]> => {
  const strQueryParams = new URLSearchParams(queryParams).toString();
  return request({
    url: strQueryParams ? `/facilities/?${strQueryParams}` : `/facilities`,
    method: "GET",
  });
};

export const create = (data: Partial<Facility>): Promise<Facility> =>
  request({
    url: `/facilities`,
    method: "POST",
    data,
  });

export const remove = (id: string): Promise<Facility> =>
  request({
    url: `/facilities/${id}`,
    method: "DELETE",
  });

export const update = (
  id: string,
  data: Partial<Facility>,
): Promise<Facility> =>
  request({
    url: `/facilities/${id}`,
    method: "PUT",
    data,
  });

export const patch = (id: string, data: Partial<Facility>): Promise<Facility> =>
  request({
    url: `/facilities/${id}`,
    method: "PATCH",
    data,
  });
