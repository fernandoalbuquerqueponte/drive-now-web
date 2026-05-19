import { Filter } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CAR_CATEGORIES,
  FUEL_TYPES,
  PRICE_RANGES,
  TRANSMISSION_TYPES,
} from "@/constants/car";

import { Card, CardContent } from "./ui/card";

interface FilterInputProps {
  filters: {
    search: string;
    category: string;
    priceRange: string;
    transmission: string;
    fuel: string;
  };
  onFilterChange: (key: string, value: string) => void;
}

function FilterInput({ filters, onFilterChange }: FilterInputProps) {
  return (
    <Card className="w-full">
      <CardContent className="space-y-6">
        <Input
          className="h-10 w-full"
          placeholder="Buscar por modelo, marca ou categoria..."
          value={filters.search || ""}
          onChange={(e) => onFilterChange("search", e.target.value)}
        />

        <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center">
          <div className="text-muted-foreground flex shrink-0 items-center gap-2">
            <Filter size={15} /> <span className="text-sm">Filtro</span>
          </div>

          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            <Select
              value={filters.category || "all"}
              onValueChange={(v) => onFilterChange("category", v)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {CAR_CATEGORIES.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select
              value={filters.priceRange || "all"}
              onValueChange={(v) => onFilterChange("priceRange", v)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Preço/hora" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {PRICE_RANGES.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select
              value={filters.transmission || "all"}
              onValueChange={(v) => onFilterChange("transmission", v)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Transmissão" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {TRANSMISSION_TYPES.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select
              value={filters.fuel || "all"}
              onValueChange={(v) => onFilterChange("fuel", v)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Combustível" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {FUEL_TYPES.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default FilterInput;
