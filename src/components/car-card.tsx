import { Activity, Fuel, Gauge, Settings, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import type { Car } from "@/pages/home";

import { Card, CardContent } from "./ui/card";

const getSpecIcon = (label: string) => {
  switch (label.toLowerCase()) {
    case "lugares":
      return <Users size={16} />;
    case "transmissão":
      return <Settings size={16} />;
    case "combustível":
      return <Fuel size={16} />;
    case "motor":
      return <Activity size={16} />;
    case "potência":
      return <Zap size={16} />;
    case "consumo":
      return <Gauge size={16} />;
    default:
      return <Activity size={16} />;
  }
};

function CarCard({ item }: { item: Car }) {
  return (
    <Link to={`/car/${item.id}`} className="h-full w-full">
      <Card className="h-full">
        <CardContent className="flex cursor-pointer items-center">
          <div className="flex w-full flex-col gap-3">
            <img
              src={item.image}
              alt={item.model}
              className="h-48 w-full rounded-lg object-cover md:h-60"
            />
            <Badge>{item.category}</Badge>
            <h3 className="text-lg font-bold">
              {item.brand} {item.model}
            </h3>
            <div className="text-muted-foreground flex items-center gap-4 whitespace-nowrap">
              {item.specifications.slice(0, 3).map((spec, index) => (
                <div key={index} className="flex items-center gap-2">
                  {getSpecIcon(spec.label)}
                  <span className="max-w-full truncate text-xs">
                    {spec.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                R$ {item.pricePerHour}{" "}
                <span className="text-sm font-normal text-zinc-300">/hora</span>
              </h2>
              <p className="text-muted-foreground text-sm">Ver detalhes</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default CarCard;
