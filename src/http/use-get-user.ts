import { useQuery } from "@tanstack/react-query";

import { api } from "./api-client";

export function useGetUser() {
  return useQuery({
    queryKey: ["get-user"],
    queryFn: async () => {
      const response = await api.get(`/api/users`);

      return response.data;
    },
  });
}
