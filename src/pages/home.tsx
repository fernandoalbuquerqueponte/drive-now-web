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
  brand: string;
  model: string;
  category: string; // Você também pode usar um Union Type aqui, ex: 'Sedan' | 'SUV' | 'Hatch'
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
    <div>
      <Header />
      <div className="px-5">
        <div className="container mx-auto w-screen py-20">
          <Card>
            <CardContent className="flex w-full flex-col">
              <FilterInput />
            </CardContent>
          </Card>

          {!isLoading && (
            <div className="ml-10 w-full py-11">
              <h3 className="text-2xl font-semibold">
                {data?.length} veículos disponíveis
              </h3>
            </div>
          )}
          <div className="grid grid-cols-1 justify-items-center gap-10 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              <div className="mx-auto flex w-full justify-center">
                <h1 className="text-3xl">carregando...</h1>
              </div>
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
