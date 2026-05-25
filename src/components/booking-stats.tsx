import { Car, CheckCircle2, CircleDollarSign, Clock } from "lucide-react";
import { useMemo } from "react";

import type { BookingResponse } from "@/http/use-get-bookings-by-user-id";

import StatCard from "./stat-card";

interface BookingStatsProps {
  bookings: BookingResponse[];
}

function BookingStats({ bookings }: BookingStatsProps) {
  const stats = useMemo(() => {
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

    return {
      totalBookings,
      activeBookings,
      completedBookings,
      totalSpent,
    };
  }, [bookings]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full items-center justify-center gap-4 px-5">
      <StatCard
        label="Total de reservas"
        value={stats.totalBookings}
        icon={<Car size={20} />}
      />

      <StatCard
        label="Reservas ativas"
        value={stats.activeBookings}
        iconBgColor="bg-green-500/10"
        icon={<Clock size={20} className="text-[#19D37C]" />}
      />

      <StatCard
        label="Concluídas"
        value={stats.completedBookings}
        icon={<CheckCircle2 size={20} />}
      />

      <StatCard
        label="Total gasto"
        iconBgColor="bg-yellow-400/10"
        value={stats.totalSpent.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
        icon={<CircleDollarSign size={20} />}
      />
    </div>
  );
}

export default BookingStats;
