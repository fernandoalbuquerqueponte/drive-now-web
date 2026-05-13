import { useQuery } from "@tanstack/react-query";

import { api } from "./api-client";
import type { UseGetBookingByCarIdResponse } from "./types/use-get-bookings-by-car-id-response";

export function useGetBookingsByCarId(carId: string) {
  return useQuery({
    queryKey: ["car-bookings-by-car-id", carId],
    queryFn: async () => {
      const response = await api.get<UseGetBookingByCarIdResponse[]>(
        `/api/cars/${carId}/bookings`,
      );

      return response.data.map((b) => ({
        from: new Date(b.startDate),
        to: new Date(b.endDate),
      }));
    },
  });
}
