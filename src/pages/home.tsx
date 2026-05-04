import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import CarCard from "@/components/car-card";
import FilterInput from "@/components/filter-input";
import Header from "@/components/header";
import { Card, CardContent } from "@/components/ui/card";
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
  const navigate = useNavigate();

  const { data, isLoading } = useCars();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/authentication");
    }
  }, [navigate]);

  return (
    <div className="w-full">
      <Header />
      <div className="px-5">
        <div className="container mx-auto w-full py-20">
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

          <Card>
            <CardContent className="flex w-full flex-col">
              <FilterInput />
            </CardContent>
          </Card>

          {!isLoading && (
            <div className="w-full py-11 pl-10">
              <h3 className="text-2xl font-semibold">
                {data?.length} veículos disponíveis
              </h3>
            </div>
          )}
          <div className="container mx-auto grid grid-cols-1 justify-items-center gap-10 pb-20 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              <h1 className="text-3xl">Carregando...</h1>
            ) : (
              data?.map((item: Car) => <CarCard item={item} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
