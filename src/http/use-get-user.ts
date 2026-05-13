import { useQuery } from "@tanstack/react-query";

import { api } from "./api-client";
import type { UseGetUserResponse } from "./types/use-edit-user-profile-response";

export function useGetUser() {
  return useQuery({
    queryKey: ["get-user"],
    queryFn: async () => {
      const response = await api.get<UseGetUserResponse>(`/api/users`);

      return response.data;
    },
  });
}
