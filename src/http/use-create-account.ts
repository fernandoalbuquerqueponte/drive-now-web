import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { api } from "./api-client";
import type { UseCreateAccountRequest } from "./types/use-create-account-request";
import type { UseCreateAccountResponse } from "./types/use-create-account-response";

export function useCreateAccount() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: UseCreateAccountRequest) => {
      const response = await api.post<UseCreateAccountResponse>(
        "/api/users",
        data,
      );
      return response.data;
    },
    onSuccess: (data: UseCreateAccountResponse) => {
      localStorage.setItem("accessToken", data.tokens.accessToken);
      localStorage.setItem("refreshToken", data.tokens.refreshToken);

      navigate("/home", { replace: true });
    },
  });
}
