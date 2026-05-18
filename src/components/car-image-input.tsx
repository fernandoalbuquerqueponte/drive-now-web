import { Pencil, Plus } from "lucide-react";
import { type Control, Controller, useWatch } from "react-hook-form";

import { type CarFormSchema } from "@/schemas/car-form-schema";

import { Field, FieldError, FieldLabel } from "../components/ui/field";
import { Input } from "../components/ui/input";

export function CarImageInput({
  control,
}: {
  control: Control<CarFormSchema>;
}) {
  const watchedImage = useWatch({ control, name: "image" });

  return (
    <Controller
      name="image"
      control={control}
      render={({ field: { onChange, onBlur, name, ref }, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="space-y-2">
          <FieldLabel className="text-muted-foreground text-xs font-medium">
            Imagem Principal
          </FieldLabel>
          <Input
            id="image-file"
            type="file"
            accept="image/*"
            className="hidden"
            name={name}
            onBlur={onBlur}
            ref={ref}
            onChange={(e) => onChange(e.target.files?.[0])}
          />
          <label
            htmlFor="image-file"
            className="group relative block aspect-video w-full max-w-75 cursor-pointer overflow-hidden rounded-lg border border-slate-800 bg-slate-900/50 transition-all hover:border-slate-700"
          >
            {watchedImage ? (
              <div>
                <img
                  src={
                    watchedImage instanceof File
                      ? URL.createObjectURL(watchedImage)
                      : watchedImage
                  }
                  alt="Preview principal"
                  className="relative h-full w-full object-contain transition-transform duration-200 group-hover:scale-105"
                />

                <div className="absolute top-2 right-2 z-10">
                  <span className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-800 bg-slate-950/80 text-slate-400 shadow-md backdrop-blur-sm transition-all hover:bg-slate-900 hover:text-slate-200">
                    <Pencil className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-muted-foreground flex h-full flex-col items-center justify-center gap-2 py-6 text-xs">
                <Plus className="h-5 w-5 text-slate-500" />
                <span>Selecionar imagem</span>
              </div>
            )}
          </label>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
