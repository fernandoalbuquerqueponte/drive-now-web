import { Car, TrendingUpIcon } from "lucide-react";

import type { Car as CarInterface } from "@/http/types/use-edit-user-profile-response";

import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

function CarListCard({ car }: { car: CarInterface }) {
  const bookingTotalRevenue = car.bookings.reduce((sum, booking) => {
    return sum + booking.totalPrice;
  }, 0);

  return (
    <Card>
      <CardContent className="flex h-26 w-full items-center">
        <div className="flex h-full items-center gap-3">
          <div className="h-full w-44 shrink-0">
            <img
              src={car.image}
              alt={car.brand}
              className="h-full w-full rounded-md object-cover"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <Badge>{car.available ? "Disponível" : "Alugado"}</Badge>
              <div className="flex items-center gap-2">
                <h4 className="truncate text-lg font-bold">
                  {car.brand} {car.model}
                </h4>
              </div>
            </div>
            <h3 className="text-muted-foreground text-sm">
              {Number(car.pricePerHour).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
              <span>/hora</span>
            </h3>
            <div className="flex items-center gap-4">
              <div className="text-muted-foreground flex items-center gap-2">
                <Car size={16} />
                <p className="text-xs">{car.bookings.length} aluguéis</p>
              </div>
              <div className="flex items-center gap-2 text-green-500/90">
                <TrendingUpIcon size={16} />
                <p className="text-xs">
                  {Number(bookingTotalRevenue).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CarListCard;
