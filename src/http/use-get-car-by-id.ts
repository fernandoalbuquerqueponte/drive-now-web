import { useQuery } from "@tanstack/react-query";

import { api } from "./api-client";
import type { UseGetCarByIdResponse } from "./types/use-get-car-by-id-response";

export function useGetCarById(id: string) {
  return useQuery({
    queryKey: ["get-car-by-id", id],
    queryFn: async () => {
      const response = await api.get<UseGetCarByIdResponse>(
        `/api/cars/${id}/details`,
      );

      return response.data;
    },
    enabled: !!id,
  });
}
