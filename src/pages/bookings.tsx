import BookingStats from "@/components/booking-stats";
import CarBookingTabs from "@/components/car-bookings-tabs";
import { useGetBookingsByUserId } from "@/http/use-get-bookings-by-user-id";

function BookingsPage() {
  const { data: bookings } = useGetBookingsByUserId();

  if (!bookings) {
    return null;
  }

  return (
    <>
      <div className="w-full border-b bg-zinc-900/50">
        <div className="container mx-auto flex flex-col justify-items-start space-y-7 py-16 pt-16">
          <div className="space-y-3">
            <h2 className="text-4xl font-bold">Minhas reservas</h2>
            <p className="text-muted-foreground">
              Acompanhe e gerencie todas as suas reservas de veículos
            </p>
          </div>

          <BookingStats bookings={bookings} />
        </div>
      </div>
      <div className="container mx-auto py-16">
        <div className="flex w-full justify-center">
          <CarBookingTabs bookings={bookings} />
        </div>
      </div>
    </>
  );
}

export default BookingsPage;
