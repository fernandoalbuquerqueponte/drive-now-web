import { Card, CardContent } from "./ui/card";

interface CarAnalyticsCardProps {
  value: string | number;
  label: string;
  icon: React.ReactNode;
}

function CarAnalyticsCard({ label, value, icon }: CarAnalyticsCardProps) {
  return (
    <Card className="w-full">
      <CardContent className="flex gap-5 p-3">
        <div className="flex items-center p-1">
          <div className="rounded-lg bg-zinc-700/70 p-2">{icon}</div>
        </div>

        <div className="flex flex-col gap-1">
          <h2 className="text-muted-foreground">{label}</h2>
          <h2 className="text-2xl font-bold">{value}</h2>
        </div>
      </CardContent>
    </Card>
  );
}

export default CarAnalyticsCard;
