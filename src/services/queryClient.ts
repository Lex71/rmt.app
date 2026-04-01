import {
  MutationCache,
  QueryCache,
  QueryClient,
  useMutation,
  useQuery,
  type InvalidateQueryFilters,
  type QueryKey,
  type UseMutationOptions,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import { toast } from "sonner";

interface QueryMeta {
  successMessage?: string;
  errorMessage?: string;
  invalidateQueries?: QueryKey | QueryKey[];
  mutationId?: string;
}

/**
 * Configure and create the React Query client
 * Includes global configuration for queries and mutations
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // Retry failed requests once
      refetchOnWindowFocus: false, // Disable automatic refetch on window focus
      staleTime: 30000, // Consider data fresh for 30 seconds
    },
  },

  /**
   * Global query cache configuration
   * Handles success and error states for all queries
   */
  queryCache: new QueryCache({
    onSuccess: (_data, query) => {
      // Handle successful queries
      const meta = query.meta as QueryMeta | undefined;
      if (meta?.successMessage) {
        toast.success(meta.successMessage);
      }
    },
    onError: (error, query) => {
      // Handle query errors
      const meta = query.meta as QueryMeta | undefined;
      // const errorMessage = meta?.errorMessage || "Operation failed";
      const errorMessage =
        meta?.errorMessage || error?.message || "Operation failed";
      // toast.error(JSON.stringify(error));
      // toast.error(`${errorMessage}: ${(error as Error).message}`);
      toast.error(`QueryCache::error`, {
        description: errorMessage,
      });

      // Log error for debugging
      console.error("Query Error:", {
        queryKey: query.queryKey,
        error,
        meta: query.meta,
      });
    },
  }),

  /**
   * Global mutation cache configuration
   * Handles success and error states for all mutations
   */
  mutationCache: new MutationCache({
    onSuccess: (_data, _variables, _context, mutation) => {
      // Handle successful mutations
      const meta = mutation.meta as QueryMeta | undefined;
      if (meta?.successMessage) {
        toast.success(meta.successMessage);
      }

      // Invalidate relevant queries if specified
      if (meta?.invalidateQueries) {
        const queriesToInvalidate = Array.isArray(meta.invalidateQueries)
          ? meta.invalidateQueries
          : [meta.invalidateQueries];

        queriesToInvalidate.forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey });
        });
      }
    },
    onError: (error, _variables, _context, mutation) => {
      // Handle mutation errors
      const meta = mutation.meta as QueryMeta | undefined;
      const errorMessage =
        meta?.errorMessage || error?.message || "Operation failed";
      // const errorMessage = meta?.errorMessage || "Operation failed";
      // toast.error(`${errorMessage}: ${(error as Error).message}`);
      toast.error(`MutationCache::error`, {
        description: errorMessage,
      });

      // Log error for debugging
      console.error("Mutation Error:", {
        mutation: meta?.mutationId,
        error,
      });
    },
  }),
});

/**
 * Query key factory
 * Provides consistent query keys across the application
 */
export const queryKeys = {
  index: {
    all: ["index"] as const,
  },
  facilities: {
    all: ["facilities"] as const,
    byId: (id: string) => ["products", id] as const,
    // byCategory: (category: string) =>
    //   ["products", "category", category] as const,
  },
  tables: {
    all: ["tables"] as const,
    byId: (id: string) => ["tables", id] as const,
    byFacility: (facilityId: string) =>
      ["tables", "facility", facilityId] as const,
  },
  reservations: {
    all: ["reservations"] as const,
    byId: (id: string) => ["reservations", id] as const,
    // byUser: (userId: string) => ["reservations", "user", userId] as const,
  },
  users: {
    all: ["users"] as const,
    byId: (id: string) => ["users", id] as const,
  },
};

// With the request function in place,
//   you’re ready to create custom hooks within React Query to streamline API requests
// and further transform your data.
//   Specifically, you can create useApiSend and useApiGet hooks
// for outbound and inbound requests, respectively.

/**
 * Hook for making GET requests
 * @param key The unique key for this query
 * @param fn The function to call for the query
 * @param options Options for the query
 * @returns The result of the query
 */
// REVIEW how refactor Record<string, string> to { [K in keyof T]: T[K] } in all codebase?
export const useApiGet = <T, E = Error, P = Record<string, string>>(
  key: readonly string[],
  fn: (params?: P) => Promise<T>,
  params?: P,
  options: Omit<UseQueryOptions<T, E>, "queryKey" | "queryFn"> = {}
): UseQueryResult<T, E> => {
  return useQuery<T, E>({
    ...options,
    // queryFn: fn,
    queryFn: () => fn(params),
    queryKey: key,
  });
};

/**
 * Hook for making API mutation requests
 * @param fn The mutation function to call
 * @param success Callback function executed on success
 * @param error Callback function executed on error
 * @param invalidateKey Keys of queries to invalidate on success
 * @param options Additional mutation options
 * @returns A mutation object
 */
export const useApiSend = <
  TData,
  TError = Error,
  TVariables = void,
  TContext = unknown
>(
  fn: (variables: TVariables) => Promise<TData>,
  success: (data: TData) => void,
  error: (error: TError) => void,
  invalidateKey: InvalidateQueryFilters<string[]>[],
  options: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    "mutationFn" | "onSuccess" | "onError"
  >
) => {
  // const queryClient = useQueryClient();

  return useMutation<TData, TError, TVariables, TContext>({
    mutationFn: fn,
    onSuccess: (data: TData) => {
      invalidateKey.forEach((key) => {
        console.log("Invalidate Key:", key);
        queryClient.invalidateQueries(key);
      });
      success(data);
    },
    onError: error,
    retry: 1,
    ...options,
  });
};
