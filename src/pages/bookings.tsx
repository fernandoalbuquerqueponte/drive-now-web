import { useMemo } from "react";

import BookingCard from "@/components/booking-card";
import Header from "@/components/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetBookingsByUserId } from "@/http/use-get-bookings-by-user-id";

function BookingsPage() {
  const { data: bookings } = useGetBookingsByUserId();

  console.log(bookings);

  const now = new Date();

  const filterBookings = useMemo(() => {
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
    <div>
      <Header />

      <div className="container mx-auto py-16">
        <h2 className="w-full pt-7 pb-16 text-center text-3xl font-bold">
          Minhas reservas
        </h2>

        <div className="flex w-full justify-center py-5">
          <Tabs defaultValue="account" className="w-250">
            <TabsList variant="line" className="flex w-full items-center">
              <TabsTrigger value="active">Reservas Ativas</TabsTrigger>
              <TabsTrigger value="cancelled">Reservas Canceladas</TabsTrigger>
              <TabsTrigger value="historic">Histórico</TabsTrigger>
            </TabsList>
            <TabsContent value="active">
              {filterBookings.active.map((booking) => (
                <BookingCard booking={booking} />
              ))}
            </TabsContent>
            <TabsContent value="cancelled">
              {filterBookings.cancelled.map((booking) => (
                <BookingCard booking={booking} />
              ))}
            </TabsContent>
            <TabsContent value="historic">
              {filterBookings.history.map((booking) => (
                <BookingCard booking={booking} />
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default BookingsPage;
