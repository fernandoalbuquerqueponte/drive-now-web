import { format } from "date-fns/format";
import { Calendar1 } from "lucide-react";

import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface DatePickerFieldProps {
  value?: Date;
  onChange: (date?: Date) => void;
  placeholder?: string;
}

function DatePickerField({
  value,
  onChange,
  placeholder,
}: DatePickerFieldProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="lg"
          variant="outline"
          className="w-full justify-start font-normal"
        >
          {<Calendar1 />}
          {value ? format(value, "dd/MM/yyyy") : placeholder}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={value} onSelect={onChange} />
      </PopoverContent>
    </Popover>
  );
}

export default DatePickerField;
