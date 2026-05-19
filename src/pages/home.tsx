import { Clock, Medal, Shield } from "lucide-react";
import { parseAsString, useQueryStates } from "nuqs";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import CarCard from "@/components/car-card";
import FilterInput from "@/components/filter-input";
import Header from "@/components/header";
import { AuroraText } from "@/components/ui/aurora-text";
import { Card, CardContent } from "@/components/ui/card";
import { DotPattern } from "@/components/ui/dot-pattern";
import { Spinner } from "@/components/ui/spinner";
import { useCars } from "@/http/use-cars";
import { cn } from "@/lib/utils";

export interface CarSpecification {
  label: string;
  value: string;
}

export interface Car {
  id: string;
  brand: string;
  model: string;
  category: string;
  image: string;
  gallery: string[];
  year: number;
  pricePerHour: number;
  description: string;
  available: boolean;
  specifications: CarSpecification[];
  features: string[];
}

function HomePage() {
  const [filters, setFilters] = useQueryStates(
    {
      search: parseAsString.withDefault(""),
      category: parseAsString.withDefault(""),
      priceRange: parseAsString.withDefault(""),
      transmission: parseAsString.withDefault(""),
      fuel: parseAsString.withDefault(""),
    },
    {
      shallow: false,
      history: "replace",
    },
  );
  const navigate = useNavigate();

  const { data, isLoading } = useCars(filters);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/authentication");
    }
  }, [navigate]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters({
      [key]: value === "all" || value === "" ? null : value,
    });
  };

  return (
    <div className="w-full">
      <Header />

      <div className="relative my-auto flex min-h-150 flex-col items-center justify-center space-y-4 pt-6 md:h-145">
        <DotPattern
          className={cn(
            "mask-[radial-gradient(ellipse_at_center,white,transparent)]",
          )}
        />
        <div className="relative z-10 container mx-auto flex flex-col items-center gap-3 px-5 text-center">
          <AuroraText
            colors={["#FFFFFF", "#E4E4E7", "#9A9A9A"]}
            className="text-3xl leading-tight font-bold md:text-5xl"
          >
            Alugue o Carro dos Seus Sonhos
          </AuroraText>
          <p className="text-muted-foreground max-w-2xl text-lg text-pretty md:text-xl">
            Descubra nossa frota premium de veículos disponíveis para aluguel
            por hora. Qualidade, conforto e segurança garantidos.
          </p>
        </div>
        <div className="relative z-10 mt-8 grid w-full max-w-5xl grid-cols-1 gap-6 px-5 md:grid-cols-3">
          <Card className="w-full">
            <CardContent className="flex flex-col items-center space-y-3 text-center">
              <div className="flex flex-col items-center gap-2">
                <div className="rounded-full bg-zinc-700 p-3 text-center">
                  <Shield />
                </div>
                <h2 className="text-lg font-bold">Seguro total</h2>
              </div>
              <p className="text-muted-foreground text-sm">
                Proteção completa em todos os veículos
              </p>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardContent className="flex flex-col items-center space-y-3 text-center">
              <div className="flex flex-col items-center gap-2">
                <div className="rounded-full bg-zinc-700 p-3 text-center">
                  <Clock />
                </div>
                <h2 className="text-lg font-bold">Reserva Rápida</h2>
              </div>
              <p className="text-muted-foreground text-sm">
                Processo simples em poucos cliques
              </p>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardContent className="flex flex-col items-center space-y-3 text-center">
              <div className="flex flex-col items-center gap-2">
                <div className="rounded-full bg-zinc-700 p-3 text-center">
                  <Medal />
                </div>
                <h2 className="text-lg font-bold">Qualidade Garantida</h2>
              </div>
              <p className="text-muted-foreground text-sm">
                Veículos premium, sempre revisados
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="container mx-auto w-full px-5 py-20">
        <FilterInput filters={filters} onFilterChange={handleFilterChange} />

        {!isLoading && (
          <div className="w-full py-11 pl-10">
            <h3 className="text-xl font-semibold">
              {data?.length} veículos disponíveis
            </h3>
          </div>
        )}
        <div className="grid grid-cols-1 justify-items-center gap-10 pb-20 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <div className="col-span-full flex min-h-100 w-full items-center justify-center">
              <Spinner className="size-5" />
            </div>
          ) : (
            data?.map((item: Car) => <CarCard key={item.id} item={item} />)
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
