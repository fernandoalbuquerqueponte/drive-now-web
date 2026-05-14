import { ArrowRight, Car, TrendingUpIcon } from "lucide-react";
import { Link } from "react-router-dom";

import type { Car as CarInterface } from "@/http/types/use-edit-user-profile-response";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

function CarListCard({ car }: { car: CarInterface }) {
  console.log(car);

  const bookingTotalRevenue = car.bookings.reduce((sum, booking) => {
    return sum + booking.totalPrice;
  }, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pt-7">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold">Meus Carros</h1>
          <h3 className="text-muted-foreground text-sm">
            {} veículos cadastrados
          </h3>
        </div>
        <Link to="/my-cars">
          <Button variant="link" size="lg">
            Ver todos
            <ArrowRight />
          </Button>
        </Link>
      </div>
      <Card>
        <CardContent className="flex w-full items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={car.image} alt={car.brand} className="w-35 rounded-lg" />
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold">
                  {car.brand} {car.model}
                </h1>
                <Badge>{car.available ? "Disponível" : "Alugado"}</Badge>
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
                  <p className="text-xs">42 aluguéis</p>
                </div>
                <div className="flex items-center gap-2 text-green-500/90">
                  <TrendingUpIcon size={16} />
                  <p className="text-xs">
                    {" "}
                    {Number(bookingTotalRevenue).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Link to="/my-cars">
            <Button variant="ghost" size="icon">
              <ArrowRight />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

export default CarListCard;
