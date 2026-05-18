import { useMutation } from "@tanstack/react-query";

import { api } from "./api-client";

interface UpdateCarParams {
  carId: string;
  formData: FormData;
}

export function useUpdateCar() {
  return useMutation({
    mutationFn: async ({ carId, formData }: UpdateCarParams) => {
      const response = await api.patch(`/api/cars/${carId}`, formData);
      return response.data;
    },
  });
}
