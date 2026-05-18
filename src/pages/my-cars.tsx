import { Plus } from "lucide-react";
import { useState } from "react";

import CarAnalyticsCard from "@/components/car-analytics-card";
import CarStats from "@/components/car-stats";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import EditCarForm from "@/components/upsert-car-dialog";
import { useGetUser } from "@/http/use-get-user";

function MyCarsPage() {
  const { data } = useGetUser();

  const [isAddOpen, setIsAddOpen] = useState(false);

  if (!data) {
    return null;
  }

  return (
    <>
      <Header />

      <div className="container mx-auto">
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

        <div className="flex items-center justify-center gap-5">
          <CarStats cars={data.cars} />
        </div>

        <div className="grid w-full grid-cols-3 gap-5 py-20">
          {data.cars.map((c) => (
            <CarAnalyticsCard car={c} key={c.id} />
          ))}
        </div>
      </div>
    </>
  );
}

export default MyCarsPage;
