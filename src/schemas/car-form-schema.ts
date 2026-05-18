import { z } from "zod";

export const carFormSchema = z.object({
  brand: z.string().trim().min(1, { message: "Marca é obrigatória." }),
  model: z.string().trim().min(1, { message: "Modelo é obrigatório." }),
  category: z.string().trim().min(1, { message: "Categoria é obrigatória." }),
  image: z.instanceof(File, { message: "A imagem principal é obrigatória." }),
  year: z.coerce.number().int().min(1900, "Ano inválido"),
  pricePerHour: z.coerce
    .number()
    .min(0, { message: "O preço deve ser maior ou igual a zero" }),
  description: z.string().min(10, { message: "Mínimo de 10 caracteres." }),
  available: z.boolean().default(true),
  gallery: z
    .instanceof(FileList, { message: "Selecione as fotos da galeria." })
    .refine(
      (files) => files.length > 0,
      "Adicione pelo menos uma foto na galeria.",
    ),
  specifications: z
    .array(
      z.object({
        label: z.string(),
        value: z.string().min(1, "O valor é obrigatório"),
      }),
    )
    .default([]),
  features: z
    .array(
      z.object({
        value: z.string().min(1, "A característica não pode estar vazia"),
      }),
    )
    .default([]),
});

export type CarFormSchema = z.infer<typeof carFormSchema>;
