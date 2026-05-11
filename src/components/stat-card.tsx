import { Card, CardContent } from "./ui/card";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  iconBgColor?: string;
}

function StatCard({
  label,
  value,
  icon,
  iconBgColor = "bg-secondary/10",
}: StatCardProps) {
  return (
    <Card className="w-full">
      <CardContent className="flex items-center justify-start gap-4 py-5">
        <div
          className={`rounded-xl p-3 ${iconBgColor} flex items-center justify-center`}
        >
          {icon}
        </div>

        <div className="flex flex-col">
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-muted-foreground text-sm tracking-tight">
            {label}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default StatCard;
