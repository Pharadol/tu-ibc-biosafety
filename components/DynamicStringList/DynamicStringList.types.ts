import { Control, FieldValues, Path, FieldErrors } from "react-hook-form";

export interface DynamicStringListProps<T extends FieldValues> {
  label: string;
  control: Control<T>;
  name: Path<T>;
  errors?: FieldErrors<T>;
  placeholder?: string;
  minItemCount?: number;
  maxItemCount?: number;
  addButtonText?: string;
  className?: string;
}