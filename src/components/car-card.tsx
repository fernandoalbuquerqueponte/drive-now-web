import { Activity, Fuel, Gauge, Settings, Users, Zap } from "lucide-react";

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
    <Card className="group w-full max-w-87.5 overflow-hidden hover:shadow-lg">
      <CardContent className="flex cursor-pointer items-center gap-5">
        <div className="flex w-full flex-col gap-3">
          <img src={item.image} alt="" className="min-h-full rounded-lg" />
          <Badge>{item.category}</Badge>
          <h3 className="text-lg font-bold">
            {item.brand} {item.model}
          </h3>
          <div className="flex items-center gap-4">
            {item.specifications.map((spec, index) => (
              <div key={index} className="flex items-center gap-2">
                {getSpecIcon(spec.label)}
                <span className="text-sm">{spec.label}</span>
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
  );
}

export default CarCard;
