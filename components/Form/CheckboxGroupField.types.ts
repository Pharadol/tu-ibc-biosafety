import { Control, FieldValues, Path, FieldErrors } from "react-hook-form";

export interface CheckboxOption {
  label: string;
  value: string;
}

export interface CheckboxOtherField<T extends FieldValues> {
  name: Path<T>;
  placeholder?: string;
  requiredMessage?: string;
  className?: string;
  maxLength?: number;
  type?: string;
}

export interface CheckboxGroupFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  errors?: FieldErrors<T>;
  label?: string;
  options: CheckboxOption[];
  direction?: "row" | "col";
  requiredMessage?: string;
  minSelection?: number;
  maxSelection?: number;
  other?: CheckboxOtherField<T>;
}