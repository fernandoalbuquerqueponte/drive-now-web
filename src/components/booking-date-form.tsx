import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useWatch } from "react-hook-form";
import { z } from "zod";

import type { Car } from "@/pages/home";

import DatePickerField from "./date-picker-field";
import { Button } from "./ui/button";
import { Field, FieldLabel } from "./ui/field";
import { Separator } from "./ui/separator";

type BookingDateFormProps = {
  carDetails: Car;
};

const addCommentForm = z
  .object({
    from: z.date(),
    to: z.date(),
    hours: z.number().optional(),
  })
  .refine((data) => data.to >= data.from, {
    message: "Data final deve ser maior que a inicial",
    path: ["to"],
  });

export default function BookingDateForm({ carDetails }: BookingDateFormProps) {
  const form = useForm<z.infer<typeof addCommentForm>>({
    resolver: zodResolver(addCommentForm),
    defaultValues: {
      from: undefined,
      to: undefined,
    },
  });

  const from = useWatch({
    control: form.control,
    name: "from",
  });

  const to = useWatch({
    control: form.control,
    name: "to",
  });

  console.log("price:", carDetails.pricePerHour);
  const days =
    from && to && to >= from
      ? Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24))
      : 0;

  const subtotal = days * carDetails.pricePerHour * 24;

  async function onSubmit(data: z.infer<typeof addCommentForm>) {
    try {
      // await createCarReview({ comment, rating });
      console.log(data);
      form.reset();
    } catch (error) {
      console.error("Erro ao criar conta:", error);
    }
  }
  return (
    <div className="flex flex-col gap-3">
      <form id="date-range" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between gap-2">
          <Controller
            name="from"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Data início</FieldLabel>

                <DatePickerField
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Selecionar"
                />

                {fieldState.error && (
                  <p className="text-sm text-red-500">
                    {fieldState.error.message}
                  </p>
                )}
              </Field>
            )}
          />

          <Controller
            name="to"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Data fim</FieldLabel>

                <DatePickerField
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Selecionar"
                />

                {fieldState.error && (
                  <p className="text-sm text-red-500">
                    {fieldState.error.message}
                  </p>
                )}
              </Field>
            )}
          />
        </div>

        <div className="text-muted-foreground flex flex-col gap-3 pt-7 pb-5">
          <Separator className="" />
          <div className="flex w-full justify-between">
            <span>Subtotal:</span>
            <span>
              {" "}
              R${" "}
              {subtotal.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="flex w-full justify-between">
            <span>Taxa de serviço:</span>
            <span>R$ 0,00</span>
          </div>
          <div className="flex w-full justify-between">
            <span>Seguro:</span>
            <span>R$ 0,00</span>
          </div>
          <Separator className="mt-2 mb-2" />
          <div className="flex w-full justify-between font-bold text-white">
            <span>Total:</span>
            <span>R$ 4320</span>
          </div>
        </div>

        <Button
          className="w-full cursor-pointer"
          size="lg"
          form="date-range"
          type="submit"
        >
          Reservar agora
        </Button>
      </form>
    </div>
  );
}
