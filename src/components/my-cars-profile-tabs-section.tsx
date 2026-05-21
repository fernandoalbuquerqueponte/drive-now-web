import { ArrowRight, Car, Plus } from "lucide-react";
import { Link } from "react-router-dom";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import type { Car as CarInterface } from "@/http/types/use-edit-user-profile-response";

import CarListCard from "./car-list-card";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

interface MyCarsSectionProps {
  cars: CarInterface[];
}

export default function MyCarsProfileTabsSection({ cars }: MyCarsSectionProps) {
  return (
    <div className="space-y-7">
      <div className="flex items-center justify-between pt-7">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold">Meus Carros</h1>

          <h3 className="text-muted-foreground text-sm">
            {cars.length} veículos cadastrados
          </h3>
        </div>

        <Link to="/my-cars">
          <Button variant="link" size="lg">
            Ver todos
            <ArrowRight />
          </Button>
        </Link>
      </div>

      <ScrollArea className="h-150 w-full">
        <div className="w-0 min-w-full space-y-6">
          {cars.map((c) => (
            <CarListCard key={c.id} car={c} />
          ))}

          {cars.length === 0 && (
            <Empty className="bg-muted/30 h-full">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Car />
                </EmptyMedia>

                <EmptyTitle>Lista de carros vazia</EmptyTitle>

                <EmptyDescription className="max-w-xs text-pretty">
                  Você ainda não cadastrou nenhum carro.
                </EmptyDescription>
              </EmptyHeader>

              <EmptyContent>
                <Link to="/my-cars">
                  <Button variant="outline" size="sm">
                    <Plus />
                    Cadastrar carro
                  </Button>
                </Link>
              </EmptyContent>
            </Empty>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
