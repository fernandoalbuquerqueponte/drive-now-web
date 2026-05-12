import { parseAsString, useQueryStates } from "nuqs";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import CarCard from "@/components/car-card";
import FilterInput from "@/components/filter-input";
import Header from "@/components/header";
import { Spinner } from "@/components/ui/spinner";
import { useCars } from "@/http/use-cars";

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

    console.log(value);
  };
  return (
    <div className="w-full">
      <Header />

      <div className="container mx-auto w-full px-5 py-20">
        <div className="mb-16 flex w-full flex-col items-center gap-3 px-4 text-center">
          {" "}
          <h1 className="text-3xl leading-tight font-bold md:text-5xl">
            Alugue o Carro dos Seus Sonhos
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg text-pretty md:text-xl">
            Descubra nossa frota premium de veículos disponíveis para aluguel
            por hora. Qualidade, conforto e segurança garantidos.
          </p>
        </div>

        <FilterInput filters={filters} onFilterChange={handleFilterChange} />

        {!isLoading && (
          <div className="w-full py-11 pl-10">
            <h3 className="text-2xl font-semibold">
              {data?.length} veículos disponíveis
            </h3>
          </div>
        )}
        <div className="grid grid-cols-1 justify-items-center gap-10 pb-20 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <div className="col-span-full flex min-h-100 w-full items-center justify-center">
              <Spinner className="size-7" />
            </div>
          ) : (
            data?.map((item: Car) => <CarCard item={item} />)
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
