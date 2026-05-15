import { Car, DollarSign, TrendingUp } from "lucide-react";

import CarAnalyticsCard from "./car-analytics-card";

function CarStats() {
  return (
    <div className="flex w-full items-center gap-5">
      <CarAnalyticsCard label="Total de veículos" value="1" icon={<Car />} />

      <CarAnalyticsCard
        label="Total de aluguéis"
        value="12"
        icon={<TrendingUp />}
      />

      <CarAnalyticsCard
        label="Ganhos totais"
        value="R$ 40.456,00"
        icon={<DollarSign />}
      />
    </div>
  );
}
export default CarStats;
