import { Control, FieldValues, FieldErrors, ArrayPath, UseFormTrigger, UseFormGetValues } from "react-hook-form";

export interface DynamicStringListProps<T extends FieldValues> {
  label: string;
  control: Control<T>;
  name: ArrayPath<T>;  // Changed back to ArrayPath for proper typing
  errors?: FieldErrors<T>;
  placeholder?: string;
  minItemCount?: number;
  maxItemCount?: number;
  addButtonText?: string;
  isReadonly?: boolean;
  className?: string;
  getValues?: UseFormGetValues<T>;
  trigger?: UseFormTrigger<T>;
  onValueUpdate?: (fieldName: string, value: string | number) => void;
  // ✅ เพิ่ม validation options
  required?: boolean;
  requiredMessage?: string;
  allowWhitespace?: boolean;
}