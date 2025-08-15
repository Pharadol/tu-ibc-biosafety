import { Control, FieldValues, FieldErrors } from "react-hook-form";

export interface DynamicStringListProps<T extends FieldValues> {
  label: string;
  control: Control<T>;
  name: string;  // Changed to string for more flexibility
  errors?: FieldErrors<T>;
  placeholder?: string;
  minItemCount?: number;
  maxItemCount?: number;
  addButtonText?: string;
  className?: string;
}