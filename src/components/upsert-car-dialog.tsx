/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCreateCar } from "@/http/use-create-car";
import { useUpdateCar } from "@/http/use-update-car";
import { type CarFormSchema, carFormSchema } from "@/schemas/car-form-schema";

import { CarGalleryInput } from "./car-gallery-input";
import { CarImageInput } from "./car-image-input";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Field, FieldError, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";

interface UpsertCarDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  carId?: string;
  defaultValues?: any;
}

function EditCarForm({
  isOpen,
  setIsOpen,
  defaultValues,
  carId,
}: UpsertCarDialogProps) {
  const { mutateAsync: createCar, isPending } = useCreateCar();
  const { mutateAsync: updateCar } = useUpdateCar();

  const form = useForm({
    resolver: zodResolver(carFormSchema),
    defaultValues: defaultValues ?? {
      brand: "",
      model: "",
      category: "",
      image: undefined,
      year: new Date().getFullYear(),
      pricePerHour: 0,
      description: "",
      available: true,
      gallery: undefined,
      specifications: [
        { label: "Motor", value: "" },
        { label: "Potência", value: "" },
        { label: "Transmissão", value: "" },
      ],
      features: [],
    },
  });

  const {
    fields: specFields,
    append: appendSpec,
    remove: removeSpec,
  } = useFieldArray({
    control: form.control,
    name: "specifications",
  });

  const {
    fields: featureFields,
    append: appendFeature,
    remove: removeFeature,
  } = useFieldArray({
    control: form.control,
    name: "features",
  });

  async function onSubmit(data: CarFormSchema) {
    try {
      const formData = new FormData();

      formData.append("brand", data.brand);
      formData.append("model", data.model);
      formData.append("category", data.category);
      formData.append("description", data.description);
      formData.append("year", String(data.year));
      formData.append("pricePerHour", String(data.pricePerHour));
      formData.append("available", String(data.available));
      formData.append("image", data.image);
      formData.append("specifications", JSON.stringify(data.specifications));
      formData.append("features", JSON.stringify(data.features));
      Array.from(data.gallery).forEach((file) => {
        formData.append("gallery", file);
      });

      if (carId) {
        await updateCar({ carId, formData });
      } else {
        await createCar(formData);
      }

      setIsOpen(false);
      form.reset();
    } catch (error) {
      console.error("Erro ao salvar carro:", error);
    }
  }

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl!">
          <DialogHeader>
            <DialogTitle>{carId ? "Editar carro" : "Criar carro"}</DialogTitle>
          </DialogHeader>

          <ScrollArea className="-mr-3 max-h-[70vh] pr-3">
            <form
              id="car-form"
              onSubmit={form.handleSubmit(onSubmit, (errors) =>
                console.log("O formulário está inválido!", errors),
              )}
              className="space-y-5 pb-2"
            >
              <Controller
                name="brand"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Marca</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      placeholder="Ex: Porsche"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="model"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Modelo</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      placeholder="Ex: 911 Carrera"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="category"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Categoria</FieldLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        className="w-full"
                        id={field.name}
                        ref={field.ref}
                      >
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="esportivo">Esportivo</SelectItem>
                        <SelectItem value="suv">SUV</SelectItem>
                        <SelectItem value="sedan">Sedan</SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <CarImageInput control={form.control} />

              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Descrição</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      placeholder="Digite os detalhes do veículo..."
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <Controller
                  name="year"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Ano</FieldLabel>
                      <Input
                        type="number"
                        {...field}
                        value={(field.value as number) ?? ""}
                        id={field.name}
                        placeholder="Ex: 2026"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="pricePerHour"
                  control={form.control}
                  render={({ field: { value, ...restField }, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={restField.name}>
                        Preço por Hora
                      </FieldLabel>
                      <Input
                        {...restField}
                        value={(value as number) ?? ""}
                        type="number"
                        step="0.01"
                        id={restField.name}
                        placeholder="Ex: 150"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              <CarGalleryInput control={form.control} />

              <Card className="bg-secondary/20 border-slate-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 px-4 py-3">
                  <CardTitle className="text-muted-foreground text-sm font-medium">
                    Especificações Técnicas
                  </CardTitle>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-8 gap-1"
                    onClick={() => appendSpec({ label: "", value: "" })}
                  >
                    <Plus className="h-3.5 w-3.5" /> Adicionar Especificação
                  </Button>
                </CardHeader>
                <Separator />
                <CardContent className="space-y-4 p-4">
                  {specFields.map((fieldItem, index) => (
                    <div key={fieldItem.id} className="flex items-start gap-3">
                      <Controller
                        name={`specifications.${index}.label` as const}
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field
                            data-invalid={fieldState.invalid}
                            className="w-1/3"
                          >
                            <Input {...field} placeholder="Ex: Motor" />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />

                      <Controller
                        name={`specifications.${index}.value` as const}
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field
                            data-invalid={fieldState.invalid}
                            className="grow"
                          >
                            <Input
                              {...field}
                              placeholder="Ex: 4.0 V8, 450cv..."
                            />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => removeSpec(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-secondary/20 border-slate-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b border-slate-800 px-4 py-3">
                  <CardTitle className="text-muted-foreground text-sm font-medium">
                    Características Adicionais
                  </CardTitle>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-8 gap-1"
                    onClick={() => appendFeature({ value: "" })}
                  >
                    <Plus className="h-3.5 w-3.5" /> Adicionar Característica
                  </Button>
                </CardHeader>
                <CardContent className="space-y-3 p-4">
                  {featureFields.map((fieldItem, index) => (
                    <div key={fieldItem.id} className="flex items-start gap-2">
                      <Controller
                        name={`features.${index}.value` as const}
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field
                            data-invalid={fieldState.invalid}
                            className="grow"
                          >
                            <Input
                              {...field}
                              placeholder="Ex: Teto Solar, Piloto Automático..."
                            />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => removeFeature(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  {featureFields.length === 0 && (
                    <div className="text-muted-foreground py-2 text-center text-xs italic">
                      Nenhuma característica adicionada.
                    </div>
                  )}
                </CardContent>
              </Card>

              <Button
                form="car-form"
                type="submit"
                className="mt-2 w-full"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                    Salvando...
                  </>
                ) : carId ? (
                  "Salvar alterações"
                ) : (
                  "Criar veículo"
                )}
              </Button>
            </form>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditCarForm;
