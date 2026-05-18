import { useMutation } from "@tanstack/react-query";

import { api } from "./api-client";

export function useCreateCar() {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await api.post("/api/cars", formData);
      return response.data;
    },
  });
}
