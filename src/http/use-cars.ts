import { useQuery } from "@tanstack/react-query";

import { api } from "./api-client";

export function useCars() {
  return useQuery({
    queryKey: ["get-cars"],
    queryFn: async () => {
      const response = await api.get("/api/cars");

      return response.data;
    },
  });
}
