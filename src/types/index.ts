import { type SetStateAction } from "react";

// export interface Table {
//   id: number;
//   number: string;
//   seats: number;
//   isAvailable: boolean;
// }

// export interface Reservation {
//   id: number;
//   tables: number;
//   name: string;
//   email: string;
//   date: string;
//   time: string;
//   seats: number;
//   status: "pending" | "confirmed" | "cancelled";
// }

export interface AuthResponse {
  user: SetStateAction<User | null>;
  accessToken: string;
  refreshToken: string;
}

// export interface User {
//   id: number;
//   email: string;
//   role: "admin" | "operator";
//   token: string;
//   refreshToken: string;
// }

/**
 * Common interfaces and types used throughout the application
 */

/**
 * Base entity interface with common fields
 */
export interface BaseEntity {
  _id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Register {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  facility: string;
}

export interface RegisterResponse {
  user: User;
}

export type SignupForm = {
  name: string;
  email: string;
  facility: string;
  password: string;
  passwordConfirm: string;
};

export interface LoginResponse {
  // user: User;
  user: User;
  accessToken: string;
  refreshToken: string;
}
export interface LogoutResponse {
  message: string;
}

export interface SigninForm {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface ChangePasswordForm {
  email: string;
  currentPassword: string;
  newPassword: string;
}
export interface RefreshTokenResponse {
  accessToken: string;
  user: User;
}

export interface WhoamiResponse {
  user: User;
}

export type HomeResponse = Facility[] | Table[];

export interface Login {
  email: string;
  password: string;
}

export interface UpdatePassword {
  email: string;
  currentPassword: string;
  newPassword: string;
}

/**
 * Product entity interface
 */
export type Facility = BaseEntity & {
  name: string;
  address: string;
};

export type FacilityForm = {
  name: string;
  address: string;
};

/**
 * Order entity interface
 */
export interface Table extends BaseEntity {
  name: string;
  seats: number;
  description?: string;
  facility: string;
}

export type TableForm = {
  name: string;
  description: string;
  seats: number;
};

export type TableSearch = {
  name: string;
  seats: number;
};

// export enum Status {
//   // AWAITINGPAYMENT = "awaitingpayment", // The booking is confirmed but payment is still pending.
//   CANCELLED = "cancelled", // The booking has been canceled by either the customer or the restaurant.
//   CHECKEDIN = "checkedin", // The customer has arrived at the restaurant
//   CONFIRMED = "confirmed", // The booking has been successfully made and is confirmed by the restaurant.
//   NOSHOW = "noshow", // The customer did not show up for the booked reservation (NOTE: remarkable for auditing purposes, to be treated as a cancellation).
//   PAID = "paid", // The booking has been confirmed and payment has been received (NOTE: tables are free).
//   // PENDING = "pending", // ONLINE: The booking request has been received but is awaiting confirmation from the restaurant.
//   RESCHEDULED = "rescheduled", // The booking has been moved to a different date or time (NOTE: remarkable for auditing purposes, to be treated as a confirmed booking).
// }

export const StatusEnum = {
  // AWAITINGPAYMENT = "awaitingpayment", // The booking is confirmed but payment is still pending.
  CANCELLED: "cancelled", // The booking has been canceled by either the customer or the restaurant.
  CHECKEDIN: "checkedin", // The customer has arrived at the restaurant
  CONFIRMED: "confirmed", // The booking has been successfully made and is confirmed by the restaurant.
  NOSHOW: "noshow", // The customer did not show up for the booked reservation (NOTE: remarkable for auditing purposes, to be treated as a cancellation).
  PAID: "paid", // The booking has been confirmed and payment has been received (NOTE: tables are free).
  // PENDING = "pending", // ONLINE: The booking request has been received but is awaiting confirmation from the restaurant.
  RESCHEDULED: "rescheduled", // The booking has been moved to a different date or time (NOTE: remarkable for auditing purposes, to be treated as a confirmed booking).
} as const;

export type Status = (typeof StatusEnum)[keyof typeof StatusEnum];

export interface Reservation extends BaseEntity {
  date: string;
  name: string;
  time: string;
  phone: string;
  seats: number;
  status: Status;
  facility: string;
  tables: Table[];
}

export type ReservationForm = {
  date: string;
  name: string;
  time: string;
  phone: string;
  seats: number;
  tables: string[];
};

/**
 * User roles for authorization
 */
export const UserRoleEnum = {
  ADMIN: "admin",
  MANAGER: "manager",
  USER: "user",
} as const;

export type UserRole = (typeof UserRoleEnum)[keyof typeof UserRoleEnum];

/**
 * User entity interface
 */
export interface User extends BaseEntity {
  name: string;
  email: string;
  role: UserRole;
  password?: string;
}

/**
 * Pagination parameters interface
 */
export interface PaginationParams {
  page: number;
  limit: number;
}

/**
 * Generic paginated response interface
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// export interface OrderCreateInput {
//   name: string;
//   userId: string;
//   items: OrderItem[];
//   shippingAddress: string;
//   status: OrderStatus;
// }

// export interface OrderUpdateInput {
//   name?: string;
//   items?: OrderItem[];
//   status?: OrderStatus;
//   shippingAddress?: string;
// }
