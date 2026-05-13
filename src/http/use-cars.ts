import { useQuery } from "@tanstack/react-query";

import { api } from "./api-client";
import type { UseGetCarResponse } from "./types/use-car-response";
import type { UseCarRequest } from "./types/use-cars-request";

export function useCars(filters: UseCarRequest) {
  return useQuery({
    queryKey: ["get-cars", filters],
    queryFn: async () => {
      const response = await api.get<UseGetCarResponse[]>("/api/cars", {
        params: filters,
      });

      return response.data;
    },
  });
}
