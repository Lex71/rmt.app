import type { Reservation, Table } from "@/types";
import { request } from "../axiosClient";

export const getOne = (id: string): Promise<Reservation> =>
  request({
    url: `/reservations/${id}`,
    method: "GET",
  });

export const getAll = (
  queryParams?: Record<string, string>,
): Promise<Reservation[]> => {
  const strQueryParams = new URLSearchParams(queryParams).toString();
  return request({
    url: strQueryParams ? `/reservations/?${strQueryParams}` : `/reservations`,
    method: "GET",
  });
};

//  NOTE: { [key: string]: string } same as Record<string, string>
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

export const create = (
  data: Omit<Partial<Reservation>, "tables"> & { tables: string[] },
): Promise<Reservation> =>
  request({
    url: `/reservations`,
    method: "POST",
    data,
  });

export const patch = (
  id: string,
  data: Omit<Partial<Reservation>, "tables"> & { tables?: string[] },
): Promise<Reservation> =>
  request({
    url: `/reservations/${id}`,
    method: "PATCH",
    data,
  });
