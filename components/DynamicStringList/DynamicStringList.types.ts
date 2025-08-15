import { Control, FieldValues, FieldPath, FieldErrors } from "react-hook-form";

export interface DynamicStringListProps<T extends FieldValues> {
  label: string;
  control: Control<T>;
  name: FieldPath<T>;
  errors?: FieldErrors<T>;
  placeholder?: string;
  minItemCount?: number;
  maxItemCount?: number;
  addButtonText?: string;
  className?: string;
}