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
    <Card>
      <CardContent>
        <Input
          placeholder="Buscar por modelo, marca ou categoria..."
          value={filters.search || ""}
          onChange={(e) => onFilterChange("search", e.target.value)}
        />

        <div className="flex flex-col pt-6">
          <div className="flex items-center gap-2">
            <Filter size={17} />{" "}
            <span className="text-md font-semibold">Filtro</span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <Select
              value={filters.category || "all"}
              onValueChange={(v) => onFilterChange("category", v)}
            >
              <SelectTrigger className="w-45">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {CAR_CATEGORIES.map((item) => (
                    <SelectItem value={item.value}>{item.label}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select
              value={filters.priceRange || "all"}
              onValueChange={(v) => onFilterChange("priceRange", v)}
            >
              <SelectTrigger className="w-45">
                <SelectValue placeholder="Preço/hora" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {PRICE_RANGES.map((item) => (
                    <SelectItem value={item.value}>{item.label}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select
              value={filters.transmission || "all"}
              onValueChange={(v) => onFilterChange("transmission", v)}
            >
              <SelectTrigger className="w-45">
                <SelectValue placeholder="Transmissão" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {TRANSMISSION_TYPES.map((item) => (
                    <SelectItem value={item.value}>{item.label}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select
              value={filters.fuel || "all"}
              onValueChange={(v) => onFilterChange("fuel", v)}
            >
              <SelectTrigger className="w-45">
                <SelectValue placeholder="Combustível" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {FUEL_TYPES.map((item) => (
                    <SelectItem value={item.value}>{item.label}</SelectItem>
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
