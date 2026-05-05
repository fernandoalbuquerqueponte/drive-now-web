import { useMutation } from "@tanstack/react-query";

import { api } from "./api-client";
import type { UseCreateBookingCarRequest } from "./types/use-create-booking-car-request";
import type { UseCreateBookingCarResponse } from "./types/use-create-booking-car-response";

export function useCreateBookingCar(id: string) {
  return useMutation({
    mutationFn: async (data: UseCreateBookingCarRequest) => {
      const response = await api.post<UseCreateBookingCarResponse>(
        `/api/cars/reserve/${id}`,
        data,
      );
      return response.data;
    },
  });
}
