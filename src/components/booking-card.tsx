import { format } from "date-fns";
import { ArrowRightIcon, Calendar, CircleDollarSign } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import type { Car } from "@/types/car";

import BookingDetails from "./booking-details";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED";

export interface BookingResponse {
  id: string;
  carId: string;
  userId: string;
  startDate: string;
  endDate: string;
  totalHours: number;
  totalPrice: number;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
  car: Car;
}

interface BookingCardProps {
  booking: BookingResponse;
}

const statusLabel = {
  PENDING: "Aguardando pagamento",
  CONFIRMED: "Confirmada",
  CANCELLED: "Cancelada",
};

function BookingCard({ booking }: BookingCardProps) {
  return (
    <Sheet>
      <SheetTrigger asChild className="w-full">
        <Card>
          <CardContent className="flex w-full cursor-pointer items-center justify-between">
            <div className="flex gap-5">
              <img
                src={booking.car.image}
                alt="carro"
                className="w-30 rounded-md object-cover"
              />

              <div className="flex flex-col gap-2">
                <Badge>{statusLabel[booking.status]}</Badge>
                <h1 className="text-start text-2xl font-semibold">
                  {booking.car.brand} {booking.car.model}
                </h1>

                <div className="flex flex-col gap-3">
                  <div className="text-muted-foreground flex items-center gap-2">
                    <Calendar size={20} />{" "}
                    {format(booking.startDate, "dd/MM/yyyy")} até{" "}
                    {format(booking.endDate, "dd/MM/yyyy")}
                  </div>
                  <div className="text-foreground flex items-center gap-2">
                    <CircleDollarSign size={20} />
                    <h1 className="text-lg font-bold">
                      {Number(booking.totalPrice).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-3">
              <ArrowRightIcon size={20} className="text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>

      <SheetContent className="min-w-150 flex flex-col h-full">
        <BookingDetails booking={booking} />
      </SheetContent>
    </Sheet>
  );
}

export default BookingCard;
