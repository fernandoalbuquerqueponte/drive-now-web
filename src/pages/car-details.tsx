import { MapPin, MessageCircle, Timer } from "lucide-react";
import {
  Activity,
  Calendar,
  Fuel,
  Settings,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";
import { useParams } from "react-router-dom";

import Header from "@/components/header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useGetCarById } from "@/http/use-get-car-by-id";

const iconMap: Record<string, React.ElementType> = {
  Motor: Activity,
  Transmissão: Settings,
  Combustível: Fuel,
  Lugares: Users,
  Ano: Calendar,
  Potência: Zap,
  Seguro: ShieldCheck,
};

function CarDetailsPage() {
  const { id } = useParams();

  const { data } = useGetCarById(id!);
  return (
    <div className="w-full">
      <Header />

      <img
        src={data?.image}
        alt={data?.brand}
        className="mb-7 rounded-md object-contain"
      />
      <div className="px-5">
        <div className="flex w-full flex-col gap-3 rounded-2xl bg-zinc-900 px-8 py-7">
          <Badge>{data?.category}</Badge>
          <h2 className="text-2xl font-bold">
            {data?.brand} {data?.model}
          </h2>

          <div className="flex items-center gap-4">
            <div className="text-muted-foreground flex gap-2">
              <MapPin size={20} />
              Sobral, CE
            </div>

            <div className="text-muted-foreground flex gap-2">
              <Timer size={20} />
              Disponível agora
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-6 pb-6">
            <div className="flex items-center gap-3 text-zinc-300">
              <Calendar size={22} className="text-zinc-500" />
              <span className="font-medium">{data?.year}</span>
            </div>

            {data?.specifications?.map((spec) => {
              const Icon = iconMap[spec.label] || Activity;
              return (
                <div
                  key={spec.id}
                  className="flex items-center gap-3 text-zinc-300"
                >
                  <Icon size={22} className="text-zinc-500" />
                  <span className="font-medium">{spec.value}</span>
                </div>
              );
            })}
          </div>
          <Separator />

          <div className="flex flex-col gap-3 pt-7">
            <h2 className="text-2xl font-bold">Sobre este veículo</h2>

            <p>{data?.description}</p>
          </div>

          <div className="flex flex-col gap-4 pt-4">
            <h3 className="text-xl font-bold">Especificações</h3>

            <div className="flex flex-col gap-2">
              {data?.specifications.map((specification) => (
                <div className="flex w-full items-center justify-between">
                  <p>{specification.label}:</p>
                  <p>{specification.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full pt-5">
            <h3 className="text-xl font-bold">Recursos inclusos</h3>
            <div className="grid w-full grid-cols-2 pt-5">
              {data?.features.map((feature) => (
                <p>- {feature}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex w-full flex-col gap-3 rounded-2xl bg-zinc-900 px-8 py-7">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <MessageCircle size={22} />
              <h2 className="text-xl font-bold">Comentários</h2>
            </div>
            <Badge variant="secondary">{data?.reviews.length}</Badge>
          </div>

          <div className="mb-6 flex w-full flex-col gap-3 rounded-lg bg-zinc-800 p-5">
            <h2 className="text-lg font-bold">Deixe sua avaliação</h2>
            <Label className="text-md">Comentário</Label>
            <Textarea placeholder="Conte sobre sua experiência com este veículo..." />
            <Button size="lg">Enviar avaliação</Button>
          </div>
          <Separator />

          {data?.reviews.map((review) => (
            <div
              key={review.id}
              className="flex items-start gap-4 border-b p-4"
            >
              <Avatar className="h-13 w-13">
                <AvatarImage src={review.user.imageUrl || ""} />
                <AvatarFallback>
                  {review.user.first_name[0]?.toUpperCase()}
                  {review.user.last_name[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col gap-1">
                <p className="font-bold text-zinc-100 capitalize">
                  {review.user.first_name.toLowerCase()}{" "}
                  {review.user.last_name.toLowerCase()}
                </p>
                <p className="text-md text-zinc-400">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CarDetailsPage;
