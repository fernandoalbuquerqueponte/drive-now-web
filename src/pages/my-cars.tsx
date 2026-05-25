import { Car, Plus } from "lucide-react";
import { useState } from "react";

import CarAnalyticsCard from "@/components/car-analytics-card";
import CarStats from "@/components/car-stats";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import EditCarForm from "@/components/upsert-car-dialog";
import { useGetUser } from "@/http/use-get-user";

function MyCarsPage() {
  const { data } = useGetUser();

  const [isAddOpen, setIsAddOpen] = useState(false);

  if (!data) {
    return null;
  }

  return (
    <div className="container mx-auto px-5">
      <div className="flex w-full items-center justify-between py-11">
        <div className="flex flex-col items-start gap-1">
          <h1 className="text-3xl font-bold">Meus Carros</h1>
          <h3 className="text-muted-foreground text-sm">
            Gerencie os veículos que você cadastrou para aluguel
          </h3>
        </div>

        <div>
          <Button size="lg" onClick={() => setIsAddOpen(true)}>
            <Plus />
            Adicionar veículo
          </Button>

          <EditCarForm isOpen={isAddOpen} setIsOpen={setIsAddOpen} />
        </div>
      </div>

      <div className="">
        <CarStats cars={data.cars} />
      </div>

      <div className="grid w-full grid-cols-1 gap-5 py-20 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {data.cars.length === 0 ? (
          <Empty className="bg-muted/30 h-full">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Car />
              </EmptyMedia>
              <EmptyTitle>Lista de carros vazia</EmptyTitle>
              <EmptyDescription className="max-w-xs text-pretty">
                Você ainda não cadastrou nenhum veículo.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button size="xs" onClick={() => setIsAddOpen(true)}>
                <Plus />
                Adicionar veículo
              </Button>

              <EditCarForm isOpen={isAddOpen} setIsOpen={setIsAddOpen} />
            </EmptyContent>
          </Empty>
        ) : (
          <div className="grid w-full grid-cols-1 gap-5 py-20 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {data.cars.map((c) => (
              <CarAnalyticsCard car={c} key={c.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyCarsPage;
