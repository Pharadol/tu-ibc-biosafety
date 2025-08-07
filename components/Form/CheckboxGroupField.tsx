import { FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CheckboxGroupFieldProps } from "./CheckboxGroupField.types";

export function CheckboxGroupField<T extends FieldValues>({
  control,
  name,
  errors,
  label,
  options,
  direction = "col",
  requiredMessage,
  minSelection,
  maxSelection,
  other,
}: CheckboxGroupFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      rules={{
        required: requiredMessage ?? `กรุณาเลือก${label}`,
        validate: (value: string[]) => {
          if (!value || !Array.isArray(value)) return true;
          
          // Check minimum selection
          if (minSelection && value.length < minSelection) {
            return `กรุณาเลือกอย่างน้อย ${minSelection} ตัวเลือก`;
          }
          
          // Check maximum selection
          if (maxSelection && value.length > maxSelection) {
            return `เลือกได้สูงสุด ${maxSelection} ตัวเลือก`;
          }
          
          return true;
        },
      }}
      render={({ field }) => (
        <FormItem className="space-y-3">
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div className={`flex flex-${direction} gap-3`}>
              {options.map((option) => (
                <FormItem
                  key={option.value}
                  className="flex items-center gap-3 min-h-6"
                >
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(option.value) || false}
                      onCheckedChange={(checked) => {
                        const currentValue = field.value || [];
                        if (checked) {
                          // Add to array if not already present
                          if (!currentValue.includes(option.value)) {
                            field.onChange([...currentValue, option.value]);
                          }
                        } else {
                          // Remove from array
                          field.onChange(
                            currentValue.filter((val: string) => val !== option.value)
                          );
                        }
                      }}
                    />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer">
                    {option.label}
                  </FormLabel>
                </FormItem>
              ))}
              
              {other && (
                <FormItem key={"other"} className="flex items-center gap-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes("other") || false}
                      onCheckedChange={(checked) => {
                        const currentValue = field.value || [];
                        if (checked) {
                          // Add "other" to array if not already present
                          if (!currentValue.includes("other")) {
                            field.onChange([...currentValue, "other"]);
                          }
                        } else {
                          // Remove "other" from array
                          field.onChange(
                            currentValue.filter((val: string) => val !== "other")
                          );
                        }
                      }}
                    />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer">อื่นๆ</FormLabel>
                  {field.value?.includes("other") && (
                    <FormField
                      control={control}
                      name={other.name}
                      rules={{
                        required: field.value?.includes("other") 
                          ? (other.requiredMessage ?? `กรุณากรอกข้อมูล`) 
                          : false,
                      }}
                      render={({ field: otherField }) => (
                        <div className="flex-col flex justify-center relative">
                          <FormControl>
                            <Input
                              placeholder={other.placeholder}
                              {...otherField}
                              className={cn(
                                "text-base py-2 w-full",
                                {
                                  "border-danger":
                                    errors?.[other.name]?.message,
                                },
                                other.className
                              )}
                              maxLength={other.maxLength}
                              type={other.type}
                            />
                          </FormControl>
                          <FormMessage className="absolute top-10" />
                        </div>
                      )}
                    />
                  )}
                </FormItem>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}