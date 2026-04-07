import { type Control, useController } from "react-hook-form";
import type { ReservationForm, Table } from "@/types";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  // FieldDescription,
  // FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";

interface CheckTableProps {
  name: keyof ReservationForm;
  id: string;
  value: string;
  item: Table;
  control: Control<ReservationForm, unknown, ReservationForm>;
  required?: boolean;
}
export default function CheckTable(props: CheckTableProps) {
  const { name, id, value, item, control, required } = props;
  const { field } = useController({
    name,
    control,
    rules: { required: false },
    defaultValue: "",
  });

  // const [checked, setChecked] = useState(false);

  return (
    <>
      {/* <div className="flex gap-2" key={id}>
        <input
          id={item._id}
          type="checkbox"
          checked={Array.isArray(field.value) && field.value.includes(value)}
          // {...register(name)}
          {...field}
          onChange={(e) => {
            if (e.target.checked) {
              if (Array.isArray(field.value)) {
                field.onChange([...field.value, value]); // Add value
              } else {
                field.onChange([field.value, value]); // Add value to a new array
              }
            } else {
              if (Array.isArray(field.value)) {
                field.onChange(field.value.filter((v: string) => v !== value)); // Remove value
              } else {
                // Handle the case where field.value is not an array
                // For example, you could log an error or throw an exception
                console.error("field.value is not an array");
              }
            }
          }}
          className="relative peer shrink-0 appearance-none  w-4 h-4 border-2 border-blue-500 rounded-sm bg-white mt-1 checked:bg-blue-600 checked:border-0 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer"
        />
        <div className="flex gap-2">
          <div className="font-bold">{item.seats}</div>
          <div className="text-blue-500">{item.name}</div>
        </div>
        <svg
          className=" absolute w-4 h-4 mt-1 hidden peer-checked:block pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div> */}
      <div className="flex gap-2" key={id}>
        <FieldLabel>
          <Field orientation="vertical">
            <Checkbox
              // checked={checked}
              required={required}
              checked={
                Array.isArray(field.value) && field.value.includes(value)
              }
              // onCheckedChange={() => {
              //   setChecked(!checked);
              // }}
              onCheckedChange={(checked) => {
                if (checked) {
                  if (Array.isArray(field.value)) {
                    field.onChange([...field.value, value]); // Add value
                  } else {
                    field.onChange([field.value, value]); // Add value to a new array
                  }
                } else {
                  if (Array.isArray(field.value)) {
                    field.onChange(
                      field.value.filter((v: string) => v !== value),
                    ); // Remove value
                  } else {
                    // Handle the case where field.value is not an array
                    // For example, you could log an error or throw an exception
                    console.error("field.value is not an array");
                  }
                }
              }}
              id={item._id}
              {...field}
            />
            <FieldContent>
              <FieldTitle>
                <span className="font-bold">{item.seats}</span>
              </FieldTitle>
              <FieldDescription>
                <span className="text-blue-500">{item.name}</span>
              </FieldDescription>
            </FieldContent>
          </Field>
        </FieldLabel>
      </div>
    </>
  );
}
