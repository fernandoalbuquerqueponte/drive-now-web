import { Car, TrendingUpIcon } from "lucide-react";

import type { Car as CarInterface } from "@/http/types/use-edit-user-profile-response";

import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

function CarListCard({ car }: { car: CarInterface }) {
  const bookingTotalRevenue = car.bookings.reduce((sum, booking) => {
    return sum + booking.totalPrice;
  }, 0);

  return (
    <Card className="w-full overflow-hidden">
      <CardContent className="flex h-26 w-full items-center overflow-hidden">
        <div className="flex h-full w-full min-w-0 items-center gap-3">
          <div className="h-full w-44 shrink-0 overflow-hidden">
            <img
              src={car.image}
              alt={car.brand}
              className="h-full w-full rounded-md object-cover"
            />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-2 overflow-hidden">
            <div className="flex min-w-0 flex-col gap-2">
              <Badge className="w-fit">
                {car.available ? "Disponível" : "Alugado"}
              </Badge>

              <div className="flex min-w-0 items-center gap-2">
                <h4 className="block w-full truncate text-lg font-bold">
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
                <p className="nowrap block w-full truncate text-xs">
                  {car.bookings.length} aluguéis
                </p>
              </div>
              <div className="flex min-w-0 items-center gap-2 text-green-500/90">
                <TrendingUpIcon size={16} />
                <p className="block w-full truncate text-xs">
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
