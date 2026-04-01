import type { Table } from "@/types";
import { request } from "../axiosClient";

export const getOne = (id: string): Promise<Table> =>
  request({
    url: `/tables/${id}`,
    method: "GET",
  });

export const getReservableTables = (
  queryParams?: Record<string, string>,
): Promise<Table[]> => {
  const strQueryParams = new URLSearchParams(queryParams).toString();
  return request({
    url: strQueryParams
      ? `/reservations/tables/?${strQueryParams}`
      : `/reservations/tables`,
    method: "GET",
  });
};

export const getAll = (
  queryParams?: Record<string, string>,
): Promise<Table[]> => {
  const strQueryParams = new URLSearchParams(queryParams).toString();
  return request({
    url: strQueryParams ? `/tables/?${strQueryParams}` : `/tables`,
    method: "GET",
  });
};

export const create = (data: Partial<Table>): Promise<Table> =>
  request({
    url: `/tables`,
    method: "POST",
    data,
  });

export const remove = (id: string): Promise<Table> =>
  request({
    url: `/tables/${id}`,
    method: "DELETE",
  });

export const update = (id: string, data: Partial<Table>): Promise<Table> =>
  request({
    url: `/tables/${id}`,
    method: "PUT",
    data,
  });

export const patch = (id: string, data: Partial<Table>): Promise<Table> =>
  request({
    url: `/tables/${id}`,
    method: "PATCH",
    data,
  });
