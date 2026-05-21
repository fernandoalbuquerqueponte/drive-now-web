import { z } from "zod";

export const carFormSchema = z.object({
  brand: z.string().trim().min(1, { message: "Marca é obrigatória." }),
  model: z.string().trim().min(1, { message: "Modelo é obrigatório." }),
  category: z.string().trim().min(1, { message: "Categoria é obrigatória." }),
  image: z.union([
    z.instanceof(File, { message: "A imagem principal é obrigatória." }),
    z.url(),
  ]),
  year: z.coerce.number().int().min(1900, "Ano inválido"),
  pricePerHour: z.coerce
    .number()
    .min(0, { message: "O preço deve ser maior ou igual a zero" }),
  description: z.string().min(10, { message: "Mínimo de 10 caracteres." }),
  available: z.boolean().default(true),
  gallery: z
    .union([z.instanceof(FileList), z.array(z.url()), z.any()])
    .optional(),
  specifications: z
    .array(
      z.object({
        label: z.string(),
        value: z.string().min(1, "O valor é obrigatório"),
      }),
    )
    .default([]),
  features: z.array(z.string()),
});

export type CarFormSchema = z.infer<typeof carFormSchema>;
