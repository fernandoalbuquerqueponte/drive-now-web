import { useQuery } from "@tanstack/react-query";

import type { Car } from "@/types/car";

import { api } from "./api-client";

export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED";

export interface BookingResponse {
  id: string;
  carId: string;
  userId: string;
  startDate: string;
  endDate: string;
  totalHours: number;
  totalPrice: number;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
  car: Car;
}

export function useGetBookingsByUserId() {
  return useQuery<BookingResponse[]>({
    queryKey: ["get-bookings-by-user-id"],
    queryFn: async () => {
      console.log("Iniciando fetch de reservas...");
      const response = await api.get<BookingResponse[]>(
        `/api/cars/bookings/user`,
      );

      return response.data;
    },
  });
}
