import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import React from "react";
import {
  Controller,
  type Resolver,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { NumericFormat } from "react-number-format";

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CAR_CATEGORIES, carFeatures } from "@/constants/car";
import { useCreateCar } from "@/http/use-create-car";
import { useUpdateCar } from "@/http/use-update-car";
import { type CarFormSchema, carFormSchema } from "@/schemas/car-form-schema";

import { CarGalleryInput } from "./car-gallery-input";
import { CarImageInput } from "./car-image-input";
import { Button } from "./ui/button";
import { Field, FieldError, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface UpsertCarDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  carId?: string;
  defaultValues?: CarFormSchema;
}

function EditCarForm({
  isOpen,
  setIsOpen,
  defaultValues,
  carId,
}: UpsertCarDialogProps) {
  const { mutateAsync: createCar, isPending } = useCreateCar();
  const { mutateAsync: updateCar, isPending: isUpdatePending } = useUpdateCar();

  const anchor = useComboboxAnchor();

  const form = useForm<CarFormSchema>({
    resolver: zodResolver(carFormSchema) as Resolver<CarFormSchema>,
    values: defaultValues ?? {
      brand: "",
      model: "",
      category: "",
      image: "",
      year: new Date().getFullYear(),
      pricePerHour: 0,
      description: "",
      available: true,
      gallery: undefined,
      specifications: [
        { label: "Motor", value: "" },
        { label: "Potência", value: "" },
        { label: "Transmissão", value: "" },
        { label: "Combustível", value: "" },
        { label: "Direção", value: "" },
      ],
      features: [] as string[],
    },
  });

  const { fields: specFields } = useFieldArray({
    control: form.control,
    name: "specifications",
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
      formData.append("specifications", JSON.stringify(data.specifications));
      formData.append("features", JSON.stringify(data.features));
      if (data.image instanceof File) {
        formData.append("image", data.image);
      }
      if (data.gallery && data.gallery instanceof FileList) {
        Array.from(data.gallery).forEach((file) => {
          formData.append("gallery", file);
        });
      }

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
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          form.reset();
        }
      }}
    >
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="w-[calc(100%-2rem)] max-w-2xl rounded-lg p-6 sm:w-full">
        <DialogHeader>
          <DialogTitle>{carId ? "Editar carro" : "Criar carro"}</DialogTitle>
          <DialogDescription>Insira as informações abaixo</DialogDescription>
        </DialogHeader>

        <ScrollArea className="-mr-3 max-h-[70vh] pr-3">
          <form
            id="car-form"
            onSubmit={form.handleSubmit(onSubmit, (errors) =>
              console.log("O formulário está inválido!", errors),
            )}
            className="space-y-8 px-4"
          >
            <Controller
              name="brand"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Marca</FieldLabel>
                  <Input {...field} id={field.name} placeholder="Ex: Porsche" />
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
                      {CAR_CATEGORIES.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
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
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="pricePerHour">
                      Preço por Hora
                    </FieldLabel>

                    <NumericFormat
                      id="pricePerHour"
                      name={field.name}
                      value={field.value ?? ""}
                      onBlur={field.onBlur}
                      getInputRef={field.ref}
                      customInput={Input}
                      placeholder="R$ 0,00"
                      decimalScale={2}
                      decimalSeparator=","
                      thousandSeparator="."
                      prefix="R$ "
                      allowNegative={false}
                      onValueChange={(values) => {
                        field.onChange(values.floatValue ?? 0);
                      }}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <CarGalleryInput control={form.control} />

            {specFields.map((fieldItem, index) => (
              <div key={fieldItem.id} className="flex w-full items-end gap-3">
                <Controller
                  name={`specifications.${index}.value` as const}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="grow">
                      <FieldLabel>{fieldItem.label}</FieldLabel>

                      <div className="flex items-center gap-2">
                        <Input
                          {...field}
                          id={field.name}
                          placeholder={
                            fieldItem.label
                              ? `Digite o/a ${fieldItem.label.toLowerCase()}...`
                              : "Digite o valor..."
                          }
                        />
                      </div>

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
            ))}

            <Controller
              name="features"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="space-y-2"
                  >
                    <FieldLabel>Características Adicionais</FieldLabel>
                    <Combobox
                      multiple
                      autoHighlight
                      items={carFeatures}
                      value={field.value}
                      onValueChange={(newValues) => {
                        field.onChange(newValues);
                      }}
                    >
                      <ComboboxChips ref={anchor} className="w-full">
                        <ComboboxValue>
                          {(values) => (
                            <React.Fragment>
                              {values.map((value: string) => (
                                <ComboboxChip key={value}>{value}</ComboboxChip>
                              ))}
                              <ComboboxChipsInput />
                            </React.Fragment>
                          )}
                        </ComboboxValue>
                      </ComboboxChips>
                      <ComboboxContent anchor={anchor}>
                        <ComboboxEmpty>
                          Nenhuma especificação encontrada
                        </ComboboxEmpty>
                        <ComboboxList>
                          {(item) => (
                            <ComboboxItem key={item} value={item}>
                              {item}
                            </ComboboxItem>
                          )}
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                );
              }}
            />
          </form>
        </ScrollArea>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </DialogClose>
          <Button form="car-form" type="submit" disabled={isPending}>
            {isPending || isUpdatePending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              </>
            ) : carId ? (
              "Salvar alterações"
            ) : (
              "Criar veículo"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditCarForm;
