/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";

import { api } from "./api-client";

export function useCars(filters: any) {
  return useQuery({
    queryKey: ["get-cars", filters],
    queryFn: async () => {
      const response = await api.get("/api/cars", {
        params: filters,
      });

      return response.data;
    },
  });
}
