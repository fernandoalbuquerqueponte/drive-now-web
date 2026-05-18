/* eslint-disable @typescript-eslint/no-explicit-any */
import { Plus, Trash2 } from "lucide-react";
import { type Control, Controller, useWatch } from "react-hook-form";

import { Button } from "./ui/button";
import { Field, FieldError, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";

export function CarGalleryInput({ control }: { control: Control<any> }) {
  const watchedGallery = useWatch({ control, name: "gallery" });

  const currentGalleryItems =
    watchedGallery instanceof FileList
      ? Array.from(watchedGallery)
      : Array.isArray(watchedGallery)
        ? watchedGallery
        : [];

  const galleryImages = currentGalleryItems.map((item) =>
    item instanceof File ? URL.createObjectURL(item) : item,
  );

  return (
    <Controller
      name="gallery"
      control={control}
      render={({ field: { onChange, onBlur, name, ref }, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="space-y-2">
          <FieldLabel>Galeria de Fotos ({galleryImages.length})</FieldLabel>
          <Input
            id="gallery-file"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            name={name}
            onBlur={onBlur}
            ref={ref}
            onChange={(e) => onChange(e.target.files)}
          />
          <div className="grid max-w-75 min-w-75 grid-cols-4 gap-2">
            {galleryImages.map((url, i) => (
              <div
                key={url}
                className="relative aspect-square w-full overflow-hidden rounded-lg border border-slate-800 bg-slate-900/50"
              >
                <div className="text-destructive hover:bg-destructive/10 absolute top-1 right-1 z-10">
                  <Button
                    variant="destructive"
                    type="button"
                    size="icon-xs"
                    className="h-6 px-2 text-xs"
                    onClick={() =>
                      onChange(
                        currentGalleryItems.filter((_, index) => index !== i),
                      )
                    }
                  >
                    <Trash2 />
                  </Button>
                </div>
                <img
                  src={url}
                  alt={`Preview ${i}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
            <label
              htmlFor="gallery-file"
              className="text-muted-foreground flex aspect-square w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-slate-700 bg-slate-900/60 text-[11px] font-medium transition-colors hover:border-slate-500"
            >
              <Plus className="h-4 w-4 text-slate-400" />
              <span>Adicionar</span>
            </label>
          </div>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
