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

function FilterInput() {
  return (
    <div>
      <Input placeholder="Buscar por modelo, marca ou categoria..." />

      <div className="flex flex-col pt-6">
        <div className="flex items-center gap-2">
          <Filter size={17} />{" "}
          <span className="text-md font-semibold">Filtro</span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <Select>
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

          <Select>
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

          <Select>
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

          <Select>
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
    </div>
  );
}

export default FilterInput;
