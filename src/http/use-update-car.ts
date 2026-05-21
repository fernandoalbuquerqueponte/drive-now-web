import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { api } from "./api-client";

interface UpdateCarParams {
  carId: string;
  formData: FormData;
}

export function useUpdateCar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ carId, formData }: UpdateCarParams) => {
      const response = await api.patch(`/api/cars/${carId}`, formData);
      return response.data;
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
      queryClient.invalidateQueries({ queryKey: ["get-cars"] });
      toast.success("Carro editado com sucesso");
    },
    onError() {
      toast.error("Erro ao fazer update do carro.");
    },
  });
}
