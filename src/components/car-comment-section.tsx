import { zodResolver } from "@hookform/resolvers/zod";
import { MessageCircle } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import type { UseGetCarByIdResponse } from "@/http/types/use-get-car-by-id-response";
import { useCreateReview } from "@/http/use-create-review";

import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

const addCommentForm = z.object({
  comment: z.string().min(1, "O é comentário é obrigatório"),
  rating: z.number().min(1).max(5),
});

interface CarCommentSectionProps {
  id: string;
  data: UseGetCarByIdResponse;
}

function CarCommentSection({ id, data }: CarCommentSectionProps) {
  const { mutateAsync: createCarReview } = useCreateReview(id!);

  const form = useForm<z.infer<typeof addCommentForm>>({
    resolver: zodResolver(addCommentForm),
    defaultValues: {
      comment: "",
      rating: 1,
    },
  });

  async function onSubmit({ comment, rating }: z.infer<typeof addCommentForm>) {
    try {
      await createCarReview({ comment, rating });
      toast.success("Avaliação enviada com sucesso!");
      form.reset({ comment: "", rating: 1 });
    } catch (error) {
      console.error("Erro ao criar conta:", error);
      toast.error("Erro ao criar conta.");
    }
  }
  return (
    <div className="mt-8 flex w-full flex-col gap-3 rounded-2xl bg-zinc-900 px-8 py-7">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <MessageCircle size={22} />
          <h2 className="text-xl font-bold">Comentários</h2>
        </div>
        <Badge variant="secondary">{data?.reviews.length}</Badge>
      </div>

      <div>
        <form
          action=""
          onSubmit={form.handleSubmit(onSubmit)}
          id="add-comment-form"
          className="mb-6 flex w-full flex-col gap-3 rounded-lg bg-zinc-800 p-5"
        >
          {" "}
          <h2 className="text-lg font-bold">Deixe sua avaliação</h2>
          <Controller
            name="rating"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel>Avaliação</FieldLabel>

                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => field.onChange(star)}
                      className={`text-2xl ${
                        field.value >= star
                          ? "text-yellow-400"
                          : "text-zinc-500"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </Field>
            )}
          />
          <Controller
            name="comment"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Comentário</FieldLabel>
                <Textarea
                  {...field}
                  id={field.name}
                  placeholder="Conte sobre sua experiência com este veículo..."
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Button type="submit" form="add-comment-form" size="lg">
            Enviar avaliação
          </Button>
        </form>
      </div>
      <Separator />

      <ScrollArea className="h-125 w-full">
        {data?.reviews.map((review) => (
          <div key={review.id} className="flex items-start gap-4 border-b p-4">
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
      </ScrollArea>
    </div>
  );
}

export default CarCommentSection;
