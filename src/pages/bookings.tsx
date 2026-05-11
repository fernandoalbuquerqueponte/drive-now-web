import { Car, CheckCircle2, CircleDollarSign, Clock } from "lucide-react";

import CarBookingTabs from "@/components/car-bookings-tabs";
import Header from "@/components/header";
import StatCard from "@/components/stat-card";
import { useGetBookingsByUserId } from "@/http/use-get-bookings-by-user-id";

function BookingsPage() {
  const { data: bookings } = useGetBookingsByUserId();

  if (!bookings) {
    return null;
  }

  const now = new Date();

  const totalBookings = bookings.length;
  const activeBookings = bookings.filter(
    (b) =>
      b.status !== "CANCELLED" && new Date(b.endDate) > new Date(b.startDate),
  ).length;

  const completedBookings = bookings.filter((b) => {
    const dateEnd = new Date(b.endDate);

    return dateEnd <= now && b.status !== "CANCELLED";
  }).length;

  const totalSpent = bookings
    .filter((b) => b.status !== "CANCELLED")
    .reduce((accumulator, booking) => {
      return accumulator + booking.totalPrice;
    }, 0);

  console.log(totalSpent);

  return (
    <>
      <Header />

      <div className="w-full border-b bg-zinc-900/50">
        <div className="container mx-auto flex flex-col justify-items-start space-y-7 py-16 pt-16">
          <div className="space-y-3">
            <h2 className="text-4xl font-bold">Minhas reservas</h2>
            <p className="text-muted-foreground">
              Acompanhe e gerencie todas as suas reservas de veículos
            </p>
          </div>

          <div className="flex w-full items-center justify-center gap-4">
            <StatCard
              label="Total de reservas"
              value={totalBookings}
              icon={<Car size={20} />}
            />

            <StatCard
              label="Reservas ativas"
              value={activeBookings}
              iconBgColor="bg-green-500/10"
              icon={<Clock size={20} />}
            />

            <StatCard
              label="Concluídas"
              value={completedBookings}
              icon={<CheckCircle2 size={20} />}
            />

            <StatCard
              label="Total de reservas"
              iconBgColor="bg-yellow-400/10"
              value={Number(totalSpent).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
              icon={<CircleDollarSign size={20} />}
            />
          </div>
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
