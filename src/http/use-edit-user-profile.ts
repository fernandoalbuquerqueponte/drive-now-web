/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { api } from "./api-client";

type EditUserProfileInput = FormData | Record<string, any>;

export function useEditUserProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: EditUserProfileInput) => {
      const response = await api.patch("/api/users", formData);
      return response.data;
    },
    onSuccess(updatedUser) {
      queryClient.setQueryData(["get-user"], updatedUser);
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
      toast.success("Conta editada com sucesso");
    },
    onError() {
      toast.error("Erro ao fazer login.");
    },
  });
}
