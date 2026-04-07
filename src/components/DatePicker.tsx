"use client";

import { useState } from "react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldError } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { Controller, type Control, type FieldValues } from "react-hook-form";
import type { ReservationForm } from "@/types";

interface DatePickerProps<T extends FieldValues> {
  // Add your props here
  // For example:
  handleInputChange: (value: Date) => void;
  control: Control<T, any, T>;
  // defaultValue: Date;
  // etc.
}

/* export default function DatePicker() {
  const [date, setDate] = useState<Date>();

  return (
    <Field className="mx-auto w-44">
      <FieldLabel htmlFor="date-picker">Date</FieldLabel>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date-picker"
            className="justify-start font-normal"
          >
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            defaultMonth={date}
          />
        </PopoverContent>
      </Popover>
    </Field>
  );
} */

export default function DatePicker(props: DatePickerProps<ReservationForm>) {
  const { handleInputChange, control } = props;

  const [open, setOpen] = useState(false);

  return (
    <Controller
      name="date"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {/* <FieldLabel htmlFor="date">Day</FieldLabel> */}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                data-empty={!field.value}
                className="justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
              >
                {field.value ? (
                  format(field.value, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                id="date"
                aria-invalid={fieldState.invalid}
                {...field}
                onSelect={(value) => {
                  field.onChange(value);
                  if (value) {
                    console.log(format(value, "yyyy-MM-dd"));
                    setOpen(false);
                    field.onChange(format(value, "yyyy-MM-dd"));
                    handleInputChange(value);
                  }
                }}
              />
            </PopoverContent>
          </Popover>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
