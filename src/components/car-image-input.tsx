import { Upload, X } from "lucide-react";
import { useCallback, useMemo } from "react";
import { type Control, Controller, useWatch } from "react-hook-form";
import { toast } from "sonner";

import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import type { CarFormSchema } from "@/schemas/car-form-schema";

import { Button } from "./ui/button";
import { Field, FieldError, FieldLabel } from "./ui/field";

export function CarImageInput({
  control,
}: {
  control: Control<CarFormSchema>;
}) {
  const imageValue = useWatch({ control, name: "image" });

  const files: File[] = useMemo(() => {
    if (!imageValue) return [];
    if (imageValue instanceof File) return [imageValue];
    if (Array.isArray(imageValue)) return imageValue;
    return [];
  }, [imageValue]);

  const onFileReject = useCallback((file: File, message: string) => {
    toast(message, {
      description: `"${file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name}" has been rejected`,
    });
  }, []);

  return (
    <Controller
      name="image"
      control={control}
      render={({ field: { onChange }, fieldState }) => {
        return (
          <Field data-invalid={fieldState.invalid} className="space-y-2">
            <FieldLabel>Imagem principal</FieldLabel>
            <FileUpload
              maxFiles={1}
              maxSize={3 * 1024 * 1024}
              className="w-full"
              value={files}
              onValueChange={(newFiles) => {
                onChange(newFiles && newFiles.length > 0 ? newFiles[0] : null);
              }}
              onFileReject={onFileReject}
            >
              <FileUploadDropzone>
                <div className="flex flex-col items-center gap-1 text-center">
                  <div className="flex items-center justify-center rounded-full border p-2.5">
                    <Upload className="text-muted-foreground size-6" />
                  </div>
                  <p className="text-sm font-medium">Jogue os arquivos aqui</p>
                  <p className="text-muted-foreground text-xs">
                    Ou clique para selecionar arquivos (máx. 1 arquivos, 3MB
                    cada)
                  </p>
                </div>
                <FileUploadTrigger asChild>
                  <Button variant="outline" size="sm" className="mt-2 w-fit">
                    Escolher arquivos
                  </Button>
                </FileUploadTrigger>
              </FileUploadDropzone>

              <FileUploadList>
                {files.map((file, index) => (
                  <FileUploadItem key={index} value={file}>
                    <FileUploadItemPreview />
                    <FileUploadItemMetadata />
                    <FileUploadItemDelete asChild>
                      <Button variant="ghost" size="icon" className="size-7">
                        <X />
                      </Button>
                    </FileUploadItemDelete>
                  </FileUploadItem>
                ))}
              </FileUploadList>
            </FileUpload>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}
