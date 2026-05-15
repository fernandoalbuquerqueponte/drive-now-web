import { Car as CarIcon, DollarSign, TrendingUp } from "lucide-react";
import { useMemo } from "react";

import type { Car } from "@/http/types/use-edit-user-profile-response";

import StatCard from "./stat-card";

interface CarStatsProps {
  cars: Car[];
}

function CarStats({ cars }: CarStatsProps) {
  const totalRevenue = useMemo(() => {
    return cars.reduce((acc, car) => {
      const carTotal = car.bookings.reduce(
        (sum, booking) => sum + booking.totalPrice,
        0,
      );
      return acc + carTotal;
    }, 0);
  }, [cars]);

  const totalBookings = useMemo(() => {
    return cars.reduce((acc, car) => acc + car.bookings.length, 0);
  }, [cars]);

  return (
    <div className="flex w-full items-center gap-5">
      <StatCard
        label="Total de veículos"
        value={cars.length}
        icon={<CarIcon />}
      />

      <StatCard
        label="Total de aluguéis"
        value={totalBookings}
        icon={<TrendingUp />}
      />

      <StatCard
        label="Ganhos totais"
        value={totalRevenue.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
        iconBgColor="bg-green-500/10"
        icon={<DollarSign className="text-[#19D37C]" />}
      />
    </div>
  );
}
export default CarStats;
