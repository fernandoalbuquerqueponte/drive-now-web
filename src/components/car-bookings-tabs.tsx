import { Car, HomeIcon } from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router-dom";

import BookingCard, { type BookingStatus } from "@/components/booking-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Car as CarInterface } from "@/types/car";

import { Button } from "./ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./ui/empty";

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
  car: CarInterface;
}

interface CarBookingTabsProps {
  bookings: BookingResponse[];
}

function CarBookingTabs({ bookings }: CarBookingTabsProps) {
  const filterBookings = useMemo(() => {
    const now = new Date();
    if (!bookings) return { active: [], cancelled: [], history: [] };
    return {
      active: bookings.filter(
        (b) => b.status !== "CANCELLED" && new Date(b.endDate) > now,
      ),
      cancelled: bookings.filter((b) => b.status === "CANCELLED"),
      history: bookings?.filter(
        (b) => b.status !== "CANCELLED" && new Date(b.endDate) <= now,
      ),
    };
  }, [bookings]);

  return (
    <Tabs defaultValue="active" className="w-250">
      <TabsList className="flex w-full items-center">
        <TabsTrigger value="active">Reservas Ativas</TabsTrigger>
        <TabsTrigger value="cancelled">Reservas Canceladas</TabsTrigger>
        <TabsTrigger value="historic">Histórico</TabsTrigger>
      </TabsList>

      <TabsContent value="active" className="mt-6 flex flex-col gap-6">
        {filterBookings.active.length > 0 ? (
          filterBookings.active.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <Empty className="bg-muted/30 h-full">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Car />
                </EmptyMedia>
                <EmptyTitle>Sem carros por aqui</EmptyTitle>
                <EmptyDescription className="max-w-xs text-pretty">
                  Nenhum carro encontrado.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Link to="/home">
                  <Button variant="outline">
                    <HomeIcon />
                    Adicionar reserva
                  </Button>
                </Link>
              </EmptyContent>
            </Empty>
          </div>
        )}
      </TabsContent>
      <TabsContent value="cancelled" className="mt-6 flex flex-col gap-6">
        {filterBookings.cancelled.length > 0 ? (
          filterBookings.cancelled.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <Empty className="bg-muted/30 h-full">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Car />
                </EmptyMedia>
                <EmptyTitle>Sem carros por aqui</EmptyTitle>
                <EmptyDescription className="max-w-xs text-pretty">
                  Nenhum carro encontrado.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Link to="/home">
                  <Button variant="outline">
                    <HomeIcon />
                    Adicionar reserva
                  </Button>
                </Link>
              </EmptyContent>
            </Empty>
          </div>
        )}
      </TabsContent>
      <TabsContent value="historic" className="mt-6 flex flex-col gap-6">
        {filterBookings.history.length > 0 ? (
          filterBookings.history.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <Empty className="bg-muted/30 h-full">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Car />
                </EmptyMedia>
                <EmptyTitle>Sem carros por aqui</EmptyTitle>
                <EmptyDescription className="max-w-xs text-pretty">
                  Nenhum carro encontrado.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Link to="/home">
                  <Button variant="outline">
                    <HomeIcon />
                    Adicionar reserva
                  </Button>
                </Link>
              </EmptyContent>
            </Empty>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}

export default CarBookingTabs;
