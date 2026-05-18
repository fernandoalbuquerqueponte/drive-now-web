import {
  Activity,
  Car,
  Fuel,
  Gauge,
  Pencil,
  Settings,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useState } from "react";

import type { Car as CarInterface } from "@/http/types/use-edit-user-profile-response";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import EditCarForm from "./upsert-car-dialog";

const getSpecIcon = (label: string) => {
  switch (label.toLowerCase()) {
    case "lugares":
      return <Users size={16} />;
    case "transmissão":
      return <Settings size={16} />;
    case "combustível":
      return <Fuel size={16} />;
    case "motor":
      return <Activity size={16} />;
    case "potência":
      return <Zap size={16} />;
    case "consumo":
      return <Gauge size={16} />;
    default:
      return <Activity size={16} />;
  }
};

function CarAnalyticsCard({ car }: { car: CarInterface }) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const bookingTotalRevenue = car.bookings.reduce((sum, booking) => {
    return sum + booking.totalPrice;
  }, 0);

  return (
    <Card>
      <CardContent className="flex flex-col gap-3">
        <img
          className="h-80 w-full rounded-lg object-cover"
          src={car.image}
          alt={car.brand}
        />
        <div className="flex items-center justify-between">
          <Badge>{car.category}</Badge>
          <Badge>{car.available ? "Disponível" : "Alugado"}</Badge>
        </div>
        <div className="flex flex-col gap-3">
          <h1>
            {car.brand} {car.model}
          </h1>

          <div className="flex items-center gap-2">
            {car.specifications.slice(0, 3).map((spec, index) => (
              <div
                key={index}
                className="text-muted-foreground flex items-center gap-2"
              >
                {getSpecIcon(spec.label)}
                <span className="text-sm">{spec.label}</span>
              </div>
            ))}
          </div>

          <div className="flex w-full justify-between rounded-lg bg-zinc-800/80 p-3">
            <div className="flex items-center gap-3">
              <Car size={16} />
              <div className="flex flex-col">
                <span className="text-muted-foreground text-xs">Aluguéis</span>
                <span className="text-xs font-bold">42</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <TrendingUp size={16} />
              <div className="flex flex-col text-[#19D37C]">
                <span className="text-muted-foreground text-xs">Ganhos</span>
                <span className="text-xs font-bold">
                  {Number(bookingTotalRevenue).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex justify-between">
            <div className="flex items-center">
              <h1 className="text-lg font-bold">
                {Number(car.pricePerHour).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </h1>
              <span className="text-muted-foreground text-xs">/hora</span>
            </div>

            <div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsEditOpen(true)}
              >
                <Pencil className="mr-2 h-4 w-4" />
                Editar
              </Button>

              <EditCarForm
                isOpen={isEditOpen}
                setIsOpen={setIsEditOpen}
                carId={car.id}
                defaultValues={car}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CarAnalyticsCard;
