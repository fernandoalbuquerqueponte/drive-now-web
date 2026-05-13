/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { api } from "./api-client";

export function useEditUserProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      const response = await api.patch("/api/users", data);
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
