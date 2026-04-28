import { useMutation } from "@tanstack/react-query";

import { api } from "./api-client";
import type { UseLoginRequest } from "./types/use-login-request";
import type { UseLoginResponse } from "./types/use-login-response";


export function useLogin() {
  return useMutation({
    mutationFn: async (data: UseLoginRequest) => {
      const response = await api.post<UseLoginResponse>("/api/users/login", data);
      return response.data;
    },
    onSuccess: (data: UseLoginResponse) => {
      localStorage.setItem("accessToken", data.tokens.accessToken);
      localStorage.setItem("refreshToken", data.tokens.refreshToken);
    },
  });
}
