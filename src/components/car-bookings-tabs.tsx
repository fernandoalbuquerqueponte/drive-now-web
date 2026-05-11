import { useMemo } from "react";

import BookingCard, { type BookingStatus } from "@/components/booking-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Car } from "@/pages/home";

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

interface CarBookingTabsProps {
  bookings: BookingResponse[];
}

function CarBookingTabs({ bookings }: CarBookingTabsProps) {
  const filterBookings = useMemo(() => {
    const now = new Date();
    if (!bookings) return { active: [], cancelled: [], history: [] };
    return {
      active: bookings.filter(
        (b) => b.status !== "CANCELLED" && new Date(b.endDate) > now,
      ),
      cancelled: bookings.filter((b) => b.status === "CANCELLED"),
      history: bookings?.filter(
        (b) => b.status !== "CANCELLED" && new Date(b.endDate) <= now,
      ),
    };
  }, [bookings]);

  return (
    <Tabs defaultValue="active" className="w-250">
      <TabsList className="flex w-full items-center">
        <TabsTrigger value="active">Reservas Ativas</TabsTrigger>
        <TabsTrigger value="cancelled">Reservas Canceladas</TabsTrigger>
        <TabsTrigger value="historic">Histórico</TabsTrigger>
      </TabsList>

      <TabsContent value="active" className="mt-6 flex flex-col gap-6">
        {filterBookings.active.map((booking) => (
          <BookingCard booking={booking} />
        ))}
      </TabsContent>
      <TabsContent value="cancelled" className="mt-6 flex flex-col gap-6">
        {filterBookings.cancelled.map((booking) => (
          <BookingCard booking={booking} />
        ))}
      </TabsContent>
      <TabsContent value="historic" className="mt-6 flex flex-col gap-6">
        {filterBookings.history.map((booking) => (
          <BookingCard booking={booking} />
        ))}
      </TabsContent>
    </Tabs>
  );
}

export default CarBookingTabs;
