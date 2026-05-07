import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Briefcase,
  Calendar,
  CarIcon,
  Clock,
  CreditCardIcon,
  DollarSign,
  Fuel,
  Settings,
  X,
  Zap,
} from "lucide-react";

import { useCreateCheckout } from "@/http/use-create-checkout";

import type { BookingResponse } from "./booking-card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { SheetFooter, SheetHeader } from "./ui/sheet";

const statusLabel = {
  PENDING: "Aguardando pagamento",
  CONFIRMED: "Confirmada",
  CANCELLED: "Cancelada",
};

interface BookingDetailsProps {
  booking: BookingResponse;
}

function BookingDetails({ booking }: BookingDetailsProps) {
  const { mutate, isPending } = useCreateCheckout();

  const handlePayment = () => {
    mutate({ bookingId: booking.id });
  };

  return (
    <div className="flex h-full flex-col px-4">
      <ScrollArea className="h-full flex-1">
        <SheetHeader className="px-6 py-8">
          <CardTitle className="text-xl">
            {booking.car.brand} {booking.car.model}
          </CardTitle>
        </SheetHeader>

        <div className="flex flex-col gap-5">
          <img
            className="h-80 w-150 rounded-md object-cover"
            src={booking.car.image}
            alt="dede"
          />

          <Badge className="text-md p-3">{statusLabel[booking.status]}</Badge>

          <Separator />
        </div>

        <div className="flex flex-col pt-6">
          <div className="flex items-center gap-3">
            <CarIcon />{" "}
            <h3 className="text-lg font-semibold">Informações do Veículo</h3>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6">
            <div className="flex flex-col gap-1">
              <p className="text-muted-foreground text-xs tracking-wider uppercase">
                Categoria
              </p>
              <div className="flex items-center gap-2">
                <Briefcase size={18} className="text-primary" />
                <p className="font-semibold text-white">
                  {booking.car.category}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-muted-foreground text-xs tracking-wider uppercase">
                Motor
              </p>
              <div className="flex items-center gap-2">
                <Zap size={18} className="text-primary" />
                <p className="font-semibold text-white">2.0 TFSI</p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-muted-foreground text-xs tracking-wider uppercase">
                Transmissão
              </p>
              <div className="flex items-center gap-2">
                <Settings size={18} className="text-primary" />
                <p className="font-semibold text-white">Automático</p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-muted-foreground text-xs tracking-wider uppercase">
                Combustível
              </p>
              <div className="flex items-center gap-2">
                <Fuel size={18} className="text-primary" />
                <p className="font-semibold text-white">Gasolina</p>
              </div>
            </div>
          </div>

          <Separator className="my-9" />

          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <Calendar />{" "}
              <h3 className="text-lg font-semibold">Período da Reserva</h3>
            </div>

            <Card>
              <CardContent className="space-y-5">
                <div className="flex flex-col gap-4">
                  <div className="flex w-full flex-col">
                    <p className="text-muted-foreground text-sm">Início</p>
                    <p className="text-lg font-semibold">
                      {format(
                        new Date(booking.startDate),
                        "EEEE, dd 'De' MMMM 'De' yyyy",
                        {
                          locale: ptBR,
                        },
                      )}
                    </p>
                  </div>
                  <div className="flex w-full flex-col">
                    <p className="text-muted-foreground text-sm">Fim</p>
                    <p className="text-lg font-semibold">
                      {format(
                        new Date(booking.endDate),
                        "EEEE, dd 'De' MMMM 'De' yyyy",
                        {
                          locale: ptBR,
                        },
                      )}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="text-muted-foreground flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Clock size={15} />
                    <p className="text-sm">Duração</p>
                  </div>

                  <div>
                    <p className="text-sm">2 dias</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Separator />

            <div className="flex items-center gap-3">
              <DollarSign />
              <h3 className="text-lg font-semibold">Período da Reserva</h3>
            </div>

            <Card>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <p>Valor por hora:</p>
                    <p>
                      {" "}
                      {Number(booking.car.pricePerHour).toLocaleString(
                        "pt-BR",
                        {
                          style: "currency",
                          currency: "BRL",
                        },
                      )}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p>Período</p>
                    <p>05/05/2026 - 07/05/2026</p>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold">Total</p>
                    <p className="text-lg font-bold">
                      {" "}
                      {Number(booking.totalPrice).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <SheetFooter className="flex flex-col gap-3">
          <Button size="lg" onClick={handlePayment} disabled={isPending}>
            <CreditCardIcon />
            {isPending ? "Processando..." : "Pagar Agora"}
          </Button>
          <Button size="lg" variant="destructive">
            <X />
            Cancelar reserva
          </Button>
        </SheetFooter>
      </ScrollArea>
    </div>
  );
}

export default BookingDetails;
