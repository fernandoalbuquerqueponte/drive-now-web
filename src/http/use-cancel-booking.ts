import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "./api-client";

export function useCancelBooking(bookingId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const response = await api.patch(`/api/cars/booking/${bookingId}/cancel`);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-bookings-by-user-id"] });
    },
  });
}
